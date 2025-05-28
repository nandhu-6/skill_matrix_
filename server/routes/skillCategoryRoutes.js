import { HR } from '../constants/constant.js';
import {
    createSkillCategory,
    getAllSkillCategories,
    updateSkillCategory,
    deleteSkillCategory,
    getSkillCategoryById
} from '../controllers/skillCategoryController.js';
import { checkRole } from '../middlewares/auth.js';


const skillCategoryRoutes = {
    name: 'skill-category-routes',
    register: async function (server, options) {
        server.route([
            {
                method: 'POST',
                path: '/create-skills',
                handler: createSkillCategory,
                options: {
                    pre: [{ method: checkRole(HR) }]
                }
            },
            {
                method: 'GET',
                path: '/get-skills',
                handler: getAllSkillCategories,
            },
            {
                method: 'GET',
                path: '/get-skills-by-id/{id}',
                handler: getSkillCategoryById,

            },
            {
                method: 'PUT',
                path: '/update-skills/{id}',
                handler: updateSkillCategory,
                options: {
                    pre: [{ method: checkRole(HR) }]
                }
            },
            {
                method: 'DELETE',
                path: '/delete-skills/{id}',
                handler: deleteSkillCategory,
                options: {
                    pre: [{ method: checkRole(HR) }]
                }
            }
        ]);
    }
};

export { skillCategoryRoutes }; 