import rootRoutes from './root/rootRoutes.js';
import userRoutes from './user/userRoutes.js';
import urlRoute from './url/urlRoute.js';
import sessionRoutes from './session/sessionRoutes.js';

export default function (app, db) {
    app.get("/", (req, res) => {
        res.redirect(`/url?id=${req.query.id}`)
    });
    app.use("/", rootRoutes(db))
    app.use("/user", userRoutes(db))
    app.use("/url", urlRoute(db))
    app.use("/session", sessionRoutes(db))
}