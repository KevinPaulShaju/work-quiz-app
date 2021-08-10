const express = require('express');
const db = require('../db/db');

const router = express.Router();


router.get('/',(req, res)=>{
    res.status(200).json({message:"Quiz Application"})
});


router.get('/category',(req, res)=>{

    const qry = `select * from category`;

    db.query(qry,async(err,result)=>{
        if (err){
            return res.status(400).json({error:err.message});
        }
        // console.log(typeof result);
        // console.log(result.category);
        res.status(200).json({result:result});
    });
    
});

router.post('/category',(req, res)=>{
    try{
        const {subjectCategory} = req.body;
        const qry = "select * from category where category = ?";
        db.query(qry,[subjectCategory],async(err,result)=>{
            if(err){
                return res.status(400).json({error:err.message})
            }else if(Object.keys(result).length > 0){
                return res.status(406).json({error:"This Category is Already Present."})
            }else{
                const qry2 = "insert into category SET ?";
                db.query(qry2,{
                    category:subjectCategory, 
                },(err,result)=>{
                    if(err){
                        return res.status(400).json({error:err.message})
                    }
                    res.status(201).json({message:"Category Inserted."})
                })
            }
        })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

router.get('/subcategory',(req, res)=>{
    const qry = "select * from subcategory";
    db.query(qry,async(err,result)=>{
        if(err){
            return res.status(400).json({error:err.message});
        }
        res.status(200).json({result:result});
    })
})

router.post('/subcategory',(req, res)=>{
    try{
        const {subjectName,subcategory} = req.body;

        const qry = "select * from category where category = ?";
        db.query(qry,[subjectName],async(err,result)=>{
            if (err){
                return res.status(400).json({error:err.message});
            }else if(Object.keys(result).length === 0){
                return res.status(406).json({error:"This Subject is not in The List"})
            }else{
                const qry2 = "insert into subcategory SET ?";
                db.query(qry2,{
                    SubCategory: subcategory,
                    SubId: result[0].SubId
                },(err,result2)=>{
                    if (err){
                        if(err.code === "ER_DUP_ENTRY"){
                            return res.status(406).json({error:"This Subcategory is already Present"});
                        }else{
                            return res.status(400).json({error:err.message})
                        }
                    }

                    res.status(201).json({message:"Subcategory Inserted."});
                })
            }
        })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


router.get('/questions', (req, res)=>{
    const qry = "select * from questions";
    db.query(qry, (err,result)=>{
        if(err){
            return res.status(400).json({error:err.message})
        }
        res.status(201).json({message:result})
    })
})


router.get('/questions/:id',(req, res)=>{
    const {id} = req.params;
    console.log(req.params);
    const qry = "select * from questions where SubCatId = ?";
    db.query(qry,[id],async(err,result)=>{
        if (err){
            return res.status(400).json({error:err.message})
        }else if(Object.keys(result).length === 0){
            return res.status(404).json({error:"No Questions Under this Sub-Category"});
        }else{
            return res.status(200).json({message:result})
        }
    })
})



router.post('/questions',(req, res)=>{
    try {
        const {subcategory,question,option1,option2,option3,option4,correct} = req.body;
        const qry = "select * from subcategory where SubCategory = ?";
        db.query(qry,[subcategory],(err,result)=>{
            if(err){
                return res.status(400).json({error:err.message})
            }else if(Object.keys(result).length === 0){
                return res.status(404).json({error:"This Sub-Category Not Present."})
            }else{
                const qry2 = "insert into questions SET ?";
                db.query(qry2,{
                    qn:question,
                    opt1:option1,
                    opt2:option2,
                    opt3:option3,
                    opt4:option4,
                    correctAns:correct,
                    SubCatId:result[0].SubCatId
                },(err,result)=>{
                    if(err){
                        return res.status(400).json({error:err.message})
                    }
                    res.status(201).json({message:"Question Inserted."})
                })
            }
        })
    }catch(err){
        res.status(500).json({error:err.message})
    }
})



module.exports = router