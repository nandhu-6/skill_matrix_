import { EntitySchema } from 'typeorm';

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
        lead_id: {
            type: 'varchar',
            nullable: true
        },
        hr_id: {
            type: 'varchar',
            nullable: true
        },
        role_id: {
            type: 'varchar',
        },
        team_id: {
            type: 'varchar',
            nullable: true
        },
        department_id: {
            type: 'varchar',
            nullable: true
        },
        position_id: {
            type: 'varchar',
            nullable: true
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
        role: {
            target: "Role",
            type: "many-to-one",
            joinColumn: {
                name: "role_id"
            },
            onDelete: "SET NULL" //if role is deleted set employee's role to null
        },
        team: {
            target: "Team",
            type: "many-to-one",
            joinColumn: {
                name: "team_id"
            },
            nullable: true,
            onDelete: "SET NULL" //if team is deleted set employee's team to null
        },
        department: {
            target: "Department",
            type: "many-to-one",
            joinColumn: {
                name: "department_id"
            },
            onDelete: "SET NULL" //if department is deleted set employee's department to null
        },
        position: {
            target: "Position",
            type: "many-to-one",
            joinColumn: {
                name: "position_id"
            },
            onDelete: "SET NULL" //if position is deleted set employee's position to null
        },
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
