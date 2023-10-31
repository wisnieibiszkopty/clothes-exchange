const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../utils');
const db = require('../queries');

// temporary
const secretKey = 'twojastararobimiloda';

router.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try{
        const data = await db.login(email);
        if(data.length !== 0){
            bcrypt.compare(password, data.password, (err, result) => {
                if(err){
                    throw(err);
                } else if(result){
                    res.status(200).json({"token": jwt.generateToken(email),
                    "id": data.id});
                } else{
                    res.status(400).json({"message": "Bad request"});
                }
            });
        } else {
            res.status(400).json({"message": "Bad request"});
        }
    } catch(err){
        console.error(err.message);
        next(err);
    }

});

router.post('/signup', async (req, res, next) => {
   const name = req.body.name;
   const email = req.body.email;
   const password = req.body.password;

   try{
       const exists = await db.doesUserExist(name, email);
       // user like this doesn't exist, so we can insert given user to database
       if(!exists){
           // hashing password
           bcrypt.hash(password, 10, async (err, hash) => {
               if(err){
                   throw(err);
               }

               // insert user to database
               const data = await db.addUser(name, email, hash);

               // generate jwt and add it to response
               const token = jwt.generateToken(email);
               console.log("token: " + token);

               res.status(201).json({"token": token, "id": data.id});
           });

       } else{
           console.log("User exist");
           res.sendStatus(400).send('Bad Request');
       }

   } catch(err){
       console.error(err.message);
       next(err);
   }
});

module.exports = router;