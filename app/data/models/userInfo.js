import { DataTypes } from "sequelize";
import userCredentials from "./userCredentials.js";

const tableName = "user_info";

const table = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    protect_level: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}

export default {
    tableName, table
}