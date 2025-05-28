import { AppDataSource } from '../config/database.js';
import { SkillCategory } from '../entities/SkillCategory.js';

const skillCategoryRepo = AppDataSource.getRepository(SkillCategory);

export const createSkillCategory = async (request, h) => {
    try {
        const { name, description, position } = request.payload;
        const employee = request.auth.credentials;

        const category = skillCategoryRepo.create({
            name,
            description,
            created_by: employee.id,
            position
        });

        await skillCategoryRepo.save(category);
        return category;
    } catch (error) {
        return h.response({ message: 'Error creating skill category' }).code(500);
    }
};

export const getAllSkillCategories = async (request, h) => {
    try {
        const categories = await skillCategoryRepo.find();
        return categories;
    } catch (error) {
        return h.response({ message: 'Error fetching skill categories' }).code(500);
    }
};

export const getSkillCategoryById = async (request, h) => {
    try {
        const { id } = request.params;
        const category = await skillCategoryRepo.findOne({
            where: { skill_id: id }
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
        // console.log("id", request.params);

        const { id } = request.params;
        const { name, description, position } = request.payload;

        const category = await skillCategoryRepo.findOne({
            where: { skill_id: id }
        });
        // console.log("category", category);


        if (!category) {
            return h.response({ message: 'Skill category not found' }).code(404);
        }

        if (name) category.name = name;
        if (description) category.description = description;
        if (position) category.position = position;

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

        const category = await skillCategoryRepo.findOne({
            where: { skill_id: id }
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