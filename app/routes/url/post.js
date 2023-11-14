// register a new user
// if the user is logged-in: discard the request
// if the username provided is already used: throw error

import generate_id from "../../utils/generate_id.js";

function CreateUrl(db) {
    return async function (req, res) {
        let t = await db.transaction();
        try {
            let user_info = req.user_info ? req.user_info.dataValues : null
            let existing_urlinfo = await db.models.url_info.findByPk(req.body.url_id, { transaction: t })
            if (existing_urlinfo != null) {
                throw "url_id is not available"
            }
            let url_id = generate_id.urlId()
            if (user_info && req.body.url_id) {
                url_id = req.body.url_id
            }
            let url_info = {
                url_id: url_id,
                original_url: req.body.original_url,
                require_login: user_info ? req.body.require_login : 0,
                user_id: user_info ? user_info.user_id : null
            }
            let url_stats = {
                url_id: url_id,
                total_clicks: 0
            }
            await db.models.url_info.create(url_info, { transaction: t })
            await db.models.url_stats.create(url_stats, { transaction: t })
            await t.commit()
            res.status(200).send({ url_info, url_stats })
        } catch (e) {
            // console.log(e)
            res.status(400).send({error: e})
            await t.rollback();
        } finally {
            await db.sync()
        }
    }
}

export default CreateUrl