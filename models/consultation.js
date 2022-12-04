module.exports = mongoose => {
    const Consultation = mongoose.model(
      "consultations",
      mongoose.Schema(
        {
            name:{
              type:String,
              required: true
            },
        },
        { timestamps: true }
      )
    );
  
    return Consultation;
  };