// get user by id
// if user.protected  ==
//      + null: default (logged in users)
//      + false: public
//      + true: private (no one exept user)

import { Op } from "sequelize"

function SearchUser(db) {
    return async function (req, res) {
        if (req.query.q == null) {
            res.status(400).send()
            return
        }
        let user_info = await db.models.user_info.findAll({
            where: {
                [Op.or]: [
                    {
                        fullname: {
                            [Op.substring]: req.query.q
                        }
                    },
                    {
                        user_id: {
                            [Op.substring]: req.query.q
                        }
                    }
                ]
            }
        })
        if (user_info == null) {
            user_info = []
        }
        user_info = user_info.filter(user => {
            if (user.dataValues.protected == null) {
                if (req.user_id != null) {
                    return true
                } else {
                    return false
                }
            }
            if (user.dataValues.protected) {
                return false
            } else {
                return true
            }
        })
        res.send(user_info)
    }
}

export default SearchUser