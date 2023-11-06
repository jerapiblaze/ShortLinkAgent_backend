import express from 'express'
import post from './post.js'
import get from './get.js'
import del from './delete.js'
import put from './put.js'
import searchByUid from './searchByUser.js'
// import search from './search.js'

export default (db) => {
    const router = express.Router()
    router.get("/", get(db))
    router.post("/", post(db))
    router.delete("/", del(db))
    router.put("/", put(db))
    router.get("/search", searchByUid(db))
    // router.get("/search", search(db))

    return router
}