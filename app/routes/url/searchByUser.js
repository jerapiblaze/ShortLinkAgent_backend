// get url by id
// if user.protected  ==
//      + null: default (logged in users)
//      + false: public
//      + true: private (no one exept user)

function GetUrlByUser(db) {
    return async function (req, res) {
        if (req.query.u == null) {
            if (req.user_info == null) {
                res.status(400).send()
                return
            }
            res.redirect(`/search?u=${req.user_info.dataValues.user_id}`)
            return
        }
        let user_info = await db.models.user_info.findByPk(req.query.u)
        if (user_info == null) {
            res.status(404).send()
        }
        let url_info = await db.models.url_info.findAll({
            where: {
                user_id: user_info.dataValues.user_id
            }
        })
        if (url_info == null) {
            res.status(404).send(req.query)
            return
        }
        if (url_info.require_login && user_info == null) {
            res.status(403).send(req.query)
            return
        }
        res.send(url_info)
    }
}

export default GetUrlByUser