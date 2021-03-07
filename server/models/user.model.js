const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROL', 'USER_ROL'],
    message: '{VALUE} no es un rol válido',
};

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!!!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Mail is required!!!'],
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles,
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let oUser = user.toObject();
    delete oUser.password;

    return oUser;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('User', userSchema);