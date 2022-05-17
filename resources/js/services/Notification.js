export default class Notification {
    static #audio = new Audio('/music/notification.mp3');
    
    static play = () => {
        this.#audio.play();
    }
}