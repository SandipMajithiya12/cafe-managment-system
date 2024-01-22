const express = require('express');
const connection = require('../connection')
const router = express.Router();
let ejs = require('ejs');
let pdf  = require('html-pdf');
let path = require('path');
var fs =require('fs');
var uuid = require('uuid');
var auth = require('../servies/authentication')

router.post('/generateReport',auth.authenticateToken,(req,resp)=>{
    const generateUuid = uuid.v1();
  
    const orderDetails = req.body;
   
    var productDetailsReport = JSON.parse(orderDetails.productDetail);
   
 
 
    query = "insert into bill (name,uuid,email,contactNumber,paymentMethod,total,productDetail,createdBy)values(?,?,?,?,?,?,?,?)"
    connection.query(query,[orderDetails.name,generateUuid,orderDetails.email,orderDetails.contactNumber,orderDetails.paymentMethod,orderDetails.total,orderDetails.productDetail,resp.locals.email],(err,results)=>{
        if(!err){
            
            ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails : productDetailsReport,name : orderDetails.name,email : orderDetails.email,contactNumber : orderDetails.contactNumber,paymentMethod : orderDetails.paymentMethod,total : orderDetails.total},(err,results)=>{
                if(err){
                   
                    console.log(err)
                    return resp.status(500).json(err);
                 
                }
                else{ 
                    pdf.create(results).toFile('./Generate_pdf/'+generateUuid+".pdf",function(err,data){
                        if(err){


                            return resp.status(500).json(err);
                        }
                        else{
                            return resp.status(200).json({uuid : generateUuid})
                        }
                    })
                }
            })

        }
        else{
            console.log(err);
          
            return resp.status(500).json(err);
        }
    })
})
router.post('/getPdf',auth.authenticateToken,(req,resp)=>{
    const orderDetails = req.body;
    const pdfPath = './Generate_pdf/'+orderDetails.uuid+".pdf";
    if(fs.existsSync(pdfPath)){
        resp.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(resp);
    }
    else{
        var productDetailsReport = JSON.parse(orderDetails.productDetail);
      
        ejs.renderFile(path.join(__dirname,'',"report.ejs"),{productDetails : productDetailsReport,name : orderDetails.name,email : orderDetails.email,contactNumber : orderDetails.contactNumber,paymentMethod : orderDetails.paymentMethod,totalAmount : orderDetails.totalAmount},(err,results)=>{
            if(err){
                console.log(err);
                return resp.status(500).json(err);
             
            }
            else{
                pdf.create(results).toFile('./Generate_pdf/'+orderDetails.uuid+".pdf",function(err,data){
                    if(err){
                        
                      
                        return resp.status(500).json(err);
                    }
                    else{
                        resp.contentType("application/pdf");
                          fs.createReadStream(pdfPath).pipe(resp);
                    }
                })
            }
        })

    }
})
router.get('/getbills',auth.authenticateToken,(req,resp)=>{
    query = "select *from bill order by id DESC";
    connection.query(query,(err,results)=>{
        if(!err){
            return resp.status(200).json(results)
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
router.delete('/delete/:id',auth.authenticateToken,(req,resp,next)=>{
    const id = req.params.id
    query = "delete from bill where id =?"
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return resp.status(404).json({message : "bill is not found"})
            }
            else{
                return resp.status(200).json({message : "bill is deleted"})
            }
        }
        else{
            return resp.status(500).json(err);
        }
    })
})
module.exports = router;