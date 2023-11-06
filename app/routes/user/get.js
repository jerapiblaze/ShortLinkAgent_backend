// get user by id
// if user.protected  ==
//      + null: default (logged in users)
//      + false: public
//      + true: private (no one exept user)

function GetUser(db) {
    return async function (req, res) {
        if (req.query.u == null){
            if (req.user_info == null){
                res.status(400).send()
                return
            }
            res.redirect(`/user?u=${req.user_id}`)
            return
        }
        let user_info = await db.models.user_info.findByPk(req.query.u)
        if (user_info == null){
            res.status(404).send(req.query)
            return
        }
        if (user_info.dataValues.protected == null){
            res.send(user_info)
            return
        }
        if (user_info.dataValues.protected){
            res.status(404).send(req.query)
            return
        }
        res.send(user_info)
    }
}

export default GetUser