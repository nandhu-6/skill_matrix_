import Boom from '@hapi/boom';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const checkRole = (allowedRoles) => {
    return (request, h) => {
        const { role } = request.auth.credentials;

        if (!allowedRoles.includes(role)) {
            throw Boom.forbidden("Access denied");
        }

        return h.continue;
    };
};
