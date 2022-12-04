const Model = require("../../models");
const User = Model.user;
const Schedule = Model.schedule;
const Duration = Model.duration;
const moment = require('moment-timezone');

class DurationController {
	static async registerDuration(req, res) {
        
		try {
           
			let post = {
				name: req.body.name,
                time:req.body.time,
				type_time:req.body.type,
			}

			const data = await Duration.create(post)
							
			res.status(200).json({
				message: 'Success',
				data: data
			});
			
		}
		catch (error) {
		
			res.status(400).send({ status: "Error", errors: [{message: error.message }]  })
		}
	}

	static async getDuration(req,res) {
		try {

           const result = await Duration.find()
           
            res.status(200).json({
				message: 'Success',
				data: result
			});
		
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

module.exports = DurationController