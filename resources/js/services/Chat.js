import Weekend from './Weekend';

class Chat extends Weekend {
    get = async (data) => {
        return await this.postData('/getChat', data, true);
    }

    sendMessage = async (data) => {
        return await this.postData('/sendMessage', data, true);
    }
}

export {Chat as ChatService};