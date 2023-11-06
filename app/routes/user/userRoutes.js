import express from 'express'
import post from './post.js'
import get from './get.js'
import del from './delete.js'
import search from './search.js'
import put from './put.js'
import putPwd from './pwdUpdate.js'

export default (db) => {
    const router = express.Router()
    router.get("/", get(db))
    router.post("/", post(db))
    router.delete("/", del(db))
    router.get("/search", search(db))
    router.put("/", put(db))
    router.put("/changepwd", putPwd(db))

    return router
}