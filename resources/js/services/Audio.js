import Weekend from './Weekend';

class Audio extends Weekend {
    getAll = async () => {
        return await this.getData('/getAllAudios');
    }

    addAudio = async (data) => {
        return await this.postData(`/addAudio`, data, true);
    }
}

export {Audio as AudioService};