// update user
// if user is not logged in: ignore the request

// delete a user
// if user is not logged in: ignore the request

function UpdateUser(db) {
    return async function (req, res) {
        if (req.user_id == null) {
            res.status(403).send()
            return
        }
        let user_info = await db.models.user_info.findByPk(req.user_id)
        let user_credential = await db.models.user_credential.findByPk(req.user_id)
        if (user_info == null || user_credential == null) {
            res.status(403).send()
            return
        }  
        let t = await db.transaction()
        try {
            //update user info
            await db.models.user_info.update({
                fullname: req.body.fullname != null ? req.body.fullname : user_info.fullname,
                avatar: req.body.avatar != null ? req.body.avater : user_info.avatar,
                protect_level: req.body.protect_level != null ? req.body.protect_level : user_info.protect_level
            }, {
                where:{
                    user_id: user_info.user_id
                },
                transaction: t
            })
            await t.commit()
            res.status(200).send()
        } catch (e) {
            await t.rollback()
            res.status(500).send(e)
        } finally {
            await db.sync()
        }
    }
}

export default UpdateUser