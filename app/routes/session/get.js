import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwtConfig.js'
import serverConfig from '../../config/serverConfig.js'

function GetSession(db) {
    return async function (req, res) {
        if (req.query.token == null){
            res.status(400).send()
            return
        }
        let session = await db.models.session_info.findByPk(req.query.token)
        if (session == null){
            res.status(404).send()
            return
        }
        res.status(200).send(session)
        return
    }
}

export default GetSession