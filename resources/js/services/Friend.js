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

    getCountRequests = async (id) => {
        return await this.getData(`/countFriendRequests/${id}`);
    }

    getRequests = async (id) => {
        return await this.getData(`/friendRequests/${id}`);
    }

    addFriend = async (id) => {
        return await this.getData(`/addFriend/${id}`);
    }
}

export {Friend as FriendService};