import { useEffect, useRef, useState } from "react";
import './App.css'

function App() {
  const [iframeMessage, setIframeMessage] = useState("");
  const iframeOrigin = useRef("http://localhost:5173"); // remember to update this value based on actual iframe url.
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframeResponse = (event: any) => {
      if (event.origin !== iframeOrigin.current) return; // only process messages coming from our iframe domain.

      if (event?.data?.targetSrc == 'my_iframe_custom_msg') {
        console.log('on host:', event);
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
    
    iframeRef.current?.contentWindow?.postMessage(data, iframeOrigin.current) 
  }


  return (
    <>
      <h1>Host Project</h1>
      <button onClick={() => sendMessageToIframe()}>Sign a txn</button>
      <p>{iframeMessage}</p>
      <div>
        <iframe ref={iframeRef} src={iframeOrigin.current} width="360" height="480"></iframe>
      </div>
    </>
  )
}

export default App
