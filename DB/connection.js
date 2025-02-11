import 'dotenv/config';
import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize("saraha", "root", '', {
    host: "localhost",
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

