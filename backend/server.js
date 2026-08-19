import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoute from "./routes/chats.js"

const app = express();
const PORT=8080;

app.use(express.json()); // its show be before the app.use("/api" , chatRoute)
app.use(cors());

app.use("/api" , chatRoute);

app.listen(PORT , () => {
    console.log("server is listining ");
    connectDB();
});

const connectDB = async() => {
    try {
     await mongoose.connect(process.env.MONGODB_URL);
     console.log("Connected to db successsfully ")
    }
    catch(err) {
        console.log("failed with err " , err);
        
    }
}

// app.post("/test" , async(req,res) => {

//   const options = {
//     method:"POST",
//     headers:{
//         "Content-Type": "application/json", 
//          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//     },
//     body : JSON.stringify({
//         model:"gpt-4o-mini",
//         messages:[{
//             role: "user",
//             content: req.body.message
//         }]
//     })
//   }

//  try{
//   const response = await fetch("https://api.openai.com/v1/chat/completions" , options);
//   const data = await response.json();
//   console.log(data.choices[0].message.content);
//   res.send(data.choices[0].message.content);

//  }
//  catch(err) {
//     console.log(err);
//  }
// });
