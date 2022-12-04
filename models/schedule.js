module.exports = mongoose => {
    const Schedule = mongoose.model(
      "schedules",
      mongoose.Schema(
        {
            user_id:{
              type:String,
              required:true,
            },
            user_name:{
              type:String,
            },
            date_start:{
              type: Date,
              required: true,
          },
          date_end:{
              type: Date,
              required: true
          },
            time_start:{
                type: Date,
                required: true,
            },
            time_end:{
              type: Date,
              required: true,
          },
          duration_id:{
            type: String,
            required: true
        },
            duration:{
                type: String,
                required: true
            },
            type_duration:{
              type: String,
              required: true
            },
            type_consult_id:{
            type: String,
            required: true
          },
            type_consult:{
              type: String,
              required: true
            },
            active:{
                type: Boolean,
                required: true
            },
        },
        { timestamps: true }
      )
    );
  
    return Schedule;
  };