import express from 'express';
import connection from '../connection.js'; // Ensure you include the .js extension
import authenticateToken from '../servies/authentication.js'; // Ensure you include the .js extension
import  checkRole  from '../servies/checkrole.js'; // Ensure you include the .js extension

const router = express.Router();
router.post('/add',authenticateToken,checkRole,(req,resp,next)=>{
    let category = req.body;
    query = "insert into category (name) values (?)";
    connection.query(query,[category.name],(err,results)=>{
        if(!err){
            return resp.status(200).json({message : "Category Added successfully"})
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
router.get('/get',authenticateToken,checkRole,(req,resp,next)=>{
    var query = "select *from category order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return resp.status(200).json(results)
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
router.patch('/update',authenticateToken,checkRole,(req,resp,next)=>{
    let product = req.body;

    var query = "update category set name=? where id=?";
    connection.query(query,[product.name,product.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return resp.status(404).json({message :"category id is not found"})
            }
            else{
                resp.status(200).json({message :"category Updated Successfully"})
            }
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
export default router;