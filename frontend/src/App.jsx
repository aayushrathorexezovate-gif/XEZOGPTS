import Sidewindow from "./Sidewindow.jsx"
import Chatwindow from "./Chatwindow.jsx"
import Chat from "./Chat.jsx"
import { MyContext } from "./Mycontext"
import {useState} from "react"
import './App.css'
import {v1 as uuidv1} from "uuid";

function App() {

  const[prompt , setPrompt] = useState(""); // the user will give 
  const[reply , setReply] = useState(null) // the assisstant will give 
   const [currThreadId , setcurrThreadId] = useState(uuidv1());
   const [prevChats , setPrevChats] = useState([]);  // store the chats of currThreads ... 
   const[newChats , setNewChats] = useState(true);    // new chats is been created ...
   const [allThreads , setAllThreads] = useState("");  // all threads title will be saved [1]


 const providerValue = {
    prompt , setPrompt,
    reply , setReply,
    currThreadId , setcurrThreadId,
    prevChats , setPrevChats,
    newChats , setNewChats,
    allThreads , setAllThreads,
 } ; // passing values 


  return (
    <div className="app" >
      <MyContext.Provider value = {providerValue} >
      <Sidewindow></Sidewindow>
      <Chatwindow></Chatwindow>
      </MyContext.Provider>
    </div>
  )
}

export default App
