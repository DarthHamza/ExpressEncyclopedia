const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
    bakeryCreate,
    bakeryList,
    bakeryDetail,
    bakeryUpdate,
    bakeryDelete,
    fetchBakery,
    cookieCreate,
} = require('../controllers/bakeryController')


router.param("bakeryID", async (req, res, next, bakeryID) => {
    const bakery = await fetchBakery(bakeryID, next);
    if(bakery){
        req.bakery = bakery;
        next();
    } else {
        const err = new Error("Bakery not found");
        err.status = 404;
        next(err);
    }
});

router.post("/bakeries/bakeryId/cookies", upload.single('image'), cookieCreate);

router.post("/", upload.single('image'), bakeryCreate);

router.get("/", bakeryList);

router.get("/:bakeryID",  bakeryDetail);

router.put("/:bakeryID", upload.single('image'), bakeryUpdate);

router.delete("/:bakeryID", bakeryDelete);

module.exports = router;