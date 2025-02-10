import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize("freedb_saraha", "freedb_EidAbdallah@", "WF5dV*rwPEbSsJC", {
    host: "sql.freedb.tech",
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