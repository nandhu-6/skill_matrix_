import {EntitySchema} from 'typeorm';


export const Status = {
    PENDING: "pending",
    APPROVED: "approved",
    CANCELLED: "cancelled",
    FORWARD: "forward",
    REJECTED: "rejected"
};

export const RaiseRequest = new EntitySchema({
    name : "RaiseRequest",
    columns : {
        req_id : {
            type : 'int',
            primary : true,
            generated: true
        },
        req_at: {
            type : 'timestamp',
            createDate : true,
        },
        data : {
            type : 'json'  // Original skill rating submitted by employee
        },
        edited_data : {
            type : 'json',  // Modified skill rating by lead
            nullable: true
        },
        status : {
            type : 'enum',
            enum : Object.values(Status),
            default : Status.PENDING,
        },
        current_approver_id: {
            type: 'varchar',
            nullable: true
        },
        review_history: {
            type : "json",  // Array of review actions with comments
            default: []
        },
        review_chain : {
            type : "json",  // Array of approver IDs in order
            default: []
        }
    },
    relations : {
        employee : {
            type : 'many-to-one',
            target : 'Employee',
            joinColumn : {
                name : 'emp_id'
            },
            onDelete : 'CASCADE', //when employee is deleted, all requests raised by them are also deleted.
            nullable : false,
        },
        current_approver: {
            type: 'many-to-one',
            target: 'Employee',
            joinColumn: {
                name: 'current_approver_id'
            },
            nullable: true
        }
    }
});
