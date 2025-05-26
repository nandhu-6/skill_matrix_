import {
    getSkillMatrix,
    getFilteredMatrix,
    submitSkillRequest,
    getPendingRequests,
    handleSkillRequest,
    cancelSkillRequest,
    getMyRequests
} from '../controllers/skillMatrixController.js';
import { checkRole } from '../middlewares/auth.js';
import Hapi from '@hapi/hapi';

const skillMatrixRoutes = {
    name: 'skill-matrix-routes',
    register: async function (server, options) {
        server.route([
            // Skill Matrix Routes
            {
                method: 'GET',
                path: '/api/skill-matrix',
                handler: getSkillMatrix,

            },
            {
                method: 'GET',
                path: '/api/skill-matrix/filters',
                handler: getFilteredMatrix,

            },

            // Raise Request Routes
            {
                method: 'POST',
                path: '/api/skill-requests',
                handler: submitSkillRequest,
                options: {
                    pre: [{ method: checkRole(['employee']) }]
                }
            },
            {
                method: 'GET',
                path: '/api/skill-requests/pending',
                handler: getPendingRequests,
                options: {
                    pre: [{ method: checkRole(['lead', 'hr']) }]
                }
            },
            {
                method: 'POST',
                path: '/api/skill-requests/{requestId}/handle',
                handler: handleSkillRequest,
                options: {
                    pre: [{ method: checkRole(['lead', 'hr']) }]
                }
            },
            {
                method: 'POST',
                path: '/api/skill-requests/{requestId}/cancel',
                handler: cancelSkillRequest,
                options: {
                    pre: [{ method: checkRole(['employee']) }]
                }
            },
            {
                method: 'GET',
                path: '/api/skill-requests/my-requests',
                handler: getMyRequests,
            }
        ]);
    }
};

export { skillMatrixRoutes };