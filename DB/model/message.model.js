import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';


const messageModel = sequelize.define('Message',
    {
        contant: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });


export default messageModel;