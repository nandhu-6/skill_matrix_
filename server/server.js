import Hapi from '@hapi/hapi';
import { AppDataSource } from './config/database.js';
import { authRoutes } from './routes/authRoutes.js';
import { skillCategoryRoutes } from './routes/skillCategoryRoutes.js';
import { skillUpgradeGuideRoutes } from './routes/skillUpgradeGuideRoutes.js';
import { skillMatrixRoutes } from './routes/skillMatrixRoutes.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import JWT from '@hapi/jwt';

const JWT_SECRET = process.env.JWT_SECRET;

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 7010,
        host: 'localhost',
        routes: {
            cors: true
        }
    });

    // Register JWT plugin
    await server.register(JWT);

    // JWT Authentication Strategy
    server.auth.strategy('jwt', 'jwt', {
        keys: JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: 24 * 60 * 60 // 24 hours
        },
        validate: async (artifacts, request, h) => {
            try {
                const decoded = jwt.verify(artifacts.token, JWT_SECRET);
                // console.log("Decoded JWT:", decoded);

                return {
                    isValid: true,
                    credentials: { id: decoded.id, role: decoded.role.name } //credentials is set 
                };
            } catch (err) {
                return {
                    isValid: false,
                    credentials: null
                };
            }
        }
    });

    server.auth.default('jwt');

    // Register routes
    await server.register({
        plugin: authRoutes,
        routes: {
            prefix: '/auth'
        }
    });
    await server.register({
        plugin: skillCategoryRoutes,
        routes: {
            prefix: '/skill-categories'
        }
    });
    await server.register({
        plugin: skillUpgradeGuideRoutes,
        routes: {
            prefix: '/skill-upgrade-guide'
        }
    });
    await server.register({
        plugin: skillMatrixRoutes,
        routes: {
            prefix: '/skill-matrix'
        }
    });


    // Initialize database connection
    try {
        await AppDataSource.initialize();
        console.log('Database connected');

        await server.start();
        console.log('Server running on %s', server.info.uri);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

init();