// register a new user
// if the user is logged-in: discard the request
// if the username provided is already used: throw error

import { Op } from "sequelize"

function PutCustomUrlId(db) {
    return async function (req, res) {
        if (req.user_info == null) {
            res.status(403).send()
            return
        }
        let request_url_id = req.query.l
        let request_custom_id = req.body.url_id
        if (!request_custom_id){
            res.status(403).send()
            return
        }
        let existing_custom_urlid = await db.models.custom_urlid.findByPk(request_custom_id)
        if (existing_custom_urlid != null){
            res.status(403).send("custom url_id is not available")
            return
        }
        let url_id = await db.models.custom_urlid.findOne({
            where:{
                [Op.or]:[
                    {
                        custom_id:request_url_id
                    },
                    {
                        url_id:request_url_id
                    }
                ]
            }
        })
        if (url_id == null){
            res.status(404).send()
        }
        let t = await db.transaction();
        try {
            await db.models.custom_urlid.create({
                url_id: url_id.url_id,
                custom_id: request_custom_id
            }, {
                transaction: t
            })
            await t.commit()
            res.status(200).send()
        } catch (e) {
            t.rollback();
            res.status(400).send(e)
            console.log(e)
        } finally {
            await db.sync()
        }
    }
}

export default PutCustomUrlId