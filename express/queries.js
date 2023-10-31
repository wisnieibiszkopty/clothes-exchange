const { Pool } = require('pg');
const pool = new Pool({
    user: 'ce_admin',
    host: 'localhost',
    database: 'clothes_exchange',
    password: 'password',
    port: 5432,
});

// create queries for api
async function login(email){
    const result = await pool.query(`SELECT id, password FROM users WHERE email=$1;`, [email]);
    if(result.rows.length !== 0){
        return result.rows[0];
    }
    return null;
}

async function doesUserExist(name, email){
    const results = await pool.query(`SELECT * FROM users WHERE name=$1 OR email=$2;`, [name, email]);
    let exists = false;
    if(results.rows.length !== 0 ){
        exists = true;
    }
    return exists;
}

async function getUser(id){
    const sqlQuery = `SELECT u.id as id, u.name as name, u.picture as picture, u.description as description,
    JSON_AGG(JSON_BUILD_OBJECT('id', p.id, 'name', p.name, 'pictures', p.pictures, 'price', p.price)) AS products
    FROM users u LEFT JOIN products p ON u.id=p.owner_id
    WHERE u.id=$1 GROUP BY u.id, u.name`;
    const result = await pool.query(sqlQuery, [id]);
    console.log(result.rows);
    if(result.rows.length === 0){
        console.log("return none");
        return [];
    }
    console.log("return user");
    return result.rows[0];
}

async function addUser(name, email, password){
    const result = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;`, [name, email, password]);
    if(result.rows.length !== 0){
        return result.rows[0];
    }
    return null;
}

async function editUser(id, field, value){
    console.log("edittting!");
    const sqlQuery = `UPDATE users SET ${field}=$1 WHERE id=$2 RETURNING ${field}`;
    const result = await pool.query(sqlQuery, [value, id]);
    return result.rows[0];
}

async function deleteUser(id){
    try{
        await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    } catch(err){
        throw(err);
    }
}

async function addProduct(product){
    // getting date
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const sqlQuery = `INSERT INTO products 
    (name, description, category, brand, price, pictures, add_date, sold, owner_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
    const parameters = [product.name, product.description, product.category, product.brand, product.price,
        product.filesNames, formattedDate, false, product.ownerId];
    try{
        const result = await pool.query(sqlQuery, parameters);
        return result.rows[0];
    }   catch(err){ throw(err); }
}

async function editProduct(id, field, value){
    const sqlQuery = `UPDATE products SET ${field}=$1 WHERE id=$2`;
    await pool.query(sqlQuery, [value, id]);
}

async function deleteProduct(id){
    try{
        await pool.query(`DELETE FROM products WHERE id=$1`, [id]);
    } catch(err){
        throw(err);
    }
}

async function getProduct(id){
    try{
        const sqlQuery = `SELECT products.*, users.name as username, users.picture FROM products INNER JOIN users ON
        products.owner_id = users.id WHERE products.id=$1`
        const results = await pool.query(sqlQuery, [id]);
        return results.rows;
    } catch(err){
        throw(err);
    }
}

// make query better
async function getProducts(){
    const products = await pool.query(`SELECT p.id, p.owner_id, p.price, u.picture,
       p.pictures, p.name, u.name as username 
    FROM products p INNER JOIN users u ON u.id=p.owner_id`);
    return products.rows;
}

// async function getProducts(sort, order, page, filters){
//     const sqlQuery = `SELECT p.*, u.name, u.picture FROM products p
//     INNER JOIN users u ON p.owner_id = u.id`;
//     try{
//         const results = await pool.query(sqlQuery);
//         return results.rows;
//     } catch (err){
//         throw(err);
//     }
//
// }

async function addReview(userId, reviewerId, rating){
    const sqlQuery = `INSERT INTO reviews (rating, user_id, reviewer_id) VALUES ($1, $2, $3)`;
    const result = await pool.query(sqlQuery, [rating, userId, reviewerId]);
}

async function editReview(userId, reviewerId, rating){
    const result = await pool.query(`UPDATE reviews SET rating=$1 WHERE user_id=$2 AND reviewer_id=$3`
        , [rating, userId, reviewerId]);
}

async function deleteReview(userId, reviewerId){
    const result = await pool.query(`DELETE FROM reviews WHERE user_id=$1 AND reviewer_id=$2`, [userId, reviewerId]);
}

async function addToFavourite(productId, UserId){
    const result = await pool.query(`INSERT INTO favourites (product_id, user_id) VALUES ($1, $2)`, [productId, UserId]);
}

async function deleteFromFavourite(productId, userId){
    const result = await pool.query(`DELETE FROM favourites WHERE user_id=$1 AND product_id=$2`, [userId, productId]);
}

async function changeProductStatus(productId, sold){
    await pool.query(`UPDATE products SET sold=$1 WHERE id=$2`, [sold, productId]);
}

async function addOrder(productId, buyerId, paymentMethod, deliveryAdress){
    const sqlQuery = `INSERT INTO orders (product_id, delivery_adress, payment_method, buyer_id, status)
        VALUES ($1, $2, $3, $4, $5)`;
    await pool.query(sqlQuery, [productId, deliveryAdress, paymentMethod, buyerId, "waiting"]);

}

async function editOrder(id, status){
    await pool.query(`UPDATE orders SET status=$1 WHERE id=$2`, [status, id]);
}

async function getOrdersOfBuyer(id){
    const sqlQuery = `SELECT o.*, u.name, p.price, p.name FROM orders o 
    INNER JOIN products p ON o.product_id=p.id
    INNER JOIN users u ON o.buyer_id=u.id 
    WHERE buyer_id=$1`;
    const results = await pool.query(sqlQuery, id);
    console.log(results.rows);
    return results.rows;
}

async function getOrdersOfSeller(sellerId){
    const sqlQuery = `SELECT o.*, u.name, p.price, p.name FROM orders o 
    INNER JOIN products p ON o.product_id=p.id
    INNER JOIN users u ON u.id = p.owner_id
    WHERE p.owner_id=$1`;
    const results = await pool.query(sqlQuery, [sellerId]);
    console.log(results);
    return results.rows;

}

module.exports = {
    login,
    doesUserExist,
    getUser,
    addUser,
    editUser,
    deleteUser,
    addProduct,
    editProduct,
    deleteProduct,
    getProduct,
    getProducts,
    addToFavourite,
    deleteFromFavourite,
    addReview,
    editReview,
    deleteReview,
    changeProductStatus,
    addOrder,
    editOrder,
    getOrdersOfBuyer,
    getOrdersOfSeller
};