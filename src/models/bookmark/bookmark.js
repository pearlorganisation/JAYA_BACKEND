import mongoose from "mongoose";



const bookmarkSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Types.ObjectId,
        index:true,
        required:true
    },
    bookmarks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Scheme"
    }]


});




export const bookMark = mongoose.model('Bookmarks',bookmarkSchema);