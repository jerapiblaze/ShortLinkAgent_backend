import userCredentials from "./userCredentials.js";
import userInfo from "./userInfo.js";
import urlInfo from "./urlInfo.js";
import urlStats from "./urlStats.js";
import sessionInfo from "./sessionInfo.js";

export default async (db) => {
    let user_credentials = db.define(userCredentials.tableName, userCredentials.table)
    let user_info = db.define(userInfo.tableName, userInfo.table)
    let url_info = db.define(urlInfo.tableName, urlInfo.table)
    let url_stats = db.define(urlStats.tableName, urlStats.table)
    let session_info = db.define(sessionInfo.tableName, sessionInfo.table)
    console.log(db.models)
    // await db.sync({ force: true })
    await db.sync()
}