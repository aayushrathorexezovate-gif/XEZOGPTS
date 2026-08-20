// import "./Sidewindow.css"
// import { useContext , useEffect } from "react";
// import { MyContext } from "./Mycontext";
// import {v1 as uuidv1} from "uuid";

// function Sidebar() {

//   const {allThreads , setAllThreads , currThreadId , setPrompt , setReply , setcurrThreadId , setPrevChats , setNewChats} = useContext(MyContext);

//   const getAllThreads = async() =>{
//      try {
//       const response = await fetch("http://localhost:8080/api/thread");
//       const res = await response.json() ;
//       const filteredData = res.map(thread => ({threadID : thread.threadID , title : thread.title}));
//       console.log(filteredData);
//       setAllThreads(filteredData);

//      }catch(err){
//       console.log("error in sidewindow " , err);
//      }
//   };

//   useEffect(() => {
//     getAllThreads();
//   } , [currThreadId]);

//   const createNewChat =() => {
//           setPrompt("");
//           setReply(null);
//           setPrevChats([]);
//           setcurrThreadId(uuidv1());
//           setNewChats(true);
//   }

//   const changeThread = async(newThreadId) => {

//     try{
//       let response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
//       const res = await response.json();
//       console.log(res);
//       setPrevChats(res);
//       setNewChats(false);  

//     }catch(err){
//       console.log(err);
//     }
//   }

//   const deleteThread = async(threadId) => {
//     try{
//     const response = await fetch(`http://localhost:8080/api/thread/${threadId}`,
//          {method: "DELETE"});
//   const  res = await response.json();
//     console.log(res);
// }
// catch(err){
//       console.log(err);
//     }
    
//   }

//  return (


//        <section className="sidebar">

//             {/* new chat logo and new chat */}
//             <button onClick={createNewChat}>
//              <img  className="logo" src="src/assets/Dynamic Silver 'X' Logo on Black Background.jpg" alt="xezogpt logo "/>
//              <span> <i className="fa-solid fa-pen-to-square"></i> </span>
//        </button>

//         {/*  history of chats */}
//         <ul className="history">
//         {/* <li>history 1</li>
//         <li> history 2 </li>
//         <li> history 3 </li> */}
// {Array.isArray(allThreads) && allThreads.map((thread, idx) => (
//   <li key={idx} onClick={() => changeThread(thread.threadID)}>{thread.title}&nbsp; &nbsp;

//   <i class="fa-solid fa-trash" onClick={(e) => {
//     e.stopPropagation();
//     deleteThread(thread.threadID);
    
//     }}></i>
//   </li>                                  // allThreads.map(thread , idx) =>(
//                                                                         //     <li key={idx}> {thread.title}</li>   
//                                                                            //)
// ))}


//         </ul>

//         {/* sign  */}        
//           <div className="sign">
//             <p> By Xezovate India &hearts; </p>
//           </div>
//        </section>
//  )
 
// }
// export default Sidebar;

import "./Sidewindow.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./Mycontext";
import { v1 as uuidv1 } from "uuid";
import logo from "./assets/Dynamic Silver 'X' Logo on Black Background.jpg";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setPrompt,
    setReply,
    setcurrThreadId,
    setPrevChats,
    setNewChats,
  } = useContext(MyContext);

  // Get all chat threads
  const getAllThreads = async () => {
    try {
      const response = await fetch(
        "https://xezogpts.onrender.com/api/thread"
      );

      const res = await response.json();

      const filteredData = res.map((thread) => ({
        threadID: thread.threadID,
        title: thread.title,
      }));

      console.log(filteredData);

      setAllThreads(filteredData);
    } catch (err) {
      console.log("Error in sidewindow:", err);
    }
  };

  // Load threads whenever current thread changes
  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  // Create a new chat
  const createNewChat = () => {
    setPrompt("");
    setReply(null);
    setPrevChats([]);
    setcurrThreadId(uuidv1());
    setNewChats(true);

    // Close sidebar on mobile
    setSidebarOpen(false);
  };

  // Change current thread
  const changeThread = async (newThreadId) => {
    try {
      const response = await fetch(
        `https://xezogpts.onrender.com/api/thread/${newThreadId}`
      );

      const res = await response.json();

      console.log(res);

      setPrevChats(res);
      setNewChats(false);

      // Close sidebar on mobile
      setSidebarOpen(false);
    } catch (err) {
      console.log("Error changing thread:", err);
    }
  };

  // Delete thread
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `https://xezogpts.onrender.com/api/thread/${threadId}`,
        {
          method: "DELETE",
        }
      );

      const res = await response.json();

      console.log(res);

      // Refresh thread list after deletion
      getAllThreads();
    } catch (err) {
      console.log("Error deleting thread:", err);
    }
  };

  return (
    <section className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* New Chat */}
      <button onClick={createNewChat}>
        <img
          className="logo"
          src={logo}
          alt="Xezogpt logo"
        />

        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      {/* Chat History */}
      <ul className="history">
        {Array.isArray(allThreads) &&
          allThreads.map((thread, idx) => (
            <li
              key={idx}
              onClick={() => changeThread(thread.threadID)}
            >
              {thread.title}

              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadID);
                }}
              ></i>
            </li>
          ))}
      </ul>

      {/* Footer */}
      <div className="sign">
        <p>By Xezovate India &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;