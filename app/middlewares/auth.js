// if no token or the token is invalid -> annonymous
// otherwise it's the user

import jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwtConfig.js'
import serverConfig from '../config/serverConfig.js'

export default function (db) {
    let authFunc = async function (req, res, next) {
        // console.log("dummy authenticate")
        // console.log(req.body)
        let t = await db.transaction()
        try {
            if (req.headers.access_token == undefined || req.headers.access_token == null) {
                throw "No session defined"
            }
            let session_info = await db.models.session_info.findOne({
                where: {
                    token: req.headers.access_token,
                    is_valid: true
                }
            })
            if (session_info == null) {
                throw "Invalid session"
            }
            let current_time = new Date().getTime()
            let updatedAt_time = new Date(session_info.updatedAt).getTime()
            if (current_time - updatedAt_time >= serverConfig.USER_IDLE_TIMEOUT) {
                await db.models.session_info.update({
                    is_valid: false
                }, {
                    where: {
                        token: req.headers.access_token
                    },
                    transaction: t
                })
                await t.commit().catch(async (e, t) => {
                    await t.rollback()
                })
                await db.sync()
                throw "Session expired"
            }
            let authInfo = jwt.verify(req.headers.access_token, jwtConfig.SECRET_KEY)
            req.authInfo = authInfo
            req.user_id = authInfo.user_id
            let user_info = await db.models.user_info.findOne({
                where: {
                    user_id: req.user_id
                }
            })
            if (user_info == null) {
                throw "Invalid user"
            } else {
                await db.models.session_info.update({
                    is_valid: true
                }, {
                    where: {
                        token: req.headers.access_token
                    },
                    transaction: t
                })
                await t.commit().catch(async (e, t) => {
                    await t.rollback()
                })
                await db.sync()
                req.user_info = user_info
            }
        } catch (e) {
            req.user_info = null
        } finally {
            next()
        }
    }
    return authFunc
}