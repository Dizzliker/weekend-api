import Session from "./Session";

export default class Weekend {
    constructor() {
        this._api = 'http://api/api/';
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
}