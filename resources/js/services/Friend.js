import Weekend from "./Weekend";

export default class Friend extends Weekend {
    constructor() {
        super();
    }

    sendRequest = async (data) => {
        return await this.postData(`/sendFriendRequest`, data, true);
    }

    get  = async (id) => {
        return await this.getData(`/friends/${id}`);
    }

    getCountFriends = async (id) => {
        return await this.getData(`/countFriends/${id}`);
    }

    getCountRequests = async (id) => {
        return await this.getData(`/countFriendRequests/${id}`);
    }

    getRequests = async (id) => {
        return await this.getData(`/friendRequests/${id}`);
    }

    addFriend = async (id) => {
        return await this.getData(`/addFriend/${id}`);
    }
    
    searchFriends = async (data) => {
        return await this.postData(`/searchFriends`, data, true);
    }
}

export {Friend as FriendService};