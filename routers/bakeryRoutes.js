const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const passport = require('passport');
const {
    bakeryCreate,
    bakeryList,
    bakeryDetail,
    bakeryUpdate,
    bakeryDelete,
    fetchBakery,
    cookieCreate,
} = require('../controllers/bakeryController')


router.param("bakeryId", async (req, res, next, bakeryId) => {
    const bakery = await fetchBakery(bakeryId, next);
    if(bakery){
        req.bakery = bakery;
        next();
    } else {
        const err = new Error("Bakery not found");
        err.status = 404;
        next(err);
    }
});

router.post(
    "/:bakeryId/cookies",
    passport.authenticate('jwt', {session: false}),
    upload.single('image'),
    cookieCreate
);

router.post(
    "/",
    passport.authenticate('jwt', {session: false}),
    upload.single('image'),
    bakeryCreate
);

router.get("/", bakeryList);

router.get("/:bakeryId",  bakeryDetail);

router.put("/:bakeryId", upload.single('image'), bakeryUpdate);

router.delete("/:bakeryId", bakeryDelete);

module.exports = router;