import express from 'express'
import post from './post.js'
import del from './delete.js'
import getAll from './getAll.js'
import get from './get.js'
import delAll from './deleteAll.js'

export default (db) => {
    const router = express.Router()
    router.post("/login", post(db))
    router.get("/", get(db))
    router.delete("/logout", del(db))
    router.get("/history", getAll(db))
    router.delete("/force_logout", delAll(db))
    return router
}