import axios from 'axios';

const GET_ALL_COURSES = 'GET_ALL_COURSES';
const GET_COURSE = 'GET_COURSE';

const systemReducer = (state = null, action) => {
    switch (action.type) {
        case GET_ALL_COURSES: {
            return { ...state, items: action.payload }
        }
        case GET_COURSE: {
            return { ...state, item: action.payload };
        }
        default:
            return state;
    }
}

export default systemReducer;

// Actions
const host = 'https://attendance-qrcode-192.herokuapp.com';
export const getAllCourses = token => {
    return async dispatch => {
        let res = await axios.get(host + '/user/listcourse', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res.data.statusCode === 200) {
            console.log(res.data.message);
            dispatch({ type: GET_ALL_COURSES, payload: res.data.data });
        } else {
            console.log(res.data.message);
        }
    }
}

export const getCourse = (_id, token) => {
    return async dispatch => {
        let res = await axios.get(host + '/course/' + _id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.statusCode === 200) {
            console.log(res.data.message);
            dispatch({ type: GET_COURSE, payload: res.data.data });
        } else {
            console.log(res.data.message);
        }
    }
}

export const createCourse = (data, token, done) => {
    return async dispatch => {
        let res = await axios.post(host + '/course', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.statusCode === 201) {
            console.log(res.data.message);
            dispatch(getAllCourses(token));
        } else {
            console.log(res.data.message);
        }
        done();
    }
}

export const editCourse = (data, id, token, done) => {
    return async dispatch => {
        let res = await axios.put(host + '/course/' + id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.statusCode === 201) {
            console.log(res.data.message);
            dispatch(getAllCourses(token));
        } else {
            console.log(res.data.message);
        }
        done();
    }
}

export const toggleCourse = (id, token, done) => {
    return async dispatch => {
        let res = await axios.delete(host + '/course/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data.statusCode === 201) {
            console.log(res.data.message);
            dispatch(getAllCourses(token));
        } else {
            console.log(res.data.message);
        }
        done();
    }
}
