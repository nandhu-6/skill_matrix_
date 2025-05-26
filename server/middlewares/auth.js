import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database.js';
import { Employee } from '../entities/Employee.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const employeeRepo = AppDataSource.getRepository(Employee);
        const employee = await employeeRepo.findOne({
            where: { id: decoded.id },
            select: ['id', 'name', 'email', 'role', 'team', 'lead_id', 'hr_id', 'department', 'position']
        });

        if (!employee) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.employee = employee;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.employee.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
