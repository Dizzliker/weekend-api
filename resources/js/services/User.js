import Weekend from './Weekend';

export default class User extends Weekend {
    getAll = async () => {
        return await this.getData('users');
    }
}