import { EntitySchema } from 'typeorm';


export const DepartmentNames = {
    PRODUCT: "product",
    HR: "hr"
}

export const Department = new EntitySchema({
    name: "Department",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        name: {
            type: 'enum',
            enum: Object.values(DepartmentNames)
        }
    },
    relations: {
        employees: {
            type: 'one-to-many',
            target: 'Employee',
            inverseSide: 'department',
        }
    }
});