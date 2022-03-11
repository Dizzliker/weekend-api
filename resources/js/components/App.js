import './App.css';
import Auth from './auth/auth';
import Main from './main/main';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Session from '../services/Session';

function App() {
  const Page = () => {
    return Session.check() ? <Main /> : <Auth />;
  }

  return (
    <Page></Page>
  );
}

export default App;

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);