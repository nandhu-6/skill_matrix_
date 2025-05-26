import {EntitySchema} from 'typeorm';

export const SkillCategory = new EntitySchema({
    name: 'SkillCategory',
    columns:{
        skill_id:{
            primary:true,
            type:"int",
            generated:true
        },
        name:{
            type:"varchar",
            unique : true
        },
        description : {
            type : "json"
        },
        created_by : {
            type :"varchar",
            nullable :true
        },
        created_at :{
            type :"timestamp",
            createDate : true
        },
        position : {
            type : "varchar",
            array : true,
            nullable : true
        }
    },
    relations : {
        created_by_Emp : {
            target :'Employee',
            type : 'many-to-one',
            joinColumn : {
                name : 'created_by'
            },
            onDelete : "SET NULL"
        }
    }
});
