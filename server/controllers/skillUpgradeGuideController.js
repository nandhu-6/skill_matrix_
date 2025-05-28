import { AppDataSource } from '../config/database.js';
import { SkillUpgradeGuide } from '../entities/SkillUpgradeGuide.js';
import { SkillCategory } from '../entities/SkillCategory.js';

const guideRepo = AppDataSource.getRepository(SkillUpgradeGuide);
const categoryRepo = AppDataSource.getRepository(SkillCategory);

export const createSkillUpgradeGuide = async (request, h) => {
    try {
        const { skill_id, skill_name, from_level, to_level, plan, resources } = request.payload;

        // Verify category exists
        const category = await categoryRepo.findOne({
            where: { skill_id }
        });

        if (!category) {
            return h.response({ message: 'Skill category not found' }).code(404);
        }

        const guide = guideRepo.create({
            skill_name,
            skill_id,
            from_level,
            to_level,
            plan,
            resources,
        });

        await guideRepo.save(guide);
        return guide;
    } catch (error) {
        return h.response({ message: 'Error creating skill upgrade guide' }).code(500);
    }
};

export const getAllSkillUpgradeGuides = async (request, h) => {
    try {
        const guides = await guideRepo.find();
        return guides;
    } catch (error) {
        return h.response({ message: 'Error fetching skill upgrade guides' }).code(500);
    }
};

export const getSkillUpgradeGuideById = async (request, h) => {
    try {
        const { id } = request.params;
        const guide = await guideRepo.find({
            where: { skill_id: id }
        });

        if (!guide) {
            return h.response({ message: 'Skill upgrade guide not found' }).code(404);
        }

        return guide;
    } catch (error) {
        return h.response({ message: 'Error fetching skill upgrade guide' }).code(500);
    }
};

export const updateSkillUpgradeGuide = async (request, h) => {
    try {
        const { id } = request.params;
        const { skill_id, skill_name, from_level, to_level, plan, resources } = request.payload;

        const guide = await guideRepo.findOne({
            where: { id }
        });

        if (!guide) {
            return h.response({ message: 'Skill upgrade guide not found' }).code(404);
        }
        if (skill_id) guide.skill_id = skill_id;
        if (skill_name) guide.skill_name = skill_name;
        if (from_level) guide.from_level = from_level;
        if (to_level) guide.to_level = to_level;
        if (plan) guide.plan = plan;
        if (resources) guide.resources = resources;

        await guideRepo.save(guide);
        return guide;
    } catch (error) {
        return h.response({ message: 'Error updating skill upgrade guide' }).code(500);
    }
};

export const deleteSkillUpgradeGuide = async (request, h) => {
    try {
        const { id } = request.params;

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