import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/systemReducer';

const sample = [
    {
        idSubject: "CO3043",
        nameSubject: "Mobile application development",
        idClass: "L01",
        nameTeacher: "Lưu Quang Huân",
        day: "Wednesday",
        time: "7:00 AM - 9:50 AM",
        classroom: "702H6 - CS2"
    },
    {
        idSubject: "CO3043",
        nameSubject: "Mobile application development",
        idClass: "L01",
        nameTeacher: "Lưu Quang Huân",
        day: "Wednesday",
        time: "7:00 AM - 9:50 AM",
        classroom: "702H6 - CS2"
    },
    {
        idSubject: "CO3043",
        nameSubject: "Mobile application development",
        idClass: "L01",
        nameTeacher: "Lưu Quang Huân",
        day: "Wednesday",
        time: "7:00 AM - 9:50 AM",
        classroom: "702H6 - CS2"
    },
    {
        idSubject: "CO3043",
        nameSubject: "Mobile application development",
        idClass: "L01",
        nameTeacher: "Lưu Quang Huân",
        day: "Wednesday",
        time: "7:00 AM - 9:50 AM",
        classroom: "702H6 - CS2"
    },
]

const HomePage = props => {
    const logout = e => {
        e.preventDefault();
        props.logout(() => {
            location.reload();
        });
    }
    console.log(props);
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <div className='d-flex justify-content-between flex-grow-1 w-100 px-4 py-2 shadow' style={{ backgroundColor: 'white' }}>
                <h1>Trang chủ</h1>
                {!props.system?.token ? <Link to='/login'>Đăng nhập</Link> :
                    <a href='#' onClick={logout}>Đăng xuất</a>}
            </div>
            <div className='p-3 w-100'>
                <div className="tile">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th className='text-center align-middle' scope='col'>#</th>
                                <th className='text-center align-middle' scope='col'>Mã số môn học</th>
                                <th className='text-center align-middle' scope='col'>Tên môn học</th>
                                <th className='text-center align-middle' scope='col'>Mã lớp học</th>
                                <th className='text-center align-middle' scope='col'>Giảng viên</th>
                                <th className='text-center align-middle' scope='col'>Thứ</th>
                                <th className='text-center align-middle' scope='col'>Giờ học</th>
                                <th className='text-center align-middle' scope='col'>Phòng học</th>
                                <th className='text-center align-middle' scope='col'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sample.map((item, index) => (
                                <tr key={index}>
                                    <th className='text-center align-middle' scope='row'>{index + 1}</th>
                                    <td className='align-middle'>{item.idSubject}</td>
                                    <td className='align-middle'>{item.nameSubject}</td>
                                    <td className='text-center align-middle'>{item.idClass}</td>
                                    <td className='align-middle'>{item.nameTeacher}</td>
                                    <td className='text-center align-middle'>{item.day}</td>
                                    <td className='align-middle'>{item.time}</td>
                                    <td className='align-middle'>{item.classroom}</td>
                                    <td className='text-center'>
                                        <button className="btn btn-primary">
                                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                                        </button>
                                        <button className="btn btn-danger">
                                            <i className="fa fa-trash-o" aria-hidden="true" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='position-absolute' style={{ bottom: 20, right: 20 }}>
                <button className='btn btn-lg btn-success rounded-circle'>
                    <i className="fa fa-plus" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

const mapStatesToProps = state => ({ system: state.system });
const mapFunctionsToProps = { logout };

export default connect(mapStatesToProps, mapFunctionsToProps)(HomePage);