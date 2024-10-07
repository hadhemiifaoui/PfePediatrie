
const mongoose = require('mongoose' )
const userSchema = new mongoose.Schema({
   firstname : {
       type: String , required : true
   } ,
   lastname : {
    type: String , required : true
 } ,
   email : {
    type: String , required : true , unique : true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Address email Invalide'],
   },
   password : {
    type: String , required : true
   } ,
   birthday : {  type: String , required : true},
   role : {type : String , enum : ['admin' , 'pediatre', 'patient' ] , required: true},
   tel : {type: String , required : true,match: [/^\d{8}$/, 'Num Tel Invalid'] },
   speciality : {type : String},
   image : {type : String},
   address : {type : String},
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'childs' }] ,
   isActive: {
      type: Boolean,
      default: true,
  }
})
const User = mongoose.model('users' , userSchema)
module.exports = User
