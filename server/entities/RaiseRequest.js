import { EntitySchema } from 'typeorm';


export const Status = {
    PENDING: "pending",
    APPROVED: "approved",
    CANCELLED: "cancelled",
    FORWARD: "forward",
    REJECTED: "rejected"
};

export const RaiseRequest = new EntitySchema({
    name: "RaiseRequest",
    columns: {
        req_id: {
            type: 'int',
            primary: true,
            generated: true
        },
        req_at: {
            type: 'timestamp',
            createDate: true,
        },
        data: {
            type: 'json',  // Original skill rating submitted by employee
            nullable: true
        },
        edited_data: {
            type: 'json',  // Modified skill rating by lead
            nullable: true
        },
        status: {
            type: 'enum',
            enum: Object.values(Status),
            default: Status.PENDING,
        },
        emp_id: {
            type: 'varchar'
        },
        current_approver_id: {
            type: 'varchar',
            nullable: true
        },
        review_history: {
            type: "json",  // Array of review actions with comments
            default: []
        },
        review_chain: {
            type: "json",  // Array of approver IDs in order
            default: []
        }
    },
    relations: {
        employee: {
            type: 'many-to-one',
            target: 'Employee',
            joinColumn: {
                name: 'emp_id'
            },

        },
        current_approver: {
            type: 'many-to-one',
            target: 'Employee',
            joinColumn: {
                name: 'current_approver_id'
            },
        }
    }
});
