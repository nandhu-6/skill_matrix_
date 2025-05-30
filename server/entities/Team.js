import { EntitySchema } from 'typeorm';

export const TeamNames = {
    INFORIVER: "inforiver",
    VALQ: "valq"
}

export const Team = new EntitySchema({
    name: "Team",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'enum',
            enum: Object.values(TeamNames)
        }
    },
    relations: {
        employees: {
            type: 'one-to-many',
            target: 'Employee',
            inverseSide: 'team',
        }
    }
});