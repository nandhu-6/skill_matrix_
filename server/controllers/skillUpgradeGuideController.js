import { AppDataSource } from '../config/database.js';
import { SkillUpgradeGuide } from '../entities/SkillUpgradeGuide.js';
import { SkillCategory } from '../entities/SkillCategory.js';

const guideRepo = AppDataSource.getRepository(SkillUpgradeGuide);
const categoryRepo = AppDataSource.getRepository(SkillCategory);

export const createSkillUpgradeGuide = async (request, h) => {
    try {
        const { title, description, category_id, resources, steps } = request.payload;
        const employee = request.auth.credentials;

        // Only HR can create guides
        if (employee.role !== 'hr') {
            return h.response({ message: 'Only HR can create skill upgrade guides' }).code(403);
        }

        // Verify category exists
        const category = await categoryRepo.findOne({
            where: { id: category_id }
        });

        if (!category) {
            return h.response({ message: 'Skill category not found' }).code(404);
        }

        const guide = guideRepo.create({
            title,
            description,
            category,
            resources,
            steps,
            created_by: employee.id
        });

        await guideRepo.save(guide);
        return guide;
    } catch (error) {
        return h.response({ message: 'Error creating skill upgrade guide' }).code(500);
    }
};

export const getAllSkillUpgradeGuides = async (request, h) => {
    try {
        const guides = await guideRepo.find({
            relations: ['category', 'createdBy']
        });
        return guides;
    } catch (error) {
        return h.response({ message: 'Error fetching skill upgrade guides' }).code(500);
    }
};

export const getSkillUpgradeGuideById = async (request, h) => {
    try {
        const { id } = request.params;
        const guide = await guideRepo.findOne({
            where: { id },
            relations: ['category', 'createdBy']
        });

        if (!guide) {
            return h.response({ message: 'Skill upgrade guide not found' }).code(404);
        }

        return guide;
    } catch (error) {
        return h.response({ message: 'Error fetching skill upgrade guide' }).code(500);
    }
};

export const getGuidesByCategory = async (request, h) => {
    try {
        const { category_id } = request.params;
        const guides = await guideRepo.find({
            where: { category: { id: category_id } },
            relations: ['category', 'createdBy']
        });
        return guides;
    } catch (error) {
        return h.response({ message: 'Error fetching guides for category' }).code(500);
    }
};

export const updateSkillUpgradeGuide = async (request, h) => {
    try {
        const { id } = request.params;
        const { title, description, category_id, resources, steps } = request.payload;
        const employee = request.auth.credentials;

        // Only HR can update guides
        if (employee.role !== 'hr') {
            return h.response({ message: 'Only HR can update skill upgrade guides' }).code(403);
        }

        const guide = await guideRepo.findOne({
            where: { id },
            relations: ['category']
        });

        if (!guide) {
            return h.response({ message: 'Skill upgrade guide not found' }).code(404);
        }

        if (title) guide.title = title;
        if (description) guide.description = description;
        if (resources) guide.resources = resources;
        if (steps) guide.steps = steps;

        if (category_id) {
            const category = await categoryRepo.findOne({
                where: { id: category_id }
            });
            if (!category) {
                return h.response({ message: 'Skill category not found' }).code(404);
            }
            guide.category = category;
        }

        await guideRepo.save(guide);
        return guide;
    } catch (error) {
        return h.response({ message: 'Error updating skill upgrade guide' }).code(500);
    }
};

export const deleteSkillUpgradeGuide = async (request, h) => {
    try {
        const { id } = request.params;
        const employee = request.auth.credentials;

        // Only HR can delete guides
        if (employee.role !== 'hr') {
            return h.response({ message: 'Only HR can delete skill upgrade guides' }).code(403);
        }

        const guide = await guideRepo.findOne({
            where: { id }
        });

        if (!guide) {
            return h.response({ message: 'Skill upgrade guide not found' }).code(404);
        }

        await guideRepo.remove(guide);
        return { message: 'Skill upgrade guide deleted successfully' };
    } catch (error) {
        return h.response({ message: 'Error deleting skill upgrade guide' }).code(500);
    }
}; 