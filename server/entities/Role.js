import { EntitySchema } from 'typeorm';

export const RoleNames = {
    EMPLOYEE: "employee",
    LEAD: "lead",
    HR: "hr"
}

export const Role = new EntitySchema({
    name: "Role",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'enum',
            enum: Object.values(RoleNames)
        }
    },
    relations: {
        employees: {
            type: 'one-to-many',
            target: 'Employee',
            inverseSide: 'role',
        }
    }
});