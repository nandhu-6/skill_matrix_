import Joi from 'joi';
import {
    createSkillCategory,
    getAllSkillCategories,
    updateSkillCategory,
    deleteSkillCategory,
    getSkillCategoryById
} from '../controllers/skillCategoryController.js';
import { checkRole } from '../middlewares/auth.js';
import Hapi from '@hapi/hapi';

const skillCategoryRoutes = {
    name: 'skill-category-routes',
    register: async function (server, options) {
        server.route([
            {
                method: 'POST',
                path: '/',
                handler: createSkillCategory
            },
            {
                method: 'GET',
                path: '/',
                handler: getAllSkillCategories
            },
            {
                method: 'GET',
                path: '/{id}',
                handler: getSkillCategoryById
            },
            {
                method: 'PUT',
                path: '/{id}',
                handler: updateSkillCategory
            },
            {
                method: 'DELETE',
                path: '/{id}',
                handler: deleteSkillCategory
            }
        ]);
    }
};

export { skillCategoryRoutes }; 