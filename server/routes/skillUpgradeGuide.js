import Joi from 'joi';
import {
    createSkillUpgradeGuide,
    getAllSkillUpgradeGuides,
    updateSkillUpgradeGuide,
    deleteSkillUpgradeGuide,
    getSkillUpgradeGuideById,
    getGuidesByCategory
} from '../controllers/skillUpgradeGuideController.js';
import { checkRole } from '../middlewares/auth.js';
import Hapi from '@hapi/hapi';

const skillUpgradeGuideRoutes = {
    name: 'skill-upgrade-guide-routes',
    register: async function (server, options) {
        server.route([
            {
                method: 'POST',
                path: '/',
                handler: createSkillUpgradeGuide
            },
            {
                method: 'GET',
                path: '/',
                handler: getAllSkillUpgradeGuides
            },
            {
                method: 'GET',
                path: '/{id}',
                handler: getSkillUpgradeGuideById
            },
            {
                method: 'GET',
                path: '/category/{category_id}',
                handler: getGuidesByCategory
            },
            {
                method: 'PUT',
                path: '/{id}',
                handler: updateSkillUpgradeGuide
            },
            {
                method: 'DELETE',
                path: '/{id}',
                handler: deleteSkillUpgradeGuide
            }
        ]);
    }
};

export { skillUpgradeGuideRoutes }; 