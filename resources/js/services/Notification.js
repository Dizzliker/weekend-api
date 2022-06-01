export default class Notification {
    static #audio = new Audio('/music/notification.mp3');
    static #title = document.querySelector('title');
    static #titleInterval = '';
    
    static play = () => {
        this.#audio.play();
    }

    static setTitle = (title, repeat = false) => {
        // Повторять, если пришло новое сообщение 
        if (repeat) {
            this.#titleInterval = setInterval(() => {
                const newTitle = this.#title.innerText === 'Weekend' ? title : 'Weekend';
                this.#title.innerText = newTitle;
            }, 1000);
        } else {
            // Очищаем мигание title и ставим новый
            clearInterval(this.#titleInterval);
            this.#title.innerText = title;
        }
    } 
}