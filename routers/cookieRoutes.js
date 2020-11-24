const express = require('express');
const router = express.Router();
const {
    cookieCreate,
    cookieList,
    cookieDetail,
    cookieUpdate,
    cookieDelete,
    fetchCookie,
} = require('../controllers/cookieController')


router.param("id", async (req, res, next, id) => {
    const cookie = await fetchCookie(id, next);
    if(cookie){
        req.cookie = cookie;
        next();
    } else {
        const err = new Error("Cookie not found");
        err.status = 404;
        next(err);
    }
});

router.post("/",cookieCreate);

router.get("/", cookieList);

router.get("/:id", cookieDetail);

router.put("/:id", cookieUpdate);

router.delete("/:id", cookieDelete);

module.exports = router;