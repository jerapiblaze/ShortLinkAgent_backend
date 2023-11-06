// register a new user
// if the user is logged-in: discard the request
// if the username provided is already used: throw error

function DeleteUrl(db) {
    return async function (req, res) {
        let t = await db.transaction();
        if (req.user_id == null || req.query.l == null) {
            res.status(403).send()
            return
        }
        let user_info = req.user_info.dataValues
        let url_info = await db.models.url_info.findByPk(req.query.l)
        if (url_info == null) {
            res.status(404).send()
            return
        }
        if (url_info.user_id != user_info.user_id) {
            res.status(403).send()
            return
        }
        try {
            await db.models.url_info.destroy({
                where:{
                    url_id: req.query.l
                },
                transaction: t
            })
            await db.models.url_stats.destroy({
                where:{
                    url_id: req.query.l
                },
                transaction: t
            })
            await t.commit()
            res.status(200).send()
        } catch (e) {
            t.rollback();
            res.status(400).send(e)
        } finally {
            await db.sync()
        }
    }
}

export default DeleteUrl