import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async(req,res) =>{
    try {

        let data=await db.User.findAll();
        return res.render('./test/homepage.ejs', {
            data: JSON.stringify(data)
        });
        
    
    } catch (error) {
        console.log(e)
    }
}

let getAboutPage =(req,res)=>{
    return res.render('test/about.ejs');
}

let getCRUD =(req,res)=>{
    return res.render('test/crud.ejs');
}

let postCRUD= async(req,res)=>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('post crud from server');
}

let displayGetCRUD =async(req,res) => {
    let data = await CRUDService.getAllUser()
    return res.render('test/displayCRUD.ejs', {
        dataTable: data
    }) 
}

let getEditCRUD = async (req,res) =>{
    let userId =req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found
        return res.render('test/editCRUD.ejs',{
            user:userData
        });
        
    } else {
        return res.send('Users not found!');
    }
}
let putCRUD = async(req, res)=> {
    let data=req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('test/displayCRUD.ejs',{
        dataTable: allUsers
    })
}
let deleteCRUD = async (req,res) =>{
        let id = req.query.id;
        if(id){
        await CRUDService.deleteUserById(id);
        return res.send('Delete the user success! ')
        }else{
            return res.send('User not found!')
        }
    }


module.exports = {
    getHomePage:getHomePage,
    getAboutPage:getAboutPage,
    getCRUD: getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD:deleteCRUD
}