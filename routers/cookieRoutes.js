const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../middleware/multer');
const {
    cookieList,
    cookieDetail,
    cookieUpdate,
    cookieDelete,
    fetchCookie,
} = require('../controllers/cookieController')


router.param("cookieID", async (req, res, next, cookieID) => {
    const cookie = await fetchCookie(cookieID, next);
    if(cookie){
        req.cookie = cookie;
        next();
    } else {
        const err = new Error("Cookie not found");
        err.status = 404;
        next(err);
    }
});

router.get("/", cookieList);

router.get("/:cookieID",  cookieDetail);

router.put(
    "/:cookieID",
    passport.authenticate('jwt', {session: false}),
    upload.single('image'),
    cookieUpdate
);

router.delete(
    "/:cookieID",
    passport.authenticate('jwt', {session: false}),
    cookieDelete
);

module.exports = router;