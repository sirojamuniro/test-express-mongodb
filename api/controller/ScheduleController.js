const Model = require("../../models");
const User = Model.user;
const Schedule = Model.schedule;
const Duration = Model.duration;
const Consult = Model.consultation;
const bcrypt = require('bcrypt');
const jwtConvert = require('../helpers/jwtConvert');
const moment = require('moment-timezone');
class ScheduleController {
	static async registerSchedule(req, res) {
        const user = req.user;
        let checkUser = await User.findOne({email:user.email});
        let checkDuration = await Duration.findById(req.body.duration_id);
        let checkConsult = await Consult.findById(req.body.type_consult_id);
        let timeEnd;
        let checkTimeStart = moment(req.body.start);
        let timeStart = checkTimeStart.toISOString();
		try {
           
            if(!checkUser){
                throw ({
					message: 'User not found'
				 })
            }
            if(!checkDuration || !checkConsult){
                throw ({
					message: 'Data not found'
				 })
            }

            if(checkDuration.type_time == 'minutes'){
                
                timeEnd =  checkTimeStart.add(checkDuration.time,'minutes').toISOString()
            }
            if(checkDuration.type_time == 'hours'){
                
                timeEnd =  checkTimeStart.add(checkDuration.time,'hours').toISOString()
            }
			let post = {
				user_id: checkUser._id,
				user_name:checkUser.email,
                date_start:req.body.date_start,
				date_end:req.body.date_end,
                time_start:timeStart,
                time_end:timeEnd,
                duration_id:req.body.duration_id,
                duration:checkDuration.name,
                type_duration:checkDuration.type_time,
                type_consult_id:req.body.type_consult_id,
                type_consult:checkConsult.name,
                active:false
			}
			const data = await Schedule.create(post)
							
			res.status(200).json({
				message: 'Success',
				data: data
			});
			
		}
		catch (error) {
		
			res.status(400).send({ status: "Error", errors: [{message: error.message }]  })
		}
	}

	static async getMySchedule(req,res) {
        const user = req.user;
        let checkUser = await User.findOne({email:user.email});
		const { page = 1, limit = 10 } = req.query;
        let checkSchedule = await Schedule.find({user_id:checkUser._id}).limit(limit * 1)
        .skip((page - 1) * limit);
        try {
            const count = await Schedule.countDocuments();
			if(!checkUser){
                throw ({
					message: 'User not found'
				 })
            }
            
            let result = await checkSchedule.map((data) => {
                return Object.assign({}, {
                    _id: data._id,
                    user_id: data.user_id,
                    user_name: data.user_name,
                    date_start: data.date_start,
                    date_end: data.date_end,
                    time_start: moment(data.time_start).format("HH:mm"),
                    time_end: moment(data.time_end).format("HH:mm"),
                    type: data.type_consult,
                    active: data.active,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    __v: data.__v

                })
            })
           
            res.status(200).json({
				message: 'Success',
                totalPages: Math.ceil(count / limit),
                currentPage: page,
				data: result,

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

module.exports = ScheduleController