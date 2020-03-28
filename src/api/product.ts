import fetch from './fetch';
import urls from './urls';

export default {
    queryProducts() {
        return fetch.get(urls.queryProducts);
    },
};
