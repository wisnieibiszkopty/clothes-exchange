const express = require('express');
const router = express.Router();
const db = require('../queries');
const utils = require('../utils');

/* GET users listing. */

// get user data including items, I will do it later
router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  try{
    const result = await db.getUser(id);
    if(result.length === 0){
      res.sendStatus(404);
    } else{
      res.json(result);
    }
  } catch(err){
    console.error(err);
  }
});

// edit user data
// fix it now
router.put('/:id', async (req, res, next) => {
  const field = req.query.field;
  const value = req.query.value;
  const id = req.params.id;

  try{
    const result = await db.editUser(id, field, value);
    res.status(200).send(result);
  } catch(err){
    console.error(err.message);
    next(err);
  }

});

// edit user
router.put('/avatar/:id', utils.avatarUpload.single('avatar'),  async (req, res, next) => {
  const id = req.params.id;
  const filename = req.file.originalname;
  try{
    await db.editUser(id, "picture", filename);
    res.sendStatus(200);
  } catch(err){
    console.log(err);
    res.sendStatus(400);
  }
});

// delete user
router.delete('/:id', async  (req, res, next) => {
  try{
    await db.deleteUser(req.params.id)
    res.status(200).send({"message": "User deleted"});
  } catch(err){
    console.error(err.message);
    next(err);
  }
});

// review user services
router.all('/review/:id', async(req, res) => {
  const id = req.params.id;
  const rating = req.body.rating ? req.body.rating : 0;
  const reviewerId = req.body.reviewerId ? req.body.reviewerId : 0;
  try{
    if(req.method === 'POST'){
      await db.addReview(id, reviewerId, rating);
    } else if(req.method === 'PUT'){
      await db.editReview(id, reviewerId, rating);
    } else if(req.method === 'DELETE'){
      await db.deleteReview(id, reviewerId);
    } else{
      res.sendStatus(403);
    }
    res.sendStatus(200);
  } catch(err){
    console.error(err);
  }
})


module.exports = router;
