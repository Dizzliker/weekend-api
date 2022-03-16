import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../../services/Form';
import Session from '../../../services/Session';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            email: '',
            name: '',
            surname: '',
            password: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    form = new Form(
        document.querySelector('.register-form'),
    );

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
        formData.append("email", this.state.email);
        formData.append("name", this.state.name);
        formData.append("surname", this.state.surname);
        formData.append("password", this.state.password);
        return formData;
    }
    
    register = (e) => {
        e.preventDefault();
        this.form.postData('/register', this.getFormData())
        .then(res => {
            if (res.user) {
                Session.fill(res);
                location.href = `${location.origin}/profile/${Session.getId()}`;
            } else {
                this.setState({error: res.errors[Object.keys(res.errors)[0]][0]});
            }
        })
        .catch(error => {
            console.warn(error);
        });
    }

    render() {
        return (
        <div className="register">
            <form onSubmit={this.register} className="register-form" method="post">
                <img src="../images/logo.svg" alt="Weekend" className="logo"/>
                <div className={this.state.error ? "error-box" : "error-box hide"}>{this.state.error}</div>
                <input type="email" name="email" className="input email" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange}/>
                <input type="text" name="name" className="input name" placeholder="First name" value={this.state.name} onChange={this.handleInputChange}/>
                <input type="text" name="surname" className="input surname" placeholder="Last name" value={this.state.surname} onChange={this.handleInputChange}/>
                <input type="date" name="birthdate" className="input date" placeholder="Birthday" />
                <input type="password" name="password" className="input password" placeholder="Password" value={this.state.password}  onChange={this.handleInputChange}/>
                <button className="btn-auth">Sign up</button>
                <Link to="/" className="link">Already signed up?</Link>
            </form>
        </div>
        );
    }
}