const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true
        },
        last_name: {
            type: String,
            trim: true,
            required: true
        },
        phonenumber: {
            type: String,
            trim: true,
            required: false
        },
        partylink: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'PartyLink'
            }
        ],
        password: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        image: String
    },
    { collation: 'users' }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
