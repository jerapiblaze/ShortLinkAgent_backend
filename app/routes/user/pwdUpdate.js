// update user
// if user is not logged in: ignore the request

// delete a user
// if user is not logged in: ignore the request

function UpdateUserPwd(db) {
    return async function (req, res) {
        if (req.user_id == null) {
            res.status(403).send("Not logged in.")
            return
        }
        let t = await db.transaction()
        try {
            let user_info = req.user_info.dataValues
            let user_credential = await db.models.user_credential.findOne({
                where: {
                    user_id: req.user_id
                }
            })
            if (user_info == null || user_credential == null) {
                res.status(403).send("user not found")
                return
            }
            //update user login info
            if (user_credential.dataValues.hashed_password != req.body.hashed_password_old) {
                res.status(403).send("invalid old pwd")
                return
            }
            await db.models.user_credential.update({
                hashed_password: req.body.hashed_password_new
            }, {
                where: {
                    user_id: user_info.user_id
                },
                transaction: t
            })
            await t.commit()
            res.status(200).send()
        } catch (e) {
            await t.rollback()
            console.log(e)
            res.status(500).send(e)
        } finally {
            await db.sync()
        }
    }
}

export default UpdateUserPwd