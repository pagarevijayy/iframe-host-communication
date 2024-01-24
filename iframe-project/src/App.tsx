import { useEffect, useState } from "react";

import './App.css'

function App() {
  const [currentParentOrigin, setCurrentParentOrigin]= useState("");
  const [parentMessage, setParentMessage] = useState("");

  useEffect(() => {
    const parentResponse = (event: any) => {
      const allowedOrigins = ["http://localhost:5174", "http://127.0.0.1:5500"]; // remember to update the allowed origins.
      if (!allowedOrigins.includes(event.origin)) return; 

      if (event?.data?.targetSrc == 'my_host_custom_msg') {
        console.log('inside iframe:', event);
        setCurrentParentOrigin(event.origin);
        setParentMessage(event.data.message); 
      }
    };

    window.addEventListener("message", parentResponse);
    return () => window.removeEventListener("message", parentResponse);
  }, []);

  const sendMessageToParent = () => {
    // perform some logic and send necessary data to the iframe.
    const data = {
      message: 'Txn signed and approved!',
      targetSrc: 'my_iframe_custom_msg',
      metadata: '...'
    }

    window?.parent?.postMessage(data, currentParentOrigin); 
    setParentMessage("approved!"); //update state
  }

  return (
    <>
      <h1>iFrame Project</h1>
      {
        parentMessage &&
          <>
            <p>{parentMessage}</p>
            <button onClick={() => sendMessageToParent()}>Approve txn</button>
          </>
      }
    </>
  )
}

export default App
