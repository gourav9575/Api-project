import  mongoose, {Schema} from 'mongoose';
import UserDocument  from '../interface/registration';


const  UserSchema = new Schema(
    {   
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String , required: true},
        address:{ type: String , required: true},
        email:{ type:String ,  required: true , unique: true},
        phonenumber:{type:Number,required:true , unique: true }, 
        password:{type:String , required: true},
        profile:{type:String},
        token:{
            type: String   
        },
        resetlink:{
            data:String,
            deafult:''
        }
    },
    { timestamps : true }    
);
const User= mongoose.model<UserDocument>('User',UserSchema);
export default User;