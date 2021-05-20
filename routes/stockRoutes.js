const express = require('express')
const { requireSignIn } = require('../controllers/auth')
const { create, getstockslist,read,photod,photow,update,searchList } = require('../controllers/stock')
const router = express.Router()

router.post('/new',requireSignIn,create)
router.get('/search',requireSignIn,searchList)
router.post('/get-stock-list',requireSignIn,getstockslist);
router.get('/read/:id',requireSignIn,read);
router.get('/photow/:id',photow);
router.get('/photod/:id',photod);
router.post('/update/:id',requireSignIn,update);

module.exports = router