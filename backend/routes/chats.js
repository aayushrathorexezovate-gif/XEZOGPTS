import express from "express"
import Thread from "../models/Thread.js"
import getopenairesponse from "../utils/openai.js"

const router = express.Router();

//get all chats

router.get("/thread" , async(req,res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt : -1});
         // to sort to descending order we will use .sort function ..... so latest chat will come in front 
         res.json(threads); // response is been sended 
    }catch(err){
        console.log(err);
        res.status(500).json({error : "failed to send the thread to left side"});
    }
})

// to get thread based on there id 

router.get("/thread/:threadID" , async(req,res) => {
    const {threadID} = req.params;

    try{
        const thread = await Thread.findOne({threadID});

        if(!thread){
            res.status(404).json({error : " Thread not found "});
        }

        res.json(thread.messages);

    }catch(err){
        console.log(err);
        res.status(500).json({error : " failed to fetch the data "});
    }
})

// to delete the thread 
router.delete("/thread/:threadID" , async(req,res) => {
    const {threadID} = req.params;

    try{
       let deletedThread =  await Thread.findOneAndDelete({threadID});

       if(!deletedThread){
        res.status(404).json({error : " cannot delete the thread "});

        res.status(200).json({success : " Thread deleted successfully"});
       }

    }catch(err){
        console.log(err);
        res.status(500).json({ error : "Failed to delete "});
    }
})

// chats
router.post("/chat" , async(req,res) => {
    const {threadID , message} = req.body;

    // invaild 
    if(!threadID || !message){
         res.status(400).json({error : "missing required details "});
    }

    try {
     let thread = await Thread.findOne({threadID});

        if(!thread){ // new chat 
           thread = new Thread({ // new thread for new chat 
            threadID,
            title : message,
            messages : [{role:"user" , content:message}],
           });
        } else {
            thread.messages.push({role:"user" , content : message});
        }

        const assistantReply = await getopenairesponse(message); // reply from open ai 

        thread.messages.push({role:"assistant" , content : assistantReply}); // save reply to db 
        thread.updatedAt = new Date();

        await thread.save();

        res.json({reply : assistantReply});

    }catch(err){
        console.log(err);
        res.status(404).json({error : "Something  went wrong ! "});
    }
})

// this is the test route to insert the data to dataBase 
router.post("/test" , async(req,res) => {
try{
    const thread = new Thread ({
        threadID : "aniket ",
        title:"what is python ",
    })
    const response = await thread.save();
    res.send(response);

}catch(err) {
    console.log("chats err : " , err);
    res.status(500).json({error: "failed to save in DB "});
}
})

export default router;