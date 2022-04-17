import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginForm from './login-form';
import RegisterForm from './register-form/register-form';

import bg from '../../img/bg.jpg';

export default class Auth extends Component {
    render() {
        const bgStyle = {
            width: '100%', 
            height: '100vh',
            backgroundImage:`url(${bg})`,
        };

        return (
            <div className="auth" style={bgStyle}>
                <Routes>
                    <Route path="/"         element={<LoginForm afterAuth={this.props.afterAuth}/>} />
                    <Route path="/register" element={<RegisterForm afterAuth={this.props.afterAuth}/>}/>
                </Routes>
            </div>
        )
    }
}