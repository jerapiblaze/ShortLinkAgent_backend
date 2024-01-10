import config from "../../config/dbConfig.js"

import userCredentials from "./userCredentials.js";
import userInfo from "./userInfo.js";
import urlInfo from "./urlInfo.js";
import urlStats from "./urlStats.js";
import sessionInfo from "./sessionInfo.js";
import customUrlId from "./urlCustomId.js"

export default async (db) => {
    let user_credentials = db.define(userCredentials.tableName, userCredentials.table)
    let user_info = db.define(userInfo.tableName, userInfo.table)
    let url_info = db.define(urlInfo.tableName, urlInfo.table)
    let url_stats = db.define(urlStats.tableName, urlStats.table)
    let session_info = db.define(sessionInfo.tableName, sessionInfo.table)
    let custom_urlid = db.define(customUrlId.tableName, customUrlId.table)
    
    user_info.hasMany(user_credentials, {
        foreignKey:"user_id"
    })
    // user_credentials.belongsTo(user_info)
    
    user_info.hasMany(session_info, {
        foreignKey: "user_id"
    })
    // session_info.belongsTo(user_info)

    user_info.hasMany(url_info, {
        foreignKey: "user_id"
    })
    // url_info.belongsTo(user_info)
    
    url_info.hasOne(url_stats, {
        foreignKey: "url_id"
    })
    // url_stats.belongsTo(url_info)

    url_info.hasMany(custom_urlid, {
        foreignKey: "url_id"
    })
    // custom_urlid.belongsTo(url_info)
    // console.log(db.models)
    // await db.sync({ force: true })
    let force = config.OVERWRITE == "true" ? true : false
    await db.sync({force: force})
}