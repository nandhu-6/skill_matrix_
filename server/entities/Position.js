import { EntitySchema } from 'typeorm';

export const PositionNames = {
    FRONTEND: "frontend",
    BACKEND: "backend",
    TESTING: "testing",
    HR: "hr",
}

export const Position = new EntitySchema({
    name: "Position",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'enum',
            enum: Object.values(PositionNames)
        }
    },
    relations: {
        employees: {
            type: 'one-to-many',
            target: 'Employee',
            inverseSide: 'position',
        }
    }
});