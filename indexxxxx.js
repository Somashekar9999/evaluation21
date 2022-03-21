const mongoose=require("mongoose");


const app=express();

const connect=()=>
{
    return mongoose.connect();
};

const userSchema=new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
   },
   {
    timestamps:true,
}
);

const User=mongoose.model("user",userSchema);

const bookSchema=new mongoose.Schema(
{
    title:{type:String,required:true},
    likes:{type:Number,required:true},
    content:{type:String,required:true},
    coverimage:{type:String,required:true},


userId:{
    type:mongoose.Schema.Types.Objects,
    ref:"user",
    required:true,

},
},
{
    timestamps:true,
}
);

const Book=mongoose.model("book",bookSchema);


const publicSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        
    },
    {
        timestamps:true,
    }
    );

    const Public=mongoose.model("public",publicSchema);
    const commentSchema=new mongoose.Schema(
        {
            body:{type:String,required:true},
            
        },
        {
            timestamps:true,
        }
        );

        const Comment=mongoose.model("comment",commentSchema);
app.post("/users",async(req.res)=>
{
    const user=await User.create(req,body);
    return res.status(201).send({user:user})
})

app.listen(5000,async()=>{
    try{
        await connect();

    }catch(err)
    {
        console.log(err);
    }
    console.log("listening on port 5000");
})