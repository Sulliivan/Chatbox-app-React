import React, { Component, createRef } from 'react'
import './App.css'

import Formulaire from './components/Formulaire'
import Message from './components/Message'

//Firebase 
import base from './base';

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef()

  componentDidMount(){
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  componentDidUpdate(){
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight // la barre de scroll reste en bas
  }

  addMessage = message => {
    const messages = { ...this.state.messages} // copy du state

    messages[`message-${Date.now()}`] = message // applique les changements
    Object
      .keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null
      })

    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object
    .keys(this.state.messages)
    .map(key => (  // .map modifie ou retourne quelque chose
      <Message
        key={key}
        isUser={this.isUser}
        message={this.state.messages[key].message}
        pseudo={this.state.messages[key].pseudo}
      />
    ))
    return (
      <div className='box'>
        <div>
          <div className="messages" ref={this.messagesRef}>
            <div className="message">
              { messages }
            </div>
          </div>
        </div>
        <Formulaire 
        length={140}
        pseudo={this.state.pseudo}
        addMessage={this.addMessage}/>
      </div>
    )
  }
}

export default App
