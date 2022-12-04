const moment = require('moment-timezone');
const Model = require("../../../models");
const User = Model.user;
const Schedule = Model.schedule;
const Duration = Model.duration;
class CronService {
    static async start() {
  
        let checkSchedule = await Schedule.find({active:false})
            try {
             
              if(checkSchedule.length > 0){
              
                    await checkSchedule.forEach(async (schedule) => {
                  
                       let newDate = moment(schedule.time_start);
                       let timeNow = moment.now()
                       let dateNow = moment(timeNow)
                       let subtractDateNow = dateNow.subtract(10, 'minutes')
          
                       if(subtractDateNow ==  newDate){
                        //notification before 10 minute
                        console.log("10 Menit lagi ada schedule yang harus dilakukan ")
            
                        }
                        if(subtractDateNow >= dateNow ){
                            //notification
                            console.log("Ada schedule yang harus dilakukan ")
                            Schedule.findByIdAndUpdate(schedule._id,{active:true})
                        }
        
                 
                    })
                
              }
             
            } catch (error) {
                console.log(error);
            }
        }
        static async end() {
  
            let checkSchedule = await Schedule.find()
                try {
                 
                  if(checkSchedule.length > 0){
                  
                        await checkSchedule.forEach(async (schedule) => {
                      
                           let newDate = moment(schedule.date_end);
                           let dateNow = moment.now()
                            if(dateNow > newDate ){
                                //notification
                                console.log("Schedule Telah Berakhir ")
                                Schedule.findByIdAndUpdate(schedule._id,{active:false})
                            }
            
                     
                        })
                    
                  }
                 
                } catch (error) {
                    console.log(error);
                }
            }    
}

module.exports = CronService;