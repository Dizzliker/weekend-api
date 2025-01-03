import Weekend from './Weekend';

class Audio extends Weekend {
    getAll = async () => {
        return await this.getData('/getAllAudios');
    }

    addAudio = async (data) => {
        return await this.postData(`/addAudio`, data);
    }

    savePlayList = (playlist) => {
        localStorage.setItem('playlist', playlist);
    }

    check = () => {
        return localStorage.getItem('playlist') ? true : false;
    }

    getPlayListFromLocal = () => {
        return localStorage.getItem('playlist');
    }

    delete = async (id) => {
        return await this.getData(`/audio/${id}/delete`);
    }
}

export {Audio as AudioService};