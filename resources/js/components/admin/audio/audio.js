import React, { Component } from "react";
import MusicList from "./music-list/music-list";
import RightSide from "../right-side/right-side";
import PopupAddMusic from '../../music/popup-add-music';

export default class AdminAudio extends Component {
    state = {
        popup: false,
    }

    render() {
        const {popup} = this.state;

        return (
            <>
            {popup && <PopupAddMusic onClose={() => this.setState({popup: false})}/>}
            <div className="music flex_column" style={{width: 620+'px', height: 100+'vh', backgroundColor: 'white'}}>
                <div className="flex jc_space-between" style={{width: 100+'%'}}>
                    <h1>Audios</h1>

                    <div className="music__actions flex_center_space-between">
                        <div className="music__add-audio flex_center_space-between">
                            <img src="../images/plus.svg" alt="" />
                            <a href="#" className="link">
                                <span onClick={() => {this.setState({popup: true})}} className="text">Add your music</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="music__playlist flex_column ai_center" style={{width: 100+'%'}}>
                    <MusicList />
                </div>
            </div>
            <RightSide />
            </>
        );
    }
}