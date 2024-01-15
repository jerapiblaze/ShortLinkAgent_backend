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
        let request_url_id = req.query.l
        let custom_urlid = await db.models.custom_urlid.findByPk(request_url_id)
        let url_id = custom_urlid != null ? custom_urlid.url_id : request_url_id

        let user_info = req.user_info ? req.user_info.dataValues : null
        let url_info = await db.models.url_info.findByPk(url_id, {
            include: ["url_stat", "custom_urlids"]
        })
        // let url_stats = await db.models.url_stats.findByPk(url_id)
        // if (url_info == null) {
        //     res.status(404).send(req.query)
        //     return
        // }
        // let total_clicks = url_stats.dataValues.total_clicks + 1
        // db.models.url_stats.update({total_clicks:total_clicks}, {
        //     where:{
        //         url_id:url_info.url_id
        //     }
        // })
        db.sync()
        if (url_info.require_login && user_info == null) {
            res.status(403).send(req.query)
            return
        }
        res.send(url_info)
        return
    }
}

export default GetUrl