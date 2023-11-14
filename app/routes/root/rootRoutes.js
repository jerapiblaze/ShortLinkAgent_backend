import express from "express"

export default (db) => {
    const router = express.Router()
    router.get("/", function(req, res){
        res.status(200).send()
        return
    })
    return router
}