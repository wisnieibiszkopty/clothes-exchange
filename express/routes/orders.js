const express = require('express');
const router = express.Router();
const db = require('../queries');

router.get('/:id', async (req, res) => {
    const role = req.query.role;
    const id = req.params.id;
    console.log("seller: " + role);
    try{
        let results;
        if(role === "buyer"){
            results = await db.getOrdersOfBuyer(id);
        } else if (role === "seller"){
            results = await db.getOrdersOfSeller(id);
        } else{
            res.sendStatus(401);
        }
        console.log(`results: ${results}`);
        res.send(results);
    } catch(err){
        console.error(err);
        res.sendStatus(400);
    }
});

router.post('/:productId', async (req, res) => {
    const productId = req.params.productId;
    const buyerId = req.body.buyerId;
    const paymentMethod = req.body.paymentMethod;
    const deliveryAdress = req.body.deliveryAdress;
    console.log(`product ${productId}, buyer: ${buyerId}, method: ${paymentMethod}, adreess: ${deliveryAdress}`);

    try{
        await db.changeProductStatus(productId, true);
        await db.addOrder(productId, buyerId, paymentMethod, deliveryAdress);
        res.sendStatus(200);
    } catch(err){
        console.error(err);
        res.sendStatus(400);
    }
});

router.put('/id', async (req, res) => {
    const id = req.params.id;
    const status = req.query.status;
    try{
        await db.editOrder(id, status);
        res.sendStatus(200);
    } catch(err){
        console.error(err);
        res.sendStatus(400);
    }
});

module.exports = router;