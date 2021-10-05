import React, {useState} from 'react'
import {io} from 'socket.io-client'

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import {InputText} from "primereact/inputtext"
import {Button} from "primereact/button"
import {Timeline} from "primereact/timeline"

const socket = io("http://localhost:3001")

socket.on("connect", () => {
  console.log(socket.id)
})

function App() {
  const [author, setAuthor] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {author: "Bot", message: "Hello"},
  ])

  socket.on("chat", (arg) => setMessages([...messages, arg]))

  const addMessage = () => {
    const send = {author, message}
    setMessages([...messages, send])
    setMessage("")
    socket.emit("chat", send)
  }

  return (
    <div className="App">
      <div className="p-col-12">
        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText placeholder="Name" value={author} onChange={(e) => setAuthor(e.target.value)}/>
          <InputText placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <Button label="Send" onClick={addMessage} />
        </div>
      </div>

      <div>
        <h5>Conversation</h5>
        <Timeline value={messages} opposite={(item) => item.author} content={(item) => (<small className="p-text-secondary">{item.message}</small>)} />
      </div>
    </div>
  );
}

export default App;
