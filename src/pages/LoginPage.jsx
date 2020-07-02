import React from 'react';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { login, logout } from '../redux/systemReducer';

const LoginPage = props => {
    const loginForm = React.useRef();
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
        props.login(values, () => {
            loginForm.current.reset();
            window.location = '/';
        });

    }

    React.useEffect(() => {
        !!props.system.token && (window.location = '/');
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} ref={loginForm}>
            <label htmlFor="username">Username</label>
            <div className="input-group mb-3">
                <input type="text" className='form-control' name="username" id="username" ref={register({
                    required: true,
                    message: 'Username empty'
                })} />
            </div>
            <p style={{ color: 'red' }}>{errors.username && errors.username.message}</p>
            <label htmlFor="password">Password</label>
            <div className="input-group mb-3">
                <input type="password" className='form-control' name="password" id="password" ref={register({
                    required: true,
                    message: 'Password empty',
                    minLength: {
                        value: 6,
                        message: 'Password must be longer than 6 characters'
                    }
                })} />
            </div>
            <p style={{ color: 'red' }}>{errors.password && errors.password.message}</p>
            <button className='btn btn-primary' type='submit'>Đăng nhập</button>
            <button className='btn btn-danger' onClick={props.logout}>Đăng xuất</button>
        </form>
    );
}

const mapStatesToProps = state => ({ system: state.system });
const mapFunctionsToProps = { login, logout };

export default connect(mapStatesToProps, mapFunctionsToProps)(React.memo(LoginPage))