import './App.css';
import Auth from './auth/auth';
import Main from './main/main';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate } from 'react-router-dom';
import Session from '../services/Session';
import { Component } from 'react';
import { FriendService } from '../services/Friend';
import { ChatService } from '../services/Chat';
import MainContainer from './main-container';
import User from '../services/User';
import Cookie from '../services/Cookie';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      countMessages: 0,
      countFriendRequests: 0,
    };
    this.friend = new FriendService();
    this.chat = new ChatService();
    this.user = new User();
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
    if (Cookie.hasToken()) {
      this.user.get().then(res => {
        if (res) {
          this.setState({user: res});
          setTimeout(() => {
            this.getCountMessages(this.state.user.id);
            this.getCountFriendRequests(this.state.user.id);
          }, 1000);
        }
      }).catch(error => {
        console.warn(error.response);
      });
    } 
  }

  render() {
    return Cookie.hasToken() ?
      <MainContainer user = {this.state.user}
                     countFriendRequests = {this.state.countFriendRequests}
                     countMessages = {this.state.countMessages}/> 
    : <Auth afterAuth = {(res) => {this.setState({user: res.user})}}/>
  }
}

export default App;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);