import { DataTypes } from "sequelize";

const tableName = "session_info";

const table = {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    is_valid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true
    }
}

export default {
    tableName, table
}