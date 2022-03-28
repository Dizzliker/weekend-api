import Weekend from './Weekend';

class Chat extends Weekend {
    get = async (data) => {
        return await this.postData('/getChat', data, true);
    }

    getChatList = async (id) => {
        return await this.getData(`/getChatList/${id}`);
    }

    sendMessage = async (data) => {
        return await this.postData('/sendMessage', data, true);
    }
}

export {Chat as ChatService};