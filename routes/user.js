const router = require("express").Router();
import { user, validate } from "../models/user";
import { genSalt, hash } from "bcrypt";

router.post("/user-create", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

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
