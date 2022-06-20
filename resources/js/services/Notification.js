export default class Notification {
    static #audio = new Audio('/music/notification.mp3');
    static #title = document.querySelector('title');
    static #titleInterval = null;
    
    static play = () => {
        this.#audio.play();
    }

    static hasInterval = () => {
        if (this.#titleInterval !== null) {
            return true;
        }
        return false;
    }

    static clearTitleInterval = () => {
        if (this.hasInterval()) {
            clearInterval(this.#titleInterval);
            this.#titleInterval = null;
        }
    }

    static setRepeatTitle = (title) => {
       // Повторять, если пришло новое сообщение 
       if (!this.hasInterval()) {
            this.#titleInterval = setInterval(() => {
                const newTitle = this.#title.innerText === 'Weekend' ? title : 'Weekend';
                this.#title.innerText = newTitle;
            }, 1000);
        }
    }

    static setTitle = (title) => {
        this.clearTitleInterval();
        this.#title.innerText = title;
    } 
}