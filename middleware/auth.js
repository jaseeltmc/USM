
    const isLogin = async(req,res,next)=>{

        try {
           
            if(req.session.user_id){}
            else{

                res.redirect('/');
                return;
            }

            next();
            
        } catch (error) {
            console.log(error.message);
        }

       
    }

    const isLogout = async(req,res,next)=>{

        try {


     
            if(req.session.user_id){
                // res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                res.redirect('/home')
                return;
            }
            
            next();
            
        } catch (error) {
            console.log(error.message);
        }

   
    }

    module.exports ={

        isLogin,
        isLogout
    }