import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class RightSide extends Component {
    render() {
        return (
            <div className="adminpanel__right-side flex_center_center">
               <ul className="flex_column jc_space-between" style={{height: 250+'px'}}>
                  <li><Link to="/admin">Admin home</Link></li>
                  <li><Link to="/admin/users">All users</Link></li>
                  <li><Link to="/admin/posts">All posts</Link></li>
                  <li><Link to="/admin/audio">All audios</Link></li>
                  <li><Link to="/admin/photos">All photos</Link></li>
               </ul>
            </div>
        );
    }
}