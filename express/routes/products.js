const express = require('express');
const router = express.Router();
const db = require('../queries');

router.get('/', async (req, res) => {
   const sortBy = req.body.sortBy;
   const order = req.body.order;
   try{
      const results = await db.getProducts();
      res.send(results);
   } catch(err){
      console.error(err);
      res.sendStatus(400);
   }
});

// getting particular item
router.get('/:id', async (req, res, next) => {
   const id = req.params.id;
   try{
      const results = await db.getProduct(id);
      if(results.length === 0){
         res.sendStatus(404);
      } else{
         res.json(results[0]);
      }
   } catch(err){
      console.error(err);
   }
});

router.all('/favourite/:productId/:userId', async (req, res) => {
   const productId = req.params.productId;
   const userId = req.params.userId;
   try{
      if(req.method === 'POST'){
         await db.addToFavourite(productId, userId);
      } else if(req.method === 'DELETE'){
         await db.deleteFromFavourite(productId, userId);
      } else{
         res.sendStatus(403);
      }
      res.sendStatus(200);
   } catch(err){
      console.log(err);
      res.sendStatus(400);
   }
});

module.exports = router;