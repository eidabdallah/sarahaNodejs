import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import messageModel from './message.model.js';
const userModel = sequelize.define('User',
    {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        confirmEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        sendCode :{
            type: DataTypes.STRING,
            defaultValue: ''
        },
        role:{
            type:DataTypes.ENUM('user','admin'),
            defaultValue:'user',
            allowNull: false
        },
        urlUser : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
});
userModel.hasMany(messageModel, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
  });
  
  messageModel.belongsTo(userModel, {
    foreignKey: "UserId",
    onDelete: "CASCADE",
  });
  
export default userModel;