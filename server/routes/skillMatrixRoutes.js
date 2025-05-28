import {
    getTeams,
    getFilteredMatrix,
    submitSkillRequest,
    getPendingRequests,
    handleSkillRequest,
    cancelSkillRequest,
    getMyRequests
} from '../controllers/skillMatrixController.js';
import { checkRole } from '../middlewares/auth.js';
import { LEAD_HR } from '../constants/constant.js';


const skillMatrixRoutes = {
    name: 'skill-matrix-routes',
    register: async function (server, options) {
        server.route([
            // Skill Matrix Routes
            {
                method: 'GET',
                path: '/',
                handler: getTeams,
            },
            // {
            //     method: 'GET',
            //     path: '/filters',
            //     handler: getFilteredMatrix,
            // },

            // Raise Request Routes
            {
                method: 'POST',
                path: '/skill-requests',
                handler: submitSkillRequest,
            },
            {
                method: 'GET',
                path: '/skill-requests/pending',
                handler: getPendingRequests,
                options: {
                    pre: [{ method: checkRole(LEAD_HR) }]
                }
            },
            {
                method: 'POST',
                path: '/{requestId}/handle',
                handler: handleSkillRequest,
                options: {
                    pre: [{ method: checkRole(LEAD_HR) }]
                }
            },
            {
                method: 'POST',
                path: '/{requestId}/cancel',
                handler: cancelSkillRequest,
            },
            {
                method: 'GET',
                path: '/my-requests',
                handler: getMyRequests,
            }
        ]);
    }
};

export { skillMatrixRoutes };