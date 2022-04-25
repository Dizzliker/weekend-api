import './App.css';
import Auth from './auth/auth';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Component } from 'react';
// import MainContainer from './main-container';
import User from '../services/User';
import Cookie from '../services/Cookie';
import Main from './main/main';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.user = new User();
  }

  componentDidMount() {
    if (Cookie.hasToken()) {
      this.user.get().then(res => {
        if (res) {
          this.setState({user: res});
        }
      }).catch(error => {
        console.warn(error);
      });
    } 
  }

  render() {
    return Cookie.hasToken() ?
      <Main user = {this.state.user}
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