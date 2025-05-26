import {EntitySchema} from 'typeorm';


export const SkillUpgradeGuide = new EntitySchema({
    name: 'SkillUpgradeGuide',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        skill_name : {
            type : "varchar",
        },
        skill_id : {
            type: 'int'
        },
        from_level : {
            type: 'int'
        },
        to_level : {
            type: 'int'
        },
        plan : {
            type: 'text'
        },
        resources : {
            type : "text"
        }
    },
    relations:{
        skill_category : {
            target:'SkillCategory',
            type:"many-to-one",
            onDelete:"CASCADE",
            joinColumn: {
                name: "skill_id",
                referencedColumnName: "skill_id"
            }
        }
    }
});
