export default class Session {
    static get = (item = "user") => {
        return JSON.parse(sessionStorage.getItem(item));
    }

    static getId = () => {
        return JSON.parse(sessionStorage.getItem('user')).user.id;
    }

    static getToken = () => {
        return JSON.parse(sessionStorage.getItem('user')).token;
    }

    static fill = (session) => {
        const user_info = {
            user: session.user,
            token: session.token    
        }
        sessionStorage.setItem('user', JSON.stringify(user_info));
    }

    static check = () => {
        if (this.get()) {
            return true;
        }
        return false;
    }

    static clear = () => {
        sessionStorage.clear();
    }
}