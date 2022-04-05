import React, { Component } from 'react';
import MenuItem from '../menu-item';

export default class Menu extends Component {
    render() {
        return (
            <div className="sidebar__menu-container">
                <nav>
                    <ul className="sidebar__menu flex_column jc_space-between">
                        <MenuItem img="../images/news.svg"        text="News"        link="*"/>
                        <MenuItem img="../images/message.svg"     text="Messages"    link="messages/0" count={this.props.countMessages}/>
                        <MenuItem img="../images/friends.svg"     text="Friends"     link="friends" count = {this.props.countFriendRequests}/>
                        <MenuItem img="../images/communities.svg" text="Communities" link="*"/>
                        <MenuItem img="../images/music.svg"       text="Music"       link="audio"/>
                        <MenuItem img="../images/photo.svg"       text="Photos"      link="photos"/>
                        <MenuItem img="../images/video.svg"       text="Videos"      link="*"/>
                    </ul>
                </nav>
            </div>
        );
    }
}