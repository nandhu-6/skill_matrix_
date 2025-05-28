import dotenv from "dotenv";
dotenv.config()
import { Employee } from "./entities/Employee.js";
import { SkillCategory } from "./entities/SkillCategory.js";
import { SkillUpgradeGuide } from "./entities/SkillUpgradeGuide.js";
import { employeeData } from "./seeds/employeeData.js";
import { skillData } from "./seeds/skillData.js";
import { skillUpgradeData } from "./seeds/skillUpgradeData.js";

import { AppDataSource } from "./config/database.js"
// console.log("skillupgradeData" , skillUpgradeData)
export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected succesfully")

        // //seeding employee data
        // await AppDataSource.getRepository(Employee).save(employeeData);
        // console.log("Employee Data seeded successfully");

        // //Seeding Skill Category Data
        // await AppDataSource.getRepository(SkillCategory).save(skillData);
        // console.log("Skill category data seeded successfully");

        //Seeding skill upgrade guide data
        // await AppDataSource.getRepository(SkillUpgradeGuide).save(skillUpgradeData);
        // console.log("Skill Upgrade Guide data seeded successfully");

        // //seeding skill score
        // const employeeRepo = AppDataSource.getRepository(Employee);
        // const employees = await employeeRepo.find(); //fetching all seeded employees
        // // console.log("employees", employees);

        // for (const emp of employees) {
        //     const skills = emp.skill_score || {};
        //     console.log("emp.skill_score", skills);

        //     const skillValues = Object.values(skills);
        //     console.log("skillvalues", skillValues);

        //     if (skillValues.length > 0) {
        //         const averageScore = skillValues.reduce((sum, val) => sum + val, 0) / skillValues.length;
        //         emp.score = averageScore;
        //         console.log("emp.score", emp.score);
        //     }
        //     else {
        //         emp.score = 0;
        //     }
        //     console.log("emp", emp);
        //     await employeeRepo.save(emp);
        // }
        // console.log("Skill scores updated successfully for all employees");


        //closing databse connection
        await AppDataSource.destroy();
        console.log("Database connection closed");
    }
    catch (error) {
        console.error("Error initiaizing Database", error)
    }
};

initializeDatabase();