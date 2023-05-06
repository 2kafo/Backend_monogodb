const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;
const UserSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Please enter the name of the user"]
        },

        email: {
            type: String,
            required: true

        },
        password: {
            type: String,
            required: true

        }
    },
    {
        timestamps: true
    }
);
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};
const user = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("First Name"),

        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { User, validate };