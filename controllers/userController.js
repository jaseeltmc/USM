const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { findOne } = require('../models/userModel');



// Products List


let product=[
    {
    
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/53b42b2c5b8d46948bd8adb300c5e720_9366/clear-factor-shoes.jpg",
      title:"Prizmo M",
      Description:"Men Walking"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/20828c9e4d69409ea4f3aede0080cbba_9366/adi-ease-shoes.jpg",
      title:"Flodean M",
      Description:"Men Walking"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/ca5b49cb3d9940c4a6fbaf7300b204c7_9366/zenith-m.jpg",
      title:"Zenith M",
      Description:"Men Swim"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/7d8a4f21333540a1b307af4e00f59ccf_9366/zenith-m.jpg",
      title:"Zenith M",
      Description:"Men Swim"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/daed24bad0be4fe197d9ae8f0140d5ce_9366/planton-sandals.jpg",
      title:"Adiscent Sandals",
      Description:"Men Sandal"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/d229d4c5abc54f4bbc5baf4901064a52_9366/mechan-sandals.jpg",
      title:"Planton Sandals",
      Description:"Men Swim"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/c9fc0f9b0ecf494da776ae8a011d6247_9366/nmd-shoes.jpg",
      title:"WalkAnew M",
      Description:"Mens Walking"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/7d5ec08de8af4afe826dadd80057aef7_9366/marathon-fast-graphic-jacket.jpg",
      title:"Disney Long Sleeve Tee",
      Description:"Mens Originals"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/ebafaaa93d674eef8070ace100a6fc9f_9366/arsenal-21-22-home-jersey.jpg",
      title:"Brandlove Tee",
      Description:"Mens spotswear"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/a08e68299c8540dfbdd5aee500bd61de_9366/adicolor-parley-sweat-pants.jpg",
      title:"Essential Sweat Pants",
      Description:"Mens Originals"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/af20d98a4939435a8d6fad8e00c0418c_9366/y-3-camo-knit-crew-sweatshirt.jpg",
      title:"Long Sleeave Tee",
      Description:"Mens style"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/4bb1682e9b1644189f4dae2400ebd9e4_9366/melbourne-tennis-freelift-printed-tee.jpg",
      title:"Melbourne Tennis Tee",
      Description:"Men Tennis"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/ac694d75635642828e83a7f500aec7a0_9366/milano-16-socks-1-pair.jpg",
      title:"UB22 Crew Socks",
      Description:"Running"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/0be1607dab67486d9c70abf7016f618f_9366/big-logo-short.jpg",
      title:"Shorts",
      Description:"Mens style"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/e0cdac9abd3840e18a5cab3a009270bf_9366/tiro-league-tb-ball.jpg",
      title:"Foot ball",
      Description:"Sports"
    },
    {
      Link:"https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/8feebbb7db874d90aaabae8b00f2a423_9366/graphic-training-gloves.jpg",
      title:"Training Gloves",
      Description:"Training"
    }

  ];



const securePassword = async(password)=>{

    try {

        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;
        
    } catch (error) {
        console.log(error.message)
    }
}
const loadRegister = async(req,res)=>{

    try{

        res.render('registration')
    }catch(error){

        console.log(error.message);
    }
}

const addUser = async(req,res)=>{

    try {

        const spassword = await securePassword(req.body.password);

        const email = req.body.email;

        const isEmailAvailable = await User.findOne({email:email});

        if(!isEmailAvailable){

          const user = new User({

            name:req.body.userName,
            email:req.body.email,
            mobile:req.body.mbn,
            password:spassword,
            is_admin:0
        })
      

         const userData = await user.save();

         if(userData){

          res.render('registration',{message:"Successfully registered please go back to login page"});
         }

         else{

            res.send('failed....!!!')
         }

        }
        else{

          res.render('registration',{existsmessage:"email already exists please enter another email"});
        }
       
       
    } catch (error) {

        console.log(error.message);
        
    }


}

const loginLoad = async(req,res)=>{

    try{

        res.render('login');
    }catch(error){

        console.log(error.message);

    }
}

const verifyLogin = async(req,res)=>{

    try {

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email})
        
        if(userData){

            const passwordMatch = await bcrypt.compare(password,userData.password);
           

              if(passwordMatch){

                if(userData.is_admin === 0){
                  req.session.user_id = userData._id;
                res.redirect('/home')   
                }
                else{
                  res.render('login',{message:"Invalid Email or Password"});
                   
                }
            }
          }
        
        else if(password ==="" && email ===""){

          res.render('login',{message:"Please Enter Email and Password"});
        }
        else{

          res.render('login',{message:"Invalid Email or Password"});
        }
                
      
    } catch (error) {
        console.log(error.message)
    }
}


const loadHome = async(req,res)=>{

    try {
        console.log('load home');
        res.render('home',{product})
        
    } catch (error) {

        console.log(error.message);
        
    }
}

const userLogout = async (req,res)=>{

    try {
        
        req.session.destroy();
        res.redirect('/')

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {

    loadRegister,
    addUser,
    verifyLogin,
    loginLoad,
    loadHome,
    userLogout

}
