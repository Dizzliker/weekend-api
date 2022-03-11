import Weekend from './Weekend';

export default class Post extends Weekend {
    getTestData = async () => {
        const test = await this.getData(`register`);
        return test;
    }
}