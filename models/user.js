module.exports = mongoose => {
    const User = mongoose.model(
      "users",
      mongoose.Schema(
        {
            name:{
                type: String,
                required: true,
                unique: true
            },
            email:{
                type: String,
                required: true,
                unique: true
            },
            password:{
                type: String,
                required: true
            },
            gender:{
                type: String,
                required: true
            }
        },
        { timestamps: true }
      )
    );
  
    return User;
  };