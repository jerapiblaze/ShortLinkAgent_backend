import jwt from 'jsonwebtoken'
import jwtConfig from '../../config/jwtConfig.js'
import serverConfig from '../../config/serverConfig.js'

function GetSession(db) {
    return async function (req, res) {
        if (req.user_info == null){
            res.status(400).send()
            return
        }
        let sessions = await db.models.session_info.findAll({
            where:{
                user_id: req.user_info.dataValues.user_id
            }
        })
        res.send(sessions)
        return
    }
}

export default GetSession