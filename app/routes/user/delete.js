// delete a user
// if user is not logged in: ignore the request

function DeleteUser(db) {
    return async function (req, res) {
        if (req.user_info == null) {
            res.status(403).send()
            return
        }
        let credential = await db.models.user_credential.findOne({
            where: {
                user_id: req.user_info.dataValues.user_id,
                hashed_password: req.body.hashed_password
            }
        })
        if (credential == null) {
            res.status(403).send("invalid password")
            return
        }
        let t = await db.transaction()
        try {
            await db.models.user_info.destroy({
                where: {
                    user_id: req.user_info.dataValues.user_id
                },
                transaction: t
            })
            await db.models.user_credential.destroy({
                where: {
                    user_id: req.user_info.dataValues.user_id
                },
                transaction: t
            })
            await db.models.session_info.destroy({
                where: {
                    user_id: req.user_info.dataValues.user_id
                },
                transaction: t
            })
            if (req.body.wipe_data) {
                let url_list = await db.models.url_info.findAll({
                    where: {
                        user_id: req.user_id
                    }
                })
                for (let url of url_list) {
                    console.log(url)
                    await db.models.url_info.destroy({
                        where: {
                            url_id: url.dataValues.url_id
                        },
                        transaction: t
                    })
                    await db.models.url_stats.destroy({
                        where: {
                            url_id: url.dataValues.url_id
                        },
                        transaction: t
                    })
                }
            }
            await t.commit()
            res.status(200).send()
        } catch (e) {
            t.rollback()
            console.log(e)
            res.status(500).send(e)
        } finally {
            await db.sync()
        }
    }
}

export default DeleteUser