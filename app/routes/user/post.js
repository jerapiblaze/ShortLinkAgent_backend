// register a new user
// if the user is logged-in: discard the request
// if the username provided is already used: throw error

import generate_id from "../../utils/generate_id.js";

function CreateUser(db) {
    return async function (req, res) {
        let t = await db.transaction();
        if (req.user_info) {
            res.redirect("/")
            return
        }
        try {
            let existing_usercredential = await db.models.user_credential.findOne(
                {
                    where: {
                        username: req.body.username
                    },
                    transaction: t
                }
            )
            if (existing_usercredential != null) {
                throw "USER_EXIST"
            }
            let uid = generate_id.userId()
            let user_info = {
                user_id: uid,
                fullname: req.body.fullname,
                avatar: req.body.avatar
            }
            let user = await db.models.user_info.create(user_info, { transaction: t })
            let user_credential = {
                user_id: uid,
                username: req.body.username,
                hashed_password: req.body.hashed_password
            }
            await db.models.user_credential.create(user_credential, { transaction: t })
            await t.commit()
            res.send(user)
        } catch (e) {
            t.rollback();
            res.status(400).send(e)
        } finally {
            await db.sync()
        }
    }
}

export default CreateUser