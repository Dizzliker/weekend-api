import Cookie from "./Cookie";

export default class Weekend {
    constructor() {
        this._api = `${location.origin}/api`;
        this.csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    }

    getData = async (url) => {
        try {
            const res = await fetch(`${this._api}${url}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": this.csrf_token,
                    "Authorization": `Bearer ${Cookie.getToken()}`,
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

    postData = async (url, data, auth = true) => {
        try {
            const response = fetch(`${this._api}${url}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": this.csrf_token,
                    "Authorization": auth ? `Bearer ${Cookie.getToken()}` : '',
                },
                body: data,
            })
            return (await response).json();
        } catch (error) {
            console.warn(error);
        }
    };
}