// register a new user
// if the user is logged-in: discard the request
// if the username provided is already used: throw error

import generate_id from "../../utils/generate_id.js";

function CreateUrl(db) {
    return async function (req, res) {
        let t = await db.transaction();
        try {
            let url_id = generate_id.urlId()
            let custom_id = req.body.url_id
            let user_info = req.user_info ? req.user_info.dataValues : null
            let existing_urlinfo = await db.models.url_info.findByPk(url_id, { transaction: t })
            let existing_custom_id = await db.models.custom_urlid.findByPk(custom_id, { transaction: t })
            if (existing_urlinfo != null || existing_custom_id != null) {
                throw "url_id is not available"
            }
            if (!(user_info && req.body.url_id)) {
                custom_id = url_id
            }
            let notes = null
            if (user_info && req.body.notes) {
                notes = req.body.notes
            }
            let url_info = {
                url_id: url_id,
                original_url: req.body.original_url,
                require_login: user_info ? req.body.require_login : 0,
                user_id: user_info ? user_info.user_id : null,
                notes:notes
            }
            let url_stats = {
                url_id: url_id,
                total_clicks: 0
            }
            let custom_urlid = {
                custom_id: custom_id,
                url_id: url_id
            }
            await db.models.url_info.create(url_info, { transaction: t })
            await db.models.url_stats.create(url_stats, { transaction: t })
            await db.models.custom_urlid.create(custom_urlid, {transaction: t})
            await t.commit()
            res.status(200).send({ url_info, url_stats , custom_urlid})
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