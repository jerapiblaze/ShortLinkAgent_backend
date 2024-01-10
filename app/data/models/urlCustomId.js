import { DataTypes } from "sequelize";

const tableName = "custom_urlid";

const table = {
    custom_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    url_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}

export default {
    tableName, table
}