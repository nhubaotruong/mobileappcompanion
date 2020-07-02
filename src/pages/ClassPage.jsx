import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/systemReducer';

const ClassPage = props => {
    const logout = e => {
        e.preventDefault();
        props.logout(() => {
            location.reload();
        });
    }

    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className='d-flex justify-content-between flex-grow-1 w-100 px-4 py-2 shadow' style={{ backgroundColor: 'white' }}>
                <h1>Lớp học</h1>
                {!props.system?.token ? <Link to='/login'>Đăng nhập</Link> :
                    <a href='#' onClick={logout}>Đăng xuất</a>}
            </div>
            <div className='p-3'>
                <div className="tile">
                    bbb
                </div>
            </div>
        </div>
    );
}

const mapStatesToProps = state => ({ system: state.system });
const mapFunctionsToProps = { logout };

export default connect(mapStatesToProps, mapFunctionsToProps)(ClassPage);