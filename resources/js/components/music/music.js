import React, { Component } from 'react';
import PopupAddMisuc from './popup-add-music';

export default class Music extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
        }
    }

    render() {
        const {popup} = this.state;

        return (
            <div class="music">
            {popup && <PopupAddMisuc onClose={() => this.setState({popup: false})}/>}
            
            <div class="music__playlist flex_column ai_center">
                <div class="music__search-container">
                    <div class="search-box">
                        <input type="text" class="input-search" placeholder="Search" />
                        <img src="../images/search.svg" class="icon-search" alt="Search" />
                    </div> 
                </div>
                <div class="music__now-playing flex_column">
                    <div class="music__track-header flex_center_space-between">
                        <span class="music__title">Now playing</span>
                        <div class="music__actions flex_center_space-between">
                            <div class="music__add-audio flex_center_space-between">
                                <img src="../images/plus.svg" alt="" />
                                <a href="#" class="link">
                                    <span onClick={() => {this.setState({popup: true})}} class="text">Add your music</span>
                                </a>
                            </div>
                            <a href="#" class="link">
                                <span class="text">Friends music</span>
                            </a>
                        </div>
                    </div>
                    <div class="music__now-track flex ai_center">
                        <div class="music__track-controls flex_center_space-between">
                            <img src="../images/arrow-left.svg" class="cur_pointer" alt="Prev track" />
                            <img src="../images/pause.svg" class="cur_pointer" alt="Pause" />
                            <img src="../images/arrow-right.svg" class="cur_pointer" alt="Next track" />
                        </div>
                        <img src="../images/Audio.jpg" class="ava-50" alt="Track cover" />
                        <div class="music__now-track-info flex_column">
                            <div class="music__track-name-time flex_column">
                                <div class="music__track-name flex_center_space-between">
                                    <div class="music__track-info-container flex_column">
                                        <span class="track-artist">unxknow</span>
                                        <span class="track-name">На корвалоле</span>
                                    </div>
                                    <div class="music__track-time">
                                        <time class="track-time">1:39</time>
                                    </div>
                                </div>
                                <div class="music__track-input">
                                    <input type="range" class="input-range" min="0" max="100" step="1" />
                                </div>
                            </div>
                        </div>
                        <div class="track-actions flex_center_space-between">
                            <img src="../images/sound.svg" alt="Change sound" />
                            <img src="../images/retry.svg" alt="Retry track" />
                            <img src="../images/repost.svg" alt="Repost track" />
                            <div class="kebab gray">
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="music__track-list">
                    <div class="music__track-list-header">
                        <span class="music__title">Your playlist</span>     
                    </div>
                    <div class="music__track flex_center_space-between" title="Click to play audio">
                        <div class="music__track-info flex ai_center">
                            <img src="../images/Ava.jpg" class="ava-50" alt="Audio cover" />
                            <div class="music__track-desc flex_column">
                                <span class="track-artist">unxknow</span>
                                <span class="track-name">На корвалоле</span>
                            </div>
                        </div>
                        <div class="track-actions flex_center_space-between">
                            <img src="../images/sound.svg" alt="Change sound" />
                            <img src="../images/retry.svg" alt="Retry track" />
                            <img src="../images/repost.svg" alt="Repost track" />
                            <div class="kebab gray">
                                <div class="circle"></div>
                                <div class="circle"></div>
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="music__right-side flex_column ai_center">
                <div class="music__search-container">
                    <div class="search-box">
                        <input type="text" class="input-search" placeholder="Search" />
                        <img src="../images/search.svg" class="icon-search" alt="Search" />
                    </div> 
                </div>
                <div class="music__albums flex jc_space-between">
                    <div class="music__album">
                        <div class="music__album-container flex_center_center">
                            <div class="music__album-info flex_column">
                                <span class="album-name no-select">мои друзья не должны умирать</span>
                                <span class="album-artist no-select">aikko</span>
                            </div>
                            <span class="album-year no-select">2020</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}