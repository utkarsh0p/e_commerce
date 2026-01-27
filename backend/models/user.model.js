import mongoose from "mongoose"
import bcrypt, { genSalt } from "bcryptjs"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer"
    },
    cartItems:[{
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ]
  },
  { timestamps: true }
)


//hashing the password before saving
userSchema.pre("save", async function(){
    if(!this.isModified("password")){
      return 
    }  
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        
    }catch(err){
        console.log("error in the hashing", err)
    }
})

//compare password methond 
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema)
