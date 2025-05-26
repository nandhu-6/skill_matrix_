import Hapi from '@hapi/hapi';
import * as authController from '../controllers/authController.js';

const authRoutes = {
    name: 'auth-routes',
    register: async function (server, options) {
        server.route([
            {
                method: 'POST',
                path: '/signup',
                handler: authController.signup,
                options: {
                    auth: false
                }
            },
            {
                method: 'POST',
                path: '/login',
                handler: authController.login,
                options: {
                    auth: false
                }
            },
            {
                method: 'GET',
                path: '/profile',
                handler: authController.getProfile
            },
            {
                method: 'PUT',
                path: '/profile',
                handler: authController.updateProfile
            }
        ]);
    }
};

export { authRoutes };

