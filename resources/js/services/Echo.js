import Echo from "laravel-echo";

class EchoService {
    static #config = {
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: false,
        disableStats: true,
        wsHost: window.location.hostname,
        wsPort: 6001,
    };

    static declareConfig = () => {
        window.Pusher = require('pusher-js');
        window.Echo = new Echo(this.#config);
    }
}

export {EchoService}