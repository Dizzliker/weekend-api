import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class RightSide extends Component {
    render() {
        return (
            <div className="adminpanel__right-side flex_center_center">
               <ul className="flex_column">
                  <li><Link to="/admin/users">All users</Link></li>
                  <li><Link to="/admin/posts">All posts</Link></li>
               </ul>
            </div>
        );
    }
}