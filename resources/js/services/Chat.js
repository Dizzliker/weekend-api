import Weekend from './Weekend';

class Chat extends Weekend {
    get = async (data) => {
        return await this.postData('/getChat', data, true);
    }

    getCountMessages = async (id) => {
        return await this.getData(`/getCountMessages/${id}`);
    }

    getChatList = async (id) => {
        return await this.getData(`/getChatList/${id}`);
    }

    sendMessage = async (data) => {
        return await this.postData('/sendMessage', data, true);
    }

    readMessages = async (data) => {
        return await this.postData('/readMessages', data, true);
    }
}

export {Chat as ChatService};