import "./Chatwindow.css"
import Chat from "./Chat.jsx"
import { MyContext } from "./Mycontext.jsx"
import { useContext } from "react"
import {ScaleLoader} from "react-spinners" // loading vedio is been displayed 
import { useState , useEffect} from "react"


function Chatwindow() {

    const[loading , setLoading] = useState(false);

    const {prompt , setPrompt , reply , setReply , currThreadId , prevChats , setPrevChats} = useContext(MyContext);

    console.log("prompt" , prompt , "threadID" , currThreadId);
  
    const getReply = async() => {

        setLoading(true);  // as we give the input it will activate loader 

        const options = {
            method :  "POST",
            headers : {
         "Content-Type": "application/json",
            },
            body : JSON.stringify ({
            message : prompt,
            threadID : currThreadId,
            })
            
        };
         
        try {
              const response = await fetch("https://xezogpts.onrender.com/api/chat" , options);
             const res = await response.json();
             console.log(res);
             setReply(res.reply);
        }
        catch(err){
            console.log(err);
        }

        setLoading(false); // in this we have getted the reply. 
    }

    // Append newchats to prevChats
    
    useEffect(() => {
        if(prompt && reply ){ // from this prompt and reply will save in setPrevChats  , role : user content : prompt  and role : assistant content : reply 
            setPrevChats(prevChats => (
                [...prevChats , {
                    role :"user",
                    content : prompt
                },
            {
                role:"assistant",
                content : reply
            }]
            ))
        }
        setPrompt("");
    } , [reply]);         // we will make an reply array [reply];

    return (
       <div className="chatWindow">
        <div className="navbar">
       <span> XezoGPT <i class="fa-solid fa-angle-down"></i></span >
       <div className="userIconDiv">
        <span className="userIcon"> <i class="fa-solid fa-user"></i></span>
        </div> 
        </div>

        <Chat></Chat>

        <ScaleLoader color="#fff" loading={loading}>

        </ScaleLoader>

        <div className="chatInput">
            <div className="inputBox">
                <input placeholder="Ask Something"
                
                value = {prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown = {(e) => e.key === 'Enter' ? getReply() : ''} // As we press enter the getReply function will execute ......
                >
                </input>

                <div className="submit" onClick={getReply}>
                    <i class="fa-solid fa-paper-plane"></i>
                </div>
                
            </div>
            <p className="info"> 
                XezoGPT can make mistakes. Check important info. See Cookie Preferences.
                 </p>
        </div>

       </div>
    )
}
export default Chatwindow;