import React, { Component } from 'react';
import {AudioService} from '../../../services/Audio';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            currentAudio: {
                audio: '',
                author: '',
                name: '',
                src: '',
                cover: '',
                duration: 0,
                time: 0,
            }
        };
        this.audio = new AudioService();
    }

    componentDidMount() {
        this.audio.getAll()
            .then(res => {
                if (res.audios) {
                    this.setState({playlist: res.audios});
                    this.initAudio(this.state.playlist[0]);
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    initAudio = (audio) => {
        this.setState({currentAudio: {
            audio: new Audio(audio.src),
            author: audio.author,
            name: audio.name,
            cover: audio.cover,
            duration: audio.duration,
            time: audio.duration,
            src: audio.src,
        }})
    }

    togglePlay = () => {
        const {audio} = this.state.currentAudio;
        audio.paused ? audio.play() : audio.pause();
    }

    render() {
        const {author, name, duration, time, cover} = this.state.currentAudio;

        return (
            <div className="sidebar__audio flex_column">
                <input type="range" className="input-range" min="0" max="100" step="1" />
                <div className="sidebar__audio-container flex_center_space-between">
                    <div className="sidebar__audio-info flex ai_center">
                        <div className="sidebar__audio-img">
                            <img src={cover} className="sidebar__audio-cover" alt="" />
                        </div>
    
                        <div className="sidebar__track-info flex_column">
                            <span className="sidebar__audio-artist">{author}</span>
                            <span className="sidebar__audio-name">{name}</span>
                        </div>
                    </div>
    
                    <div className="sidebar__audio-actions flex_center_space-between">
                        <img src="../images/arrow-left.svg" alt="" />
                        <img src="../images/pause.svg" alt="" onClick={this.togglePlay}/>
                        <img src="../images/arrow-right.svg" alt="" />
                    </div>
                </div>
                <div className="sidebar__audio-duration flex_column ai_flex-end">
                    <input type="range" className="input-range" min="0" max={duration} step="1" />
                    <span className="text-duration">{time}</span>
                </div>
            </div>
        );
    }
}