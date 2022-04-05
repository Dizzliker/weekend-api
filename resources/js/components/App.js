import './App.css';
import Auth from './auth/auth';
import Main from './main/main';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Session from '../services/Session';
import { Component } from 'react';
import { FriendService } from '../services/Friend';
import { ChatService } from '../services/Chat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countMessages: 0,
      countFriendRequests: 0,
    };
    this.friend = new FriendService();
    this.chat = new ChatService();
  }

  getCountFriendRequests = (id) => {
    this.friend.getCountRequests(id)
        .then(res => {
          if (res.count) {
            this.setState({countFriendRequests: res.count});
          }
        })
        .catch(error => {
          console.warn(error);
        });
  }

  getCountMessages = (id) => {
    setInterval(() =>{
      this.chat.getCountMessages(id)
          .then(res => {
            if (res) {
              this.setState({countMessages: res.count});
            }
          })
          .catch(error => {
            console.warn(error);
          });
    }, 3000);
  }

  componentDidMount() {
    if (Session.check()) {
      const user_id = Session.getId();
      // this.getCountMessages(user_id);
      this.getCountFriendRequests(user_id);
    }
  }

  render() {
    return Session.check() ? 
      <Main countFriendRequests = {this.state.countFriendRequests}
            countMessages = {this.state.countMessages}/> 
    : <Auth />
  }
}

export default App;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);