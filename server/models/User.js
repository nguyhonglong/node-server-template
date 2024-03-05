import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, trim: true, required: [true, "Name must be provided"] },
    email: { type: String, unique: true, trim: true, required: [true, "Email must be provided"] },
    password: { type: String, required: [true, "Password must be provided"] }
}, { timestamps: true })

userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, 10, function(error, hash) {
        if(error){
            return next(error);
        }else {
            user.password = hash;
            next();
        }
    });
})

const User = mongoose.model("User", userSchema);
export default User;