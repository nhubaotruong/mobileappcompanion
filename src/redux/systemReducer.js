import axios from 'axios';

const LOGIN = 'LOGIN';
const REGISTER = 'REGISTER';
const LOGOUT = 'LOGOUT';

const initialState = {
    token: window.localStorage.getItem('token') || ''
}

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            window.localStorage.setItem('token', action.payload);
            return { ...state, token: action.payload }
        }
        case LOGOUT: {
            window.localStorage.removeItem('token');
            return { ...state, token: '' };
        }
        default:
            return state;
    }
}

export default systemReducer;

// Actions
const host = 'https://attendance-qrcode-192.herokuapp.com';
export const login = (data, done) => {
    return async dispatch => {
        let res = await axios.post(host + '/auth/login', data);
        console.log(res);
        dispatch({ type: LOGIN, payload: res.data.data.token });
        done();
    }
}

export const logout = (done) => {
    return dispatch => {
        dispatch({ type: LOGOUT });
        done();
    }
}