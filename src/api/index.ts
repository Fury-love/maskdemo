import home from './home';
import product from './product';
import user from './user';

const api = {
    ...product,
    ...home,
    ...user
};
export default api;
