// get url by id
// if user.protected  ==
//      + null: default (logged in users)
//      + false: public
//      + true: private (no one exept user)

import { Op } from "sequelize"

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
            return
        }
        let url_info = await db.models.url_info.findAll({
            where: {
                user_id: user_info.dataValues.user_id
            },
            include: ["url_stat", "custom_urlids"]
        })
        if (url_info == null) {
            res.status(404).send(req.query)
            return
        }
        if (url_info.require_login && user_info == null) {
            res.status(403).send(req.query)
            return
        }
        // let output = []
        // for (let url of url_info){
        //     let url_stats = await db.models.url_stats.findByPk(url.url_id)
        //     url.dataValues.stats = url_stats
        //     output.push(url)
        // }
        res.send(url_info)
    }
}

export default GetUrlByUser