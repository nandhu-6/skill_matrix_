import { EntitySchema } from 'typeorm';

export const Position = {
    FRONTEND: "frontend",
    BACKEND: "backend",
    TESTING: "testing",
    HR: "hr",
}

export const Role = {
    EMPLOYEE: "employee",
    LEAD: "lead",
    HR: "hr"
}

export const Team = {
    INFORIVER: "inforiver",
    VALQ: "valq"
}

export const Department = {
    PRODUCT: "product",
    HR: "hr"
}


export const Employee = new EntitySchema({
    name: "Employee",
    columns: {
        id: {
            primary: true,
            type: 'varchar'
        },
        name: {
            type: 'varchar',
        },
        email: {
            type: 'varchar',
            unique: true,
        },
        password: {
            type: 'varchar',
            nullable: true,
            select: false
        },
        role: {
            type: "enum",
            enum: Object.values(Role)
        },
        team: {
            type: "enum",
            enum: Object.values(Team),
            nullable: true
        },
        lead_id: {
            type: 'varchar',
            nullable: true
        },
        hr_id: {
            type: 'varchar',
            nullable: true
        },
        department: {
            type: "enum",
            enum: Object.values(Department)
        },
        position: {
            type: "enum",
            enum: Object.values(Position)
        },
        created_at: {
            type: 'timestamp',
            createDate: true
        },
        skill_score: {
            type: 'json'
        },
        score: {
            type: 'float',
            default: 0.0
        },
        last_updated_at: {
            type: 'timestamp',
            updateDate: true
        }
    },
    relations: {
        lead: {
            target: "Employee",
            type: "many-to-one",
            joinColumn: {
                name: "lead_id"
            },
            onDelete: "SET NULL" //if lead is deleted set employee's lead to null
        },
        hr: {
            target: "Employee",
            type: "many-to-one",
            joinColumn: {
                name: "hr_id"
            },
            onDelete: "SET NULL" //if hr is deleted set employee's hr to null

        },
        skillRequests: {
            target: "RaiseRequest",
            type: "one-to-many",
            inverseSide: "employee"
        }
    }


})
