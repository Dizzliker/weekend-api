import React, { Component } from 'react';
import PopupAddMisuc from './popup-add-music';
import MusicList from '../music-list/music-list';

export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audios: [],
            popup: false,
        }
    }

    render() {
        const {popup} = this.state;

        return (
            <div className="music">
            {popup && <PopupAddMisuc onClose={() => this.setState({popup: false})}/>}
            
            <div className="music__playlist flex_column ai_center">
                <div className="music__search-container">
                    <div className="search-box">
                        <input type="text" className="input-search" placeholder="Search" />
                        <img src="../images/search.svg" className="icon-search" alt="Search" />
                    </div> 
                </div>
                <div className="music__now-playing flex_column">
                    <div className="music__track-header flex_center_space-between">
                        <span className="music__title">Now playing</span>
                        <div className="music__actions flex_center_space-between">
                            <div className="music__add-audio flex_center_space-between">
                                <img src="../images/plus.svg" alt="" />
                                <a href="#" className="link">
                                    <span onClick={() => {this.setState({popup: true})}} className="text">Add your music</span>
                                </a>
                            </div>
                            <a href="#" className="link">
                                <span className="text">Friends music</span>
                            </a>
                        </div>
                    </div>
                    <div className="music__now-track flex ai_center">
                        <div className="music__track-controls flex_center_space-between">
                            <img src="../images/arrow-left.svg" className="cur_pointer" alt="Prev track" />
                            <img src="../images/pause.svg" className="cur_pointer" alt="Pause" />
                            <img src="../images/arrow-right.svg" className="cur_pointer" alt="Next track" />
                        </div>
                        <img src="../images/Audio.jpg" className="ava-50" alt="Track cover" />
                        <div className="music__now-track-info flex_column">
                            <div className="music__track-name-time flex_column">
                                <div className="music__track-name flex_center_space-between">
                                    <div className="music__track-info-container flex_column">
                                        <span className="track-artist">unxknow</span>
                                        <span className="track-name">На корвалоле</span>
                                    </div>
                                    <div className="music__track-time">
                                        <time className="track-time">1:39</time>
                                    </div>
                                </div>
                                <div className="music__track-input">
                                    <input type="range" className="input-range" min="0" max="100" step="1" />
                                </div>
                            </div>
                        </div>
                        <div className="track-actions flex_center_space-between">
                            <img src="../images/sound.svg" alt="Change sound" />
                            <img src="../images/retry.svg" alt="Retry track" />
                            <img src="../images/repost.svg" alt="Repost track" />
                            <div className="kebab gray">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <MusicList />
            </div>
            <div className="music__right-side flex_column ai_center">
                <div className="music__search-container">
                    <div className="search-box">
                        <input type="text" className="input-search" placeholder="Search" />
                        <img src="../images/search.svg" className="icon-search" alt="Search" />
                    </div> 
                </div>
                <div className="music__albums flex jc_space-between">
                    <div className="music__album">
                        <div className="music__album-container flex_center_center">
                            <div className="music__album-info flex_column">
                                <span className="album-name no-select">мои друзья не должны умирать</span>
                                <span className="album-artist no-select">aikko</span>
                            </div>
                            <span className="album-year no-select">2020</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}