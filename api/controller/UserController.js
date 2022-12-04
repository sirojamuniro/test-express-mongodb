const Model = require("../../models");
const User = Model.user;
const bcrypt = require('bcrypt');
const jwtConvert = require('../helpers/jwtConvert');


class UserController {
	static async register(req, res) {
		const salt = bcrypt.genSaltSync();
		const password = bcrypt.hashSync(req.body.password, salt);
		try {
			let post = {
				name: req.body.name,
				email:req.body.email,
                password:password,
				gender:req.body.gender
			}
			const data = await User.create(post)
							
			res.status(200).json({
				message: 'Success',
				data: data
			});
			
		}
		catch (error) {
		
			res.status(400).send({ status: "Error", errors: [{message: error.message }]  })
		}
	}

	static async login(req,res) {
		let data = await User.findOne({email:req.body.email});
		try {
			
			if (!data) {
				throw ({
					message: 'User not found'
				 })
				
			} 
			if(data) {

				let isValid = bcrypt.compareSync(req.body.password, data.password)

				if (isValid) {

					//check valid

						let token = jwtConvert.sign({
							email: req.body.email,
							created_at: data.created_at
						});
					
						res.status(200).send({
							message: 'Success',
							token: token
						})
					
				} else {
					res.status(400).send({
						status: 'Error',
						errors: [{
							message: "Wrong Password or Email"
						}]
					})
				}
			}
		} catch (error) {
			res.status(400).send({
				status: "Error",
				errors: [{
					message: error.message
				}]
			})
		}
	}
	
}

module.exports = UserController