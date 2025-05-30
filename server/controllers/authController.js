import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database.js';
import { Employee } from '../entities/Employee.js';
import { TeamNames } from '../entities/Team.js';
import { DepartmentNames } from '../entities/Department.js';
import { PositionNames } from '../entities/Position.js';
import { RoleNames } from '../entities/Role.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const employeeRepo = AppDataSource.getRepository(Employee);

export const signup = async (request, h) => {
    try {
        const { email, password } = request.payload;

        // Check if email already exists
        const employee = await employeeRepo.findOne({
            where: { email }
        });

        if (!employee) {
            return h.response({ message: 'Employee record does not exist' }).code(404);
        }

        if (employee.password) {
            return h.response({ message: 'Employee already signed up, Please Login' }).code(409);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        employee.password = hashedPassword;

        await employeeRepo.save(employee);

        return h.response({ message: 'Signup successful' }).code(200);
    } catch (error) {
        console.error('Signup error:', error);
        return h.response({ message: 'Error during signup' }).code(500);
    }
};

export const login = async (request, h) => {
    try {
        const { email, password } = request.payload;

        const employee = await employeeRepo.findOne({
            where: { email },
            relations: ['role', 'team', 'department', 'position', 'lead', 'hr'],
            select: ['id', 'name', 'email', 'password']
        });
        // console.log("employee", employee);

        if (!employee) {
            return h.response({ message: 'Invalid credentials' }).code(401);
        }


        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return h.response({ message: 'Invalid credentials' }).code(401);
        }
        console.log("employee.role", employee);

        const token = jwt.sign(
            { id: employee.id, role: employee.role?.name },
            JWT_SECRET,
            { expiresIn: '24h' }
        );



        const { password: _, ...employeeWithoutPassword } = employee;
        return {
            message: 'Login successful',
            token,
            employee: {
                ...employeeWithoutPassword,
                team: employee.team ? employee.team.name : null,
                department: employee.department ? employee.department.name : null,
                position: employee.position ? employee.position.name : null,
                lead: employee.lead ? employee.lead.name : null,
                hr: employee.hr ? employee.hr.name : null,
                role: employee.role ? employee.role.name : null,

            }
        };
    } catch (error) {
        console.error('Login error:', error);
        return h.response({ message: 'Internal server error' }).code(500);
    }
};

export const getProfile = async (request, h) => {
    try {
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id },
            select: ['id', 'name', 'email', 'role_id', 'team_id', 'department_id', 'position_id', 'lead_id', 'hr_id', 'skill_score', 'score'],
            relations: ['role', 'team', 'department', 'position', 'lead', 'hr']
        });

        if (!employee) {
            return h.response({ message: 'Employee not found' }).code(404);
        }

        return employee;
    } catch (error) {
        return h.response({ message: 'Error fetching profile' }).code(500);
    }
};

export const updateProfile = async (request, h) => {
    try {
        const { name, email } = request.payload;
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        if (!employee) {
            return h.response({ message: 'Employee not found' }).code(404);
        }

        if (name) employee.name = name;
        if (email) employee.email = email;

        await employeeRepo.save(employee);
        return { message: 'Profile updated successfully' };
    } catch (error) {
        return h.response({ message: 'Error updating profile' }).code(500);
    }
}; 