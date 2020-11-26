const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
    cookieCreate,
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

router.post("/", upload.single('image'), cookieCreate);

router.get("/", cookieList);

router.get("/:cookieID",  cookieDetail);

router.put("/:cookieID", upload.single('image'), cookieUpdate);

router.delete("/:cookieID", cookieDelete);

module.exports = router;