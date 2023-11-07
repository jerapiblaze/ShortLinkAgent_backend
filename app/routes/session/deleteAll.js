import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwtConfig.js'
import serverConfig from '../../config/serverConfig.js'

function DeleteSession(db) {
    return async function (req, res) {
        if (req.user_info == null) {
            res.status(400).send()
        }
        if (req.query.token == null) {
            res.status(400).send()
            return
        }
        if (req.headers.access_token != req.query.token) {
            res.status(400).send()
        }
        let session = db.models.session_info.findByPk(req.query.token)
        let t = await db.transaction()
        try {
            await db.models.session_info.update({
                is_valid: false
            }, {
                where: {
                    user_id: req.user_info.dataValues.user_id
                },
                transaction: t
            })
            await t.commit()
            res.status(200).send(session)
        } catch (e) {
            await t.rollback()
            res.status(500).send(session)
        } finally {
            await db.sync()
            return
        }
    }
}

export default DeleteSession