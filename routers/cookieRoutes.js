const express = require('express');
const router = express.Router();
const {
    cookieCreate,
    cookieList,
    cookieDetail,
    cookieUpdate,
    cookieDelete,
} = require('../controllers/cookieController')


router.post("/",cookieCreate);

router.get("/", cookieList);

router.get("/:id", cookieDetail);

router.put("/:id", cookieUpdate);

router.delete("/:id", cookieDelete);

module.exports = router;