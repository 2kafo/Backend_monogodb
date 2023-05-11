const router = require("express").Router();
import user from "../models/user.cjs";
import validate  from "../models/user.cjs";
import { genSalt, hash } from "bcrypt";

router.post("/user-create", async (req, res) => {
	const user = mongoose.model("user", UserSchema);

const validate = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("First Name"),

        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};
	try {
		//error collection
		const { error } = validate(req.body);
		if (error)
			return res
				.status(400)
				.send({ message: error.details[0].message });

		const user = await user.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await genSalt(Number(process.env.SALT));
		const hashPassword = await hash(req.body.password, salt);

		await new user({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
