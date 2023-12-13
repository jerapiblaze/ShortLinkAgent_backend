// get url by id
// if user.protected  ==
//      + false: public
//      + true: private (logged in users only)

function GetUrl(db) {
    return async function (req, res) {
        if (req.query.l == null) {
            if (req.user_info == null) {
                res.status(400).send()
                return
            }
            res.redirect(`/url/search?u=${req.user_info.dataValues.user_id}`)
            return
        }
        let user_info = req.user_info ? req.user_info.dataValues : null
        let url_info = await db.models.url_info.findByPk(req.query.l)
        let url_stats = await db.models.url_stats.findByPk(req.query.l)
        if (url_info == null) {
            res.status(404).send(req.query)
            return
        }
        let total_clicks = url_stats.dataValues.total_clicks + 1
        db.sync()
        db.models.url_stats.update({total_clicks:total_clicks}, {
            where:{
                url_id:url_info.url_id
            }
        })
        if (url_info.require_login && user_info == null) {
            res.status(403).send(req.query)
            return
        }
        res.send({url_info, url_stats})
        return
    }
}

export default GetUrl