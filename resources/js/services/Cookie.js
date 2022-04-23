export default class Cookie {
    static getToken = () => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + 'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : false;
    }

    static hasToken = () => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + 'token'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? true : false;
    }

    static setToken = (token) => {
        this.setCookie('token', token, {'samesite': 'lax', 'max-age': 100000});
    }

    static setCookie(name, value, options = {}) {
        options = {
          path: '/',
          // при необходимости добавьте другие значения по умолчанию
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
    }

    static deleteToken() {
      this.setCookie('token', '', {'max-age': -1});
    }
}