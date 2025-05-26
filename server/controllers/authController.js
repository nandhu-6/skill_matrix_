import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/database.js';
import { Employee, Role, Position, Team, Department } from '../entities/Employee.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const employeeRepo = AppDataSource.getRepository(Employee);

export const signup = async (request, h) => {
    try {
        const { email, password } = request.payload;

        // Check if email already exists
        const employee = await employeeRepo.findOne({
            where: { email }
        });

        if (!employee) {
            return h.response({ message: 'Employee record does not exist' }).code(404);
        }

        if (employee.password) {
            return h.response({ message: 'Employee already signed up, Please Login' }).code(409);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        employee.password = hashedPassword;

        await employeeRepo.save(employee);

        return h.response({ message: 'Signup successful' }).code(200);
    } catch (error) {
        console.error('Signup error:', error);
        return h.response({ message: 'Error during signup' }).code(500);
    }
};

export const login = async (request, h) => {
    try {
        const { email, password } = request.payload;

        const employee = await employeeRepo.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'role', 'team', 'lead_id', 'hr_id', 'department', 'position']
        });

        if (!employee) {
            return h.response({ message: 'Invalid credentials' }).code(401);
        }

        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return h.response({ message: 'Invalid credentials' }).code(401);
        }

        const token = jwt.sign(
            { id: employee.id, role: employee.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        const { password: _, ...employeeWithoutPassword } = employee;
        return {
            message: 'Login successful',
            token,
            employee: employeeWithoutPassword
        };
    } catch (error) {
        console.error('Login error:', error);
        return h.response({ message: 'Internal server error' }).code(500);
    }
};

export const getProfile = async (request, h) => {
    try {
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id },
            select: ['id', 'name', 'email', 'role', 'team', 'lead_id', 'hr_id', 'department', 'position', 'skill_score', 'score']
        });

        if (!employee) {
            return h.response({ message: 'Employee not found' }).code(404);
        }

        return employee;
    } catch (error) {
        return h.response({ message: 'Error fetching profile' }).code(500);
    }
};

export const updateProfile = async (request, h) => {
    try {
        const { name, email } = request.payload;
        const employee = await employeeRepo.findOne({
            where: { id: request.auth.credentials.id }
        });

        if (!employee) {
            return h.response({ message: 'Employee not found' }).code(404);
        }

        if (name) employee.name = name;
        if (email) employee.email = email;

        await employeeRepo.save(employee);
        return { message: 'Profile updated successfully' };
    } catch (error) {
        return h.response({ message: 'Error updating profile' }).code(500);
    }
}; 