import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const request = ({
    url,
    method = 'GET',
    headers,
    params,
    data,
    auth,
    withCredentials = false
}) => {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase();

        switch (method) {
            case 'POST':
                const p = new URLSearchParams();
                if (typeof data == 'object') {
                    for (let key in data) {
                        if (typeof data[key] == 'object') {
                            p.append(key, JSON.stringify(data[key]));
                        } else {
                            p.append(key, data[key]);
                        }
                    }
                }

                axios({
                    url,
                    method,
                    data: p,
                    headers,
                    auth,
                    withCredentials
                }).then(res => resolve(res)).catch(err => reject(err));
                break;

            default:
                // get put delete
                axios({
                    url,
                    method,
                    params,
                    headers,
                    withCredentials
                }).then(res => resolve(res)).catch(err => reject(err));
                break;
        }
    });
}

export default request;