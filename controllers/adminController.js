const Admin = require('../models/userModel');
const bcrypt = require('bcrypt');


const securePassword = async(password)=>{

    try {

        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
        
    } catch (error) {
        console.log(error.message)
    }
}

const loadLogin = async(req,res)=>{

    try {

        res.render('login')
        
    } catch (error) {
        
        console.log(error.message);
    }

}

const verfyLogin = async(req,res)=>{

    try {

        const email = req.body.email;
        const password= req.body.password;

        console.log(password);
        const adminData = await Admin.findOne({email:email})

        console.log(adminData)

        if(adminData){

            const passwordMatch = await bcrypt.compare(password,adminData.password)

            if(passwordMatch){

                if(adminData.is_admin === 1){
                    req.session.admin_id = adminData._id 
                    res.redirect('/admin/home')
                }
                else{
                    res.render('login',{message:"Invalid Email or Password"});
                   
                }
            }
        }
        else if(password ==="" && email ===""){

            res.render('login',{message:"Please Enter Email and Password"})
        }
        else{

            res.render('login',{message:"Invalid Email or Password"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

const loadDashboard = async(req,res)=>{

    try {

       const userData = await Admin.find({is_admin:0})

        res.render('home',{users:userData})
        
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async(req,res)=>{

    try {

        req.session.destroy();
        res.redirect('/admin')
        
    } catch (error) {
        console.log(error.message);
    }
}



const loadUserForm = async(req,res)=>{

    try {

        res.render('addNewUser')
        
    } catch (error) {

        console.log(erroe.message);
        
    }
}

const addNewUser = async(req,res)=>{

    try {

        const spassword = await securePassword(req.body.password);
       
        const user = new Admin({

            name:req.body.userName,
            email:req.body.email,
            mobile:req.body.mbn,
            password:spassword,
            is_admin:0
        })
      

         const userData = await user.save();

        if(userData){

            res.redirect('/admin/home')
        }

        else{

            res.render('addNewUser')
        }
        
    } catch (error) {
        console.log(error.message);
    }
};


const updateUser = async(req,res)=>{

    try {

        const id = req.query.id;
        const userData = await Admin.findById({_id:id})

        
        if(userData){

            res.render('updateUser',{user:userData})

        }
        else{

            res.render('/admin/home')

        }
    
        
    } catch (error) {
        console.log(error.message);
    }
}


const updateChanges = async(req,res)=>{

    try {

      const userUpdatedData = await Admin.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.userName,email:req.body.email,mobile:req.body.mbn}});
       console.log(req.body.userName);
       console.log(req.body.mbn);
       console.log(userUpdatedData);
      res.redirect('/admin/home')
    } catch (error) {
        
        console.log(error.message);
    }
}

const deleteUser = async(req,res)=>{

    try {

        const id = req.query.id;
        await Admin.deleteOne({_id:id});
        res.redirect('/admin/home')
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {

    loadLogin,
    verfyLogin,
    loadDashboard,
    logout,
    loadUserForm,
    addNewUser,
    updateUser,
    updateChanges,
    deleteUser
  
}