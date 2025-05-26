import {DataSource} from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();
import { Employee } from '../entities/Employee.js';
import { SkillCategory } from '../entities/SkillCategory.js';
import { RaiseRequest } from '../entities/RaiseRequest.js';
import { SkillUpgradeGuide } from '../entities/SkillUpgradeGuide.js';


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
//   ssl : {
//     rejectUnauthorized:false,
//   },
  entities: [Employee,SkillCategory,RaiseRequest, SkillUpgradeGuide],
  migrations: [],
  subscribers:[]
});
