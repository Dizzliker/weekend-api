import React, { Component } from 'react';
import { AudioService } from '../../../../services/Audio';
import Spinner from '../../../spinner';

export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            audios: [],
        };
        this.audio = new AudioService();
    }

    updateAudioList = () => {
        this.audio.getAll()
            .then(res => {
                if (res.audios) {
                    this.setState({audios: res.audios, loading: false});
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    componentDidMount() {
        this.updateAudioList();
    }

    onDeleteAudio = (audioId) => {
        this.audio.delete(audioId)
            .then(res => {
                if (res.success) {
                    this.updateAudioList();
                }
            })
    }

    render() {
        const {audios, loading} = this.state;
        const musicList = audios.length > 0 ? audios.map(audio => {
            return (
                <div className="music__track flex_center_space-between" key={audio.audio_id} title="Click to play audio">
                    <div className="music__track-info flex ai_center">
                        <img src={audio.cover} className="ava-50" alt="Audio cover" />
                        <div className="music__track-desc flex_column">
                            <span className="track-artist">{audio.author}</span>
                            <span className="track-name">{audio.name}</span>
                        </div>
                    </div>
                    <div className="track-actions flex_center_space-between">
                        <a href="#" className="link" onClick={() => {this.onDeleteAudio(audio.audio_id)}}>
                            <img src="/images/close.svg" alt="Delete"></img>
                        </a>
                    </div>
                </div>
            );
        }) : null;

        return (
            <>
            {loading && <Spinner />}
            <div className="music__track-list">
                <div className="music__track-list-header">
                    <span className="music__title">Your playlist</span>     
                </div>
                {musicList}
            </div>
            </>
            
        );
    }
}