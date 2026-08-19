import "./Chat.css"
import { useContext , useState , useEffect } from "react";
import { MyContext } from "./Mycontext";
import ReactMarkdown from "react-markdown";     // to write iin structured way react-markdown 
import rehypeHighlight from "rehype-highlight";    // to make important point marked 
import "highlight.js/styles/github.css"        // code part will come in white box 

function Chats(){

    const{newChats , prevChats , reply} = useContext(MyContext);
   const [latestReply , setLatestReply] = useState(null);

    console.log("the value :" , prevChats);

    useEffect(() => {

        if(reply === null){
             setLatestReply(null);
              return ;
        }


         if(! prevChats?.length) return;

         const content = reply.split(" "); // individual words

         let idx = 0;

         const interval = setInterval(() => {
                setLatestReply(content.slice(0 , idx+1).join(" "));

                idx++;
                if(idx >= content.length) clearInterval(interval);
         },40)

         return () => clearInterval(interval);

    }, [prevChats , reply])

    return (
       <>

        {newChats && <h1> Start with a Epic Chat </h1>}
        <div className="chats">
             
        {
            prevChats?.map((chat , idx) => 
                <div className= {chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                    {
                        chat.role === "user" ? <p className="userMessage">{chat.content}</p> 
                        : <p className="gptMessage">
                           <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                          {typeof chat?.content === "string" ? chat.content : ""}
                         </ReactMarkdown>
 
                            </p>
                    }
                </div>
            )

        }

             {
                prevChats.length > 0 && latestReply != null && 
                <div className="gptDiv" key= {"typing "}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
                </ReactMarkdown>
                </div>
            }

         
        </div> 
       </>
    )
}
export default Chats;