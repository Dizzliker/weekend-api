import Session from "./Session";

export default class Weekend {
    constructor() {
        this._api = 'http://127.0.0.1:8000/api';
        this.csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }

    getData = async (url) => {
        try {
            const res = await fetch(`${this._api}${url}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Session.getToken()}`,
                }
            });
        
            if (!res.ok) {
              throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`)
            }
            return (await res).json();
        } catch (error) {
            console.warn(error);
        }
    }

    postData = async (url, data, auth = false) => {
        try {
            const response = fetch(`${this._api}${url}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": this.csrf_token,
                    "Authorization": auth ? `Bearer ${Session.getToken()}` : "",
                },
                body: data,
            })
            return (await response).json();
        } catch (error) {
            console.warn(error);
        }
    };
}