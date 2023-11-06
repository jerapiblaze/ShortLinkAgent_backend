// register a new user
// if the user is logged-in: discard the request
// if the username provided is already used: throw error

function UpdateUrl(db) {
    return async function (req, res) {
        let t = await db.transaction();
        if (req.user_info == null) {
            res.status(403).send()
            return
        }
        let user_info = req.user_info ? req.user_info.dataValues : null
        let url_info = await db.models.url_info.findByPk(req.body.url_id, { transaction: t })
        if (url_info == null) {
            res.status(404).send()
            return
        }
        if (url_info.user_id != user_info.user_id) {
            res.status(403).send()
            return
        }
        try {
            await db.models.url_info.update({
                require_login: req.body.require_login!=null ? req.body.require_login : url_info.require_login,
                original_url: req.body.original_url!=null ? req.body.original_url : url_info.original_url
            }, {
                where:{
                    url_id: url_info.url_id
                },
                transaction: t
            })
            await t.commit()
            res.redirect(`/url/?l=${url_info.url_id}`)
        } catch (e) {
            t.rollback();
            res.status(400).send(e)
        } finally {
            await db.sync()
        }
    }
}

export default UpdateUrl