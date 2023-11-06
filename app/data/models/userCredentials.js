import { DataTypes } from "sequelize";

const tableName = "user_credential";

const table = {
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    hashed_password:{
        type:DataTypes.STRING,
        allowNull:false
    }
}

export default {
    tableName, table
}