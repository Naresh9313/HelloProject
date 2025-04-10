// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     phoneNumber: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     status: {  
//         type: Boolean,  
//         default: false
//     }
// }, 
// {
//     timestamps: true
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {  
        type: Boolean,  
        default: false
    },
    role: {
        type: Number,
        enum: [0, 1], // 0 = admin, 1 = user
        default: 1
    }
}, 
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
