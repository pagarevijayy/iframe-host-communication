import { useEffect, useRef, useState } from "react";
import './App.css'

function App() {
  const [iframeMessage, setIframeMessage] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframeResponse = (event: any) => {
      // remember: update the origin check value on project basis.
      if (event.origin !== "http://localhost:5174") return; // only process messages coming from our iframe domain.

      if (event?.data?.targetSrc == 'my_iframe_custom_msg') {
        console.log('iframe event', event);
        setIframeMessage(event.data.message);
      }
    };

    window.addEventListener("message", iframeResponse);
    return () => window.removeEventListener("message", iframeResponse);
  }, []);

  const sendMessageToIframe = () => {
    // perform some logic and send necessary data to the iframe.
    setIframeMessage(""); // update state


    const data = {
      message: 'Approve and Verify Txn?',
      targetSrc: 'my_host_custom_msg',
      metadata: '...'
    }
    
    // remember: to update the origin value on project basis.
    iframeRef.current?.contentWindow?.postMessage(data, "http://localhost:5174") 
  }


  return (
    <>
      <h1>Host Project</h1>
      <button onClick={() => sendMessageToIframe()}>Sign a txn</button>
      <p>{iframeMessage}</p>
      <div>
        <iframe ref={iframeRef} src="http://localhost:5174/" width="360" height="480"></iframe>
      </div>
    </>
  )
}

export default App
