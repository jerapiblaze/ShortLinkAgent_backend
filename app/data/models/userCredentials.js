import { DataTypes } from "sequelize";

const tableName = "user_credential";

const table = {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: false,
        foreignKey: true
    },
    username: {
        type: DataTypes.STRING,
        primaryKey:true,
        allowNull: false
    },
    hashed_password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

export default {
    tableName, table
}