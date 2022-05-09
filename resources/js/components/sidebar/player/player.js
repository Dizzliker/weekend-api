import React, { Component } from 'react';
import {AudioService} from '../../../services/Audio';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            currentAudioIndex: 0,
            currentAudioTime: '',
            volume: 0.5,
            paused: true,
            currentAudio: {
                audio: '',
                author: '',
                name: '',
                src: '',
                cover: '',
                volume: '',
                duration: 0,
                time: 0,
            }
        };
        this.audio = new AudioService();
        this.changeVolume = this.changeVolume.bind(this);
        this.rewind = this.rewind.bind(this);
    }

    componentDidMount() {
        if (this.audio.check()) {
            this.setState({playlist: this.audio.getPlayListFromLocal()});
            this.initAudio(this.state.playlist[this.state.currentAudioIndex]);
        } else {
            this.audio.getAll()
                .then(res => {
                    if (res.audios) {
                        this.setState({playlist: res.audios});
                        this.initAudio(this.state.playlist[this.state.currentAudioIndex]);
                    }
                })
                .catch(error => {
                    console.warn(error);
                });
        }
    }

    rewind = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });

        this.state.currentAudio.audio.currentTime = value;
    }

    changeVolume = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
        this.state.currentAudio.audio.volume = value;
    }

    initAudio = (audio) => {
        const newAudio = new Audio(audio.src);
        this.setState({currentAudio: {
            audio: newAudio,
            author: audio.author,
            name: audio.name,
            cover: audio.cover,
            duration: audio.duration,
            time: audio.duration,
            src: audio.src,
        }});
    }

    togglePlay = () => {
        const {audio} = this.state.currentAudio;
        audio.paused ? audio.play() : audio.pause();
        this.setState({paused: audio.paused});
    }

    render() {
        const {currentAudioTime, volume, paused} = this.state;
        const {author, name, duration, time, cover} = this.state.currentAudio;

        return (
            <div className="sidebar__audio flex_column">
                <input type="range" className="input-range" name="volume" onChange={this.changeVolume} value={volume} min="0" max="1" step="0.1" />
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
                        <img src="../images/arrow-left.svg" alt="" className='cp'/>
                        {/* class cp - cursor: pointer */}
                        {paused ? 
                        <img src="/images/arrow-right.svg" className='cp' width="20" height="20" onClick={this.togglePlay} alt="Play"/> :
                        <img src="/images/pause.svg" onClick={this.togglePlay} className='cp' alt="Pause"/>}
                        
                        <img src="../images/arrow-right.svg" alt="" className='cp'/>
                    </div>
                </div>
                <div className="sidebar__audio-duration flex_column ai_flex-end">
                    <input type="range" className="input-range" onChange={this.rewind} value={currentAudioTime} name="currentAudioTime" min="0" max={duration} step="1" />
                    <span className="text-duration">{time}</span>
                </div>
            </div>
        );
    }
}