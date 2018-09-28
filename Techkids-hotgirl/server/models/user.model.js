const mongoose =  require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    avatar: { type: String, default: '' },
    gender: { type: String, default: '' }
});

UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(this.password, salt);
        // console.log(bcrypt.compareSync("$2a$10$ESiLjGHftp.spjiPvgAwI.ueyXZScFtaXZiOey.PWT..V7fRyKBUu", this.password))
        // 123456 => hash => hash1 => hash2......
        this.password = hashPassword;
    }
    next();
})

module.exports =  mongoose.model('User', UserSchema);