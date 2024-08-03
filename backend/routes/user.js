import { query, Router } from 'express';
import connection from '../connection.js';
const router = Router();
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import nodmailer from 'nodemailer';
import dotenv from 'dotenv';
import authenticateToken from '../servies/authentication.js';
import checkRole from '../servies/checkrole.js';
dotenv.config();
router.post('/signup',(req,resp)=>{
    let user = req.body;
    console.log(user);
     var query  = "select email,password,role,status from user where email = ?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <= 0){
                query = "insert into user (name,contactNumber,email,password,status,role)values(?,?,?,?,'false','user')"
                connection.query(query,[user.name,user.contactNumber,user.email,user.password],(err,results)=>{
                    if(!err){
                        return resp.status(200).json({message : "Successfully register"})
                    }
                    else{
                        return resp.status(500).json(err);
                    }
                })
            }
            else
            {
                return resp.status(400).json({message:"user is already exist"})
            }
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
router.post('/login',(req,resp)=>{
    let user = req.body;
   var  query = "select email,password,role,status from user where email = ?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0 || results[0].password != user.password){
                return resp.status(401).json({message : "username or password is incorrect"})
            }
            else if(results[0].status == 'false'){
                return resp.status(401).json({message : "wait for admin approval"})
            }
            else if(results[0].password == user.password){
                const response = {email : results[0].email,role: results[0].role}
                const accesstoken = sign(response,process.env.ACCESS_TOKEN,{expiresIn : '8h'})
                resp.status(200).json({token : accesstoken});

            }
            else{
                return resp.status(400).json({message : "something went wrong try again later"})
            }

        }
        else{
            return resp.status(500).json(err);
        }
    })
})
router.get('/get',authenticateToken,checkRole,(req,resp)=>{
    var query = "select id,name,email,contactNumber,status from user where role = 'user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return resp.status(200).json(results)
        }
        else{
            return resp.status(500).json(err);
        }
    })

})
router.patch('/update',authenticateToken,checkRole,(req,resp)=>{
    let user  = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        
        if(!err){
            if(results.affectedRows == 0){
                return resp.status(404).json({message:"User id  does not exist"})
            }
            return resp.status(200).json({message : "User updated Successfuly "})
        }
        else{
            return resp.status(500).json(err);
        }
    })
})




router.get('/checkToken',authenticateToken,checkRole,(req,resp)=>{
    return resp.status(200).json({message : "true"});
})


router.post('/changePassword',authenticateToken,(req,resp)=>
{
    const user = req.body;
     const email = resp.locals.email;
 
    var query = "select *from user where email= ? and password = ?";
    
    connection.query(query,[email,user.oldPassword],(err,results)=>
    { 
        if(!err)
        {
            console.log(user.oldPassword);
            console.log(results)
            if(results.length<=0){
                console.log(results.length)
                return resp.status(400).json({message : "incorrect old Password"});
            }
            else if(results[0].password == user.oldPassword){
                query = "update user set password =? where email = ?";
                connection.query(query,[user.newPassword,email],(err,results)=>{
                    if(!err){
                        return resp.status(200).json({message : "Password Updated Successfully"})
                    }
                    else{
                        return resp.status(500).json(err);
                    }
                })

            }
            else{
                return resp.status(400).json({message : "somthing went to wrong .try again later"})
            }
        }
        else{
            return resp.status(500).json(err);
        }
    
    })
    
})

export default router;