const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../servies/authentication');
var checkRole = require('../servies/checkrole')

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    let product = req.body;
    var query = "insert into product(name,categoryId,description,price,status)values(?,?,?,?,'true')";
    connection.query(query,[product.name,product.categoryId,product.description,product.price],(err,results)=>{
        if(!err){
            return res.status(200).json({message : "Product added successfully"})
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query = "select p.id,p.name,p.description,p.price,p.status,c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results)
        }
        else{
            return res.status(500).json(err);
        }
    })
})
router.get('/getByCategory/:id',auth.authenticateToken,(req,resp,next)=>{
    const id = req.params.id;
  
    query = "select id ,name from product where categoryId = ? and status = 'true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return resp.status(200).json(results)
        }
        else{
            return resp.status(500).json(err)
        }
    })
})
router.get('/getById/:id',auth.authenticateToken,(req,resp,next)=>{
    const id = req.params.id;
    query = "select id,name,description,price from product where id = ?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return resp.status(200).json(results[0]);
        }
        else
        {
            return resp.status(500).json(err);
        }
    })
})
router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,resp,next)=>{
    let prodcut = req.body;
    var query = "update product set name=?,categoryId=?,description=? ,price=? where id=?";
    connection.query(query,[prodcut.name,prodcut.categoryId,prodcut.description,prodcut.price,prodcut.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return resp.status(404).json({message : "Product id does not found"})

            }
            return resp.status(200).json({message : "Product update successfully "})
        }
        else{
            return resp.status(500).json(err);
        }
    })
});

router.delete("/delete/:id",auth.authenticateToken,checkRole.checkRole,(req,resp,next)=>{
    const id = req.params.id;
    var query = "delete from product where id=?"
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return resp.status(404).json({message : "product id is not found"})
            }
            return resp.status(200).json({message : "Product delete Successfully"})
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
router.patch('/updateStatus',auth.authenticateToken,checkRole.checkRole,(req,resp,next)=>{
    let user = req.body;
    var query = 'update product set status=? where id=?'
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return resp.status(404).json({message : "Product id does not found"})
            }
            return resp.status(200).json({message :"product Status Updated successful"})
        }
        else{
            return resp.status(500).json(err);
        }
    })
})

module.exports = router;    