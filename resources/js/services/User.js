import Weekend from './Weekend';

export default class User extends Weekend {
    get = async () => {
        return await this.getData(`/user`);
    }

    getAll = async () => {
        return await this.getData('/users');
    }

    delete = async (id) => {
        return await this.getData(`/user/${id}/delete`)
    }

    unban = async (id) => {
        return await this.getData(`/user/${id}/unban`);
    }
    
    ban = async (id) => {
        return await this.getData(`/user/${id}/ban`);
    }
}