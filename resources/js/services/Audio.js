import Weekend from './Weekend';

export default class Audio extends Weekend {
    addAudio = async (data) => {
        return await this.postData(`/addAudio`, data, true);
    }
}