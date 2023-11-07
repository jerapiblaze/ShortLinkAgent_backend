import { DataTypes } from "sequelize";

const tableName = "url_stats";

const table = {
    url_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    total_clicks: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}

export default {
    tableName, table
}