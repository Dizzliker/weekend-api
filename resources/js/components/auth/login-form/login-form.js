import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Weekend from '../../../services/Weekend';
import Cookie from '../../../services/Cookie';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            email: '',
            password: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    form = new Weekend();

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    getFormData = () => {
        let formData = new FormData();
        formData.append("_token", this.form.csrf_token);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        return formData;
    }

    login = (e) => {
        e.preventDefault();
        this.form.postData('/login', this.getFormData(), false)
            .then(res => {
                if (res.user) {
                    Cookie.setToken(res.token);
                    this.props.afterAuth(res);
                    // location.href = `${location.origin}/profile/${Session.getId()}`;
                } else {
                    this.setState({error: res.errors[Object.keys(res.errors)[0]][0]});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    render() {
        const {error, email, password} = this.state;

        return (
        <div className="login">
            <form onSubmit={this.login} className="login__form" method="post">
                <img src="../images/logo.svg" alt="Weekend" className="logo" />
                <div className={error ? "error-box" : "error-box hide"}>{error}</div>
                <input type="email" name="email" placeholder="E-mail" className="input email" value={email} onChange={this.handleInputChange}/>
                <input type="password" name="password" placeholder="Password" className="input password" value={password} onChange={this.handleInputChange}/>
                <button className="btn-auth" name="btn-login">Sign in</button>
                <Link to="/register" className="link">Not registered yet?</Link>
            </form>
        </div>
        );
    }
}