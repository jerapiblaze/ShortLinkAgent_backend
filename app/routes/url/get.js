// get url by id
// if user.protected  ==
//      + null: default (logged in users)
//      + false: public
//      + true: private (no one exept user)

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
        let user_info = req.user_info.dataValues
        let url_info = await db.models.url_info.findByPk(req.query.l)
        
        if (url_info == null){
            res.status(404).send(req.query)
            return
        }
        if (url_info.require_login && user_info == null){
            res.status(403).send(req.query)
            return
        }
        res.send(url_info)
        return
    }
}

export default GetUrl