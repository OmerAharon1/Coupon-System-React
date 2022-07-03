import axios from 'axios';
import store from '../Redux/store';


const tokenAxios = axios.create();

tokenAxios.interceptors.request.use(request => {

    request.headers = {
        "Authorization": store.getState().authReducer.user.token
    };

    return request;
});

export default tokenAxios;