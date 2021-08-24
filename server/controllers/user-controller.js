const User = require('../models/Users');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');




// Generate JWT Token

 function generateToken(user) {
      return jwt.sign(user, process.env.JWT_SECRET_KEY ,  {expiresIn  : "2d"}) 
 };





module.exports.signup = async (req,res) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400).json('Please fill all fields..')
    }

    User.findOne({email})
    .then(user=>{
        if(user){
         res.status(400).json({msg : 'User already exist'})
        }
    })


    try {
         const salt = await bcrypt.genSalt(10)
         const hashedPass = await bcrypt.hash(password, salt)
         const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password:hashedPass,
        });
    
        const user = await newUser.save();
       return res.status(200).json({
         user : user,
         token  : generateToken({_id :  user._id}),
         success:  'Registerd Successfully'
       });
      } catch (err) {
        res.status(500).json(err);
      }
 

};



// Login 

module.exports.login = async (req,res) => {
        const {username, password} = req.body;

        // if(!username ||  !password){
        //     res.status(400).json('Please fill all fields..')
        // }
          if(!username || !password) {
            res.status(400).json('Please fill all fields..')
          }
      
        try {
          
              const user = await User.findOne({username : username});
                if(!user) {
                  res.status(400).json('Invalid credentials!')
                };
              const validated = await bcrypt.compare(req.body.password, user.password);
                if(!validated) {
                  res.status(400).json("Invalid credentials!");
                };
              
                return res.status(200).json({
                  user : user,
                  token  : generateToken({_id :  user._id}),
                  success:  'Login Success'
                });
                
        } catch (err) {
          res.status(400).json({msg : err})
        }

};



module.exports.get_User = async (req,res) =>{
  const user = await User.findById(req.user.id)
  if(!user){
    return res.status(400).json('Oops issue please try again')
  }

  return res.json(user)
}

// module.exports.get_user = () =>{
//   User.findById(req.user.id)
//   .select('-password')
//   .then(user=>res.json(user))
// }