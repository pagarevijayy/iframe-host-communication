import { useEffect, useState } from "react";

import './App.css'

function App() {
  const [parentMessage, setParentMessage] = useState("");

  useEffect(() => {
    const parentResponse = (event: any) => {
      // remember: update the origin check value on project basis.
      if (event.origin !== "http://localhost:5175") return; 

      if (event?.data?.targetSrc == 'my_host_custom_msg') {
        console.log('parent event', event);
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
    
    // remember: to update the origin value on project basis.
    window?.parent?.postMessage(data, "http://localhost:5175") 
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
