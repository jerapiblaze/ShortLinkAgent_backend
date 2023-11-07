import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwtConfig.js'
import serverConfig from '../../config/serverConfig.js'

function NewSession(db) {
    return async function (req, res) {
        if (req.user_id) {
            res.redirect(`/session?token=${req.access_token}`)
            return
        }
        let t = await db.transaction()
        try {
            let user_credential = await db.models.user_credential.findOne({
                where: {
                    username: req.body.username,
                    hashed_password: req.body.hashed_password
                }
            })
            if (user_credential == null) {
                res.status(401).send()
                return
            }
            let access_token = jwt.sign({ user_id: user_credential.dataValues.user_id }, jwtConfig.SECRET_KEY)
            let session_info = {
                token: access_token,
                is_valid: true,
                user_id: user_credential.dataValues.user_id
            }
            let session = await db.models.session_info.create(session_info, { transaction: t })
            await t.commit()
            res.send(session)
        } catch (e) {
            await t.rollback()
            res.status(500).send(e)
        } finally {
            await db.sync()
        }

    }
}

export default NewSession