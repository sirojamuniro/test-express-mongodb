const Model = require("../../models");
const Consult = Model.consultation
;
const moment = require('moment-timezone');

class TypeConsultationController {
	static async registerConsult(req, res) {
        
		try {
           
			let post = {
				name: req.body.name,
			}

			const data = await Consult.create(post)
			console.log('ini data',data)				
			res.status(200).json({
				message: 'Success',
				data: data
			});
			
		}
		catch (error) {
		
			res.status(400).send({ status: "Error", errors: [{message: error.message }]  })
		}
	}

	static async getConsult(req,res) {
		try {

           const result = await Consult.find()
           
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

module.exports = TypeConsultationController