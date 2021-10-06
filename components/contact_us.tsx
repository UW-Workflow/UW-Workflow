import { useState } from "react"
import axios from "axios";
import { ContactMessage } from "../models/interfaces/types/ContactMessage";

function ContactUs(props: {setShow: (value: boolean) => void}) {
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
      const contactMessageResponse = await axios.post("/api/contact_message/insertContactMessage", {
        email: email,
        message: message,
      });
      const tempUser: ContactMessage = contactMessageResponse.data;
      if (tempUser) console.log("success");
    };
    
        return <div style={{borderStyle: "solid", borderWidth: 2, margin: 10, padding: 5, width: 300}}>
        <div style={{display: "flex", flexDirection: "column"}}>
        <input style={{marginBottom: 5}} title="Email" type="text" placeholder="Please enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
        <textarea style={{marginBottom: 5}} title="Message" placeholder="Please enter your message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
        </div>
        <div style={{display: "flex"}}>
        <button className="button success" onClick={handleSubmit}>Send</button>
        <button className="button" onClick={() => {
          // props.setShow(false);
          setEmail("");
          setMessage("");
        }}>Close</button>
        </div>
        </div>
  }

  
  export default ContactUs