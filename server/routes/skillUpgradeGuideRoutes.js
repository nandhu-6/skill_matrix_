import { HR } from '../constants/constant.js';
import { checkRole } from '../middlewares/auth.js';
import {
    createSkillUpgradeGuide,
    getAllSkillUpgradeGuides,
    updateSkillUpgradeGuide,
    deleteSkillUpgradeGuide,
    getSkillUpgradeGuideById
} from '../controllers/skillUpgradeGuideController.js';

const skillUpgradeGuideRoutes = {
    name: 'skill-upgrade-guide-routes',
    register: async function (server, options) {
        server.route([
            {
                method: 'POST',
                path: '/create-guide',
                handler: createSkillUpgradeGuide,
                options: {
                    pre: [{ method: checkRole(HR) }]
                }
            },
            {
                method: 'GET',
                path: '/get-all-guides',
                handler: getAllSkillUpgradeGuides
            },
            {
                method: 'GET',
                path: '/get-guide-by-id/{id}', //get guide by skill id
                handler: getSkillUpgradeGuideById
            },
            {
                method: 'PUT',
                path: '/update-guide/{id}',
                handler: updateSkillUpgradeGuide,
                options: {
                    pre: [{ method: checkRole(HR) }]
                }
            },
            {
                method: 'DELETE',
                path: '/delete-guide/{id}',
                handler: deleteSkillUpgradeGuide,
                options: {
                    pre: [{ method: checkRole(HR) }]
                }
            }
        ]);
    }
};

export { skillUpgradeGuideRoutes }; 