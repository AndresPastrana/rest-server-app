import { Types } from 'mongoose'
import ProductoModel from '../models/producto.mjs';
const allowedCollections = ['users', 'categories', 'products', 'roles', 'test'];

const searchProduct = async (term, resp,) => {
  if (Types.ObjectId.isValid(term)) {

    const product = await ProductoModel.findById(term);

    return resp.json({
      results: product ? [product] : []
    })
  }

  const regExp = new RegExp(term, 'i');

  const products = await ProductoModel.find({
    $or: [{ name: regExp }, { desc: regExp }],
    $and: [{ state: true }]
  });


  return resp.json({
    results: products ? products : []
  })

}

const search = (req, resp) => {

  try {
    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
      return resp.json({
        msg: "Invalid collection, try /'users','/categories','/products','/roles'"
      })
    }

    switch (collection) {
      case 'users':

        break;

      case 'categories':

        break;

      case 'products':
         searchProduct(term,resp)
        break;

      case 'roles':

        break;

      default:
        return resp.status(500).json({
          msg: "This search is unfish , please contact the admin"
        })
       
    }
  } catch (error) {
    return resp.json({ error })
  }



}




const SearchController = Object.freeze({ search })

export default SearchController;