import './App.css';
import Auth from './auth/auth';
import Main from './main/main';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Session from '../services/Session';
import { Component } from 'react';
import { FriendService } from '../services/Friend';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countFriendRequests: 0,
    };
    this.friend = new FriendService();
  }

  componentDidMount() {
    if (Session.check()) {
      this.friend.getCountRequests(Session.getId())
          .then(res => {
            if (res.count) {
              this.setState({countFriendRequests: res.count});
            }
          })
          .catch(error => {
            console.warn(error);
          });
    }
  }   

  render() {
    return Session.check() ? <Main countFriendRequests = {this.state.countFriendRequests}/> : <Auth />
  }
}

export default App;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);