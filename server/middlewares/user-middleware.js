const passport = require('passport');
const Joi = require('joi');

module.exports = {

    isAuthenticated : (req, res, next) => {
          passport.authenticate('jwt', (err,user)=>{
            if(err || !user){
                res.status(400).json({err : 'You are not authenticated'})
            }else{
                   req.user = user
                   next();   
            }
          })(req, res, next);
    },

    signup : (req, res, next) =>{

      const schema = Joi.object({
          username  : Joi.string().min(3).max(6),
          email :  Joi.string().email(),
          password :  Joi.string().regex(

              new RegExp('^[a-zA-Z0-9]{6,12}$')
          )
      });


       const {error} = schema.validate(req.body)

       if(error) {
           switch (error.details[0].context.key) {
               case "email":
                   
                   res.status(400).send({err : 'Email format is invalid please enter proper email'})
                   break;
                case "password":
                   
                    res.status(400).send({err : 'Password must be valid and betwen 6-10 characters'})
                    break;

                default:
                   
                   res.status(400).send({message : error})
                   break;
                   
           }
       }else{
           next()
       }
        
    }



};