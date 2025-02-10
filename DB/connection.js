import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    port: 3306,
    dialect: 'mysql'
});
export const connectDB = async () => {
    try {
        await sequelize.sync();
        console.log('Connected to the database successfully......');
    } catch (error) {
        console.error('Error connecting to the database :', error || error.message);
    }
}