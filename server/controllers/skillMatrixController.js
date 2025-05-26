import { AppDataSource } from '../config/database.js';
import { Employee } from '../entities/Employee.js';
import { RaiseRequest, Status } from '../entities/RaiseRequest.js';

const employeeRepo = AppDataSource.getRepository(Employee);
const requestRepo = AppDataSource.getRepository(RaiseRequest);

// Calculate average score from skill_score object
const calculateAverageScore = (skillScore) => {
    if (!skillScore) return 0;
    const values = Object.values(skillScore);
    return values.reduce((sum, val) => sum + val, 0) / values.length;
};

export const getSkillMatrix = async (request, h) => {
    try {
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        let teamMembers;
        if (employee.role === 'hr') {
            teamMembers = await employeeRepo.find({
                select: ['id', 'name', 'position', 'skill_score', 'team', 'score']
            });
        } else if (employee.role === 'lead') {
            teamMembers = await employeeRepo.find({
                where: { lead_id: employee.id },
                select: ['id', 'name', 'position', 'skill_score', 'score']
            });
        } else {
            teamMembers = [employee];
        }

        return teamMembers;
    } catch (error) {
        return h.response({ message: 'Error fetching skill matrix' }).code(500);
    }
};

export const getFilteredMatrix = async (request, h) => {
    try {
        const { team, position, skillCategory, role } = request.query;
        const query = {};

        if (team) query.team = team;
        if (position) query.position = position;
        if (role) query.role = role;

        const employees = await employeeRepo.find({
            where: query,
            select: ['id', 'name', 'position', 'skill_score', 'team', 'score']
        });

        if (skillCategory) {
            return employees.map(emp => ({
                ...emp,
                skill_score: {
                    [skillCategory]: emp.skill_score?.[skillCategory] || 0
                }
            }));
        }

        return employees;
    } catch (error) {
        return h.response({ message: 'Error fetching filtered matrix' }).code(500);
    }
};

export const submitSkillRequest = async (request, h) => {
    try {
        const { skills } = request.payload;
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id },
            relations: ['lead']
        });

        if (!employee.lead_id) {
            return h.response({ message: 'No lead assigned' }).code(400);
        }

        const request = requestRepo.create({
            data: skills,
            employee: employee,
            status: Status.PENDING,
            current_approver_id: employee.lead_id,
            review_chain: [employee.lead_id]
        });

        await requestRepo.save(request);
        return { message: 'Skill update request submitted successfully' };
    } catch (error) {
        return h.response({ message: 'Error submitting skill request' }).code(500);
    }
};

export const getPendingRequests = async (request, h) => {
    try {
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        const requests = await requestRepo.find({
            where: {
                current_approver_id: employee.id,
                status: Status.PENDING
            },
            relations: ['employee']
        });

        return requests;
    } catch (error) {
        return h.response({ message: 'Error fetching pending requests' }).code(500);
    }
};

export const handleSkillRequest = async (request, h) => {
    try {
        const { requestId } = request.params;
        const { action, comment, edited_skills } = request.payload;
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        const skillRequest = await requestRepo.findOne({
            where: { req_id: requestId },
            relations: ['employee']
        });

        if (!skillRequest) {
            return h.response({ message: 'Request not found' }).code(404);
        }

        if (skillRequest.current_approver_id !== employee.id) {
            return h.response({ message: 'Not authorized to handle this request' }).code(403);
        }

        // Update review history
        skillRequest.review_history = [
            ...(skillRequest.review_history || []),
            {
                reviewer_id: employee.id,
                action,
                comment,
                timestamp: new Date()
            }
        ];

        if (edited_skills) {
            skillRequest.edited_data = edited_skills;
        }

        if (action === 'approve') {
            if (employee.lead_id) {
                // Forward to next lead
                skillRequest.status = Status.FORWARD;
                skillRequest.current_approver_id = employee.lead_id;
            } else {
                // Top lead approves
                skillRequest.status = Status.APPROVED;
                const employeeToUpdate = await employeeRepo.findOne({
                    where: { id: skillRequest.employee.id }
                });

                // Update skill score with edited data if available, otherwise use original data
                const finalSkills = edited_skills || skillRequest.data;
                employeeToUpdate.skill_score = finalSkills;
                employeeToUpdate.score = calculateAverageScore(finalSkills);
                
                await employeeRepo.save(employeeToUpdate);
            }
        } else {
            skillRequest.status = Status.REJECTED;
        }

        await requestRepo.save(skillRequest);
        return { message: `Request ${action}d successfully` };
    } catch (error) {
        return h.response({ message: 'Error handling skill request' }).code(500);
    }
};

export const cancelSkillRequest = async (request, h) => {
    try {
        const { requestId } = request.params;
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        const skillRequest = await requestRepo.findOne({
            where: { 
                req_id: requestId,
                employee: { id: employee.id }
            }
        });

        if (!skillRequest) {
            return h.response({ message: 'Request not found' }).code(404);
        }

        if (skillRequest.status !== Status.PENDING) {
            return h.response({ message: 'Can only cancel pending requests' }).code(400);
        }

        skillRequest.status = Status.CANCELLED;
        await requestRepo.save(skillRequest);
        return { message: 'Request cancelled successfully' };
    } catch (error) {
        return h.response({ message: 'Error cancelling request' }).code(500);
    }
};

export const getMyRequests = async (request, h) => {
    try {
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        const requests = await requestRepo.find({
            where: { employee: { id: employee.id } },
            order: { req_at: 'DESC' }
        });

        return requests;
    } catch (error) {
        return h.response({ message: 'Error fetching requests' }).code(500);
    }
}; 