import express from 'express'

class HelloRoute {
    constructor(db) {
        this.db = db
        this.router = express.Router()
        this.router.get("/", this.Index)
    }
    Index(req, res) {
        res.send("Hello!")
    }
}

// export default function(app, db) {  
//     app.post('/notes', (req, res) => {    
//         // You'll create your note here.
//         res.send("hello")
//     });
// };

export default (db) => {
    return new HelloRoute(db).router
}