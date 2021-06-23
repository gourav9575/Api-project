import { Document } from 'mongoose';

export default interface UserDocument extends Document {
    name:string;
    address:string;
    email:string;
    phonenumber:number;
    password:string;
    profile:string;
    token:string;
  
}