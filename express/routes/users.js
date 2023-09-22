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
router.put('/:id', async (req, res, next) => {
  const field = req.query.field;
  let fieldToEdit;

  // only description is working now properly
  switch(field){
    case "password":
      fieldToEdit = "password";
      break;
    case "description":
      fieldToEdit = "description";
      break;
    default:
      res.status(400).send("There is no field of that type");
  }

  console.log(req.body.value);

  try{
    await db.editUser(req.params.id, field, req.body.value);
    res.status(200).send("Field edited");
  } catch(err){
    console.error(err.message);
    next(err);
  }

});

// edit user avatar
router.put('/avatar/:id', utils.avatarUpload.single('avatar'),  async (req, res, next) => {
  const id = req.params.id;
  const filename = req.file.originalname;
  try{
    const result = await db.editUser(id, "picture", filename);
  } catch(err){
    console.log(err);
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