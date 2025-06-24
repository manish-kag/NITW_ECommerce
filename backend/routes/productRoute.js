import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, sellItem, buyItem, updateItem, getUserProducts } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const productRouter = express.Router()

productRouter.post('/sell', authUser, upload.fields([
  {name:'image1', maxCount:1},
  {name:'image2', maxCount:1},
  {name:'image3', maxCount:1},
  {name:'image4', maxCount:1}
]), sellItem)
productRouter.get('/list', listProducts)
productRouter.post('/single', singleProduct)
productRouter.post('/remove', authUser, removeProduct)
//productRouter.post('/sell', authUser, sellItem)
productRouter.post('/buy', authUser, buyItem)
productRouter.put('/update/:productId', authUser, updateItem)
productRouter.get('/user/products', authUser, getUserProducts)

export default productRouter;