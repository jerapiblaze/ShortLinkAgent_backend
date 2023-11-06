import { DataTypes } from "sequelize";

const tableName = "url_info";

const table = {
    url_id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    original_url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    require_login:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:true
    }
}

export default {
    tableName, table
}