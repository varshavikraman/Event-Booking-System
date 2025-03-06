import {Schema} from "mongoose";
import { model } from "mongoose";

const sample1 = new Schema({
    name:{type:String,required:true},
    eMail:{type:String,required:true,unique:true},
    phoneNo:String,
    userRole:{type:String,required:true},
    password:{type:String,required:true},
});
const user = model('userDetail',sample1);

const sample2 = new Schema({
    image:String,
    eventName:{type:String,required:true,unique:true},
    organizer:{type:String,required:true},
    description:String,
    venue:{type:String,required:true},
    location:{type:String,required:true},
    No_of_Tickets:{type:Number,required:true},
    vipSeats:{type:Number,required:true},
    standardSeats:{type:Number,required:true},
    date:{type:Date,required:true},
    time:{type:String,required:true},
    price:{type:Number,required:true}
});
const event = model('eventDetail',sample2);

const sample3 = new Schema({
    name:{type:String,required:true,},
    eMail:{type:String,required:true},
    phoneNo:{ type: String, required: true },
    eventName:{type:String,required:true},
    seatingType:{type:String,required:true},
    No_OfTicket:{type:Number,required:true},
    price:{type:Number,required:true}
});
sample3.index({ eMail: 1, eventName: 1 }, { unique: true });
const ticket = model('ticketDetails',sample3)

const sample4 = new Schema({
    eventName:{type:String,required:true,unique:true},
    organizer: String,
    eventDate: Date,
    totalSeats: Number,
    vipSeats: {
        total: Number,
        sold: Number,
        unsold: Number
    },
    standardSeats:{
        total: Number,
        sold: Number,
        unsold: Number
    }
});
const booking = model('bookingDetails',sample4)

export  {user,event,ticket,booking }

