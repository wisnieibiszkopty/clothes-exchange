const { Pool } = require('pg');
const pool = new Pool({
    user: 'ce_admin',
    host: 'localhost',
    database: 'clothesexchange',
    password: 'password',
    port: 5432,
});

// create queries for api
async function login(email){
    const result = await pool.query(`SELECT password FROM users WHERE email=$1;`, [email]);
    let exists = false;
    if(result.rows.length !== 0){
        exists = true;
    }
    return {"exists": exists, "password": result.rows[0].password};
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
    await pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [name, email, password]);
}

async function editUser(id, field, value){
    const sqlQuery = `UPDATE users SET ${field}=$1 WHERE id=$2`;
    await pool.query(sqlQuery, [value, id]);
}

async function deleteUser(id){
    try{
        await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    } catch(err){
        throw(err);
    }
}

async function addProduct(product){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    const sqlQuery = `INSERT INTO products 
    (name, description, category, brand, price, pictures, add_date, sold, owner_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const parameters = [product.name, product.description, product.category, product.brand, product.price,
        product.filesNames, formattedDate, false, product.ownerId];
    const result = await pool.query(sqlQuery, parameters);
}

async function editProduct(){

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
        const sqlQuery = `SELECT products.*, users.name, users.picture FROM products INNER JOIN users ON
        products.owner_id = users.id WHERE products.id=$1`
        const results = await pool.query(sqlQuery, [id]);
        return results.rows;
    } catch(err){
        throw(err);
    }
}

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
    addToFavourite,
    deleteFromFavourite,
    addReview,
    editReview,
    deleteReview
};