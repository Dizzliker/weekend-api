import Weekend from "./Weekend";

export default class Friend extends Weekend {
    constructor() {
        super();
    }

    add = async (data) => {
        const friend = await this.postData(`addFriend`, data, true);
        return friend;
    }
}