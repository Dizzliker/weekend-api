import Weekend from "./Weekend";

export default class Form extends Weekend {
    constructor(form) {
        super();
        this.form = form; 
    };

    csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    postData = async (url, data) => {
        try {
            const response = fetch(`${this._api}${url}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    'X-CSRF-TOKEN': this.csrf_token,
                },
                body: data,
            })
            return (await response).json();
        } catch (error) {
            console.warn(error);
        }
    };
}