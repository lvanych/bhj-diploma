/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    xhr.responseType = 'json';

    let formData = null;
    let parametrs = '';

    if (options.method == 'GET') {
        if (!(options.data == undefined)) {
            for (let key in options.data) {
                parametrs = parametrs + (parametrs == '' ? '' : '&') + key + '=' + options.data[key];
            }
            parametrs = '?' + parametrs;
        }
    } else {
        formData = new FormData();
        if (!(options.data == undefined)) {
            for (let key in options.data) {
                formData.append(key, options.data[key]);
            }
        }
    }

    try {
        xhr.open(options.method, options.url + parametrs);
        xhr.send(formData);
        } catch (err) {
            options.callback(err);
            return;
    }

    xhr.addEventListener ('readystatechange', () => {
        let err = null;

        if (xhr.readyState == xhr.DONE) {
            if (!(xhr.status == 200)) {
                err = new Error ('ошибка: ' + xhr.status.toString());
            }
            options.callback(err, xhr.response);
        }
    })
};
