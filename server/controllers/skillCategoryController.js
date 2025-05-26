import { AppDataSource } from '../config/database.js';
import { SkillCategory } from '../entities/SkillCategory.js';

const skillCategoryRepo = AppDataSource.getRepository(SkillCategory);

export const createSkillCategory = async (request, h) => {
    try {
        const { name, description } = request.payload;
        const employee = request.auth.credentials;

        // Only HR can create skill categories
        if (employee.role !== 'hr') {
            return h.response({ message: 'Only HR can create skill categories' }).code(403);
        }

        const category = skillCategoryRepo.create({
            name,
            description,
            created_by: employee.id
        });

        await skillCategoryRepo.save(category);
        return category;
    } catch (error) {
        return h.response({ message: 'Error creating skill category' }).code(500);
    }
};

export const getAllSkillCategories = async (request, h) => {
    try {
        const categories = await skillCategoryRepo.find({
            relations: ['createdBy']
        });
        return categories;
    } catch (error) {
        return h.response({ message: 'Error fetching skill categories' }).code(500);
    }
};

export const getSkillCategoryById = async (request, h) => {
    try {
        const { id } = request.params;
        const category = await skillCategoryRepo.findOne({
            where: { id },
            relations: ['createdBy']
        });

        if (!category) {
            return h.response({ message: 'Skill category not found' }).code(404);
        }

        return category;
    } catch (error) {
        return h.response({ message: 'Error fetching skill category' }).code(500);
    }
};

export const updateSkillCategory = async (request, h) => {
    try {
        const { id } = request.params;
        const { name, description } = request.payload;
        const employee = request.auth.credentials;

        // Only HR can update skill categories
        if (employee.role !== 'hr') {
            return h.response({ message: 'Only HR can update skill categories' }).code(403);
        }

        const category = await skillCategoryRepo.findOne({
            where: { id }
        });

        if (!category) {
            return h.response({ message: 'Skill category not found' }).code(404);
        }

        if (name) category.name = name;
        if (description) category.description = description;

        await skillCategoryRepo.save(category);
        return category;
    } catch (error) {
        return h.response({ message: 'Error updating skill category' }).code(500);
    }
};

export const deleteSkillCategory = async (request, h) => {
    try {
        const { id } = request.params;
        const employee = request.auth.credentials;

        // Only HR can delete skill categories
        if (employee.role !== 'hr') {
            return h.response({ message: 'Only HR can delete skill categories' }).code(403);
        }

        const category = await skillCategoryRepo.findOne({
            where: { id }
        });

        if (!category) {
            return h.response({ message: 'Skill category not found' }).code(404);
        }

        await skillCategoryRepo.remove(category);
        return { message: 'Skill category deleted successfully' };
    } catch (error) {
        return h.response({ message: 'Error deleting skill category' }).code(500);
    }
}; 