import authenticateToken from '../servies/authentication.js';


import express from 'express';
import connection from '../connection.js'; // Make sure to include the .js extension
const router = express.Router();

router.get('/details',authenticateToken,(req,resp)=>{
    var categoryCount;
    var productCount;
    var billCount;
    var query = "select count(id) as categoryCount from category"
    connection.query(query,(err,results)=>{
        if(!err){
            categoryCount = results[0].categoryCount;
        }
        else{
            return resp.status(500).json(err);
        }
    })
    var query = "select count(id) as productCount from product"
    connection.query(query,(err,results)=>{
        if(!err){
            productCount = results[0].productCount
        }
        else{
            return resp.status(500).json(err);
        }
    })
    var query = "select count(id) as billCount from bill"
    connection.query(query,(err,results)=>{
        if(!err){
            billCount = results[0].billCount;
            var data = {
                category : categoryCount,
                bill : billCount,
                product : productCount
            }
           
            return resp.status(200).json(data);
        }
        else{
            return resp.status(500).json(err);
        }
    })


})
export default router;
