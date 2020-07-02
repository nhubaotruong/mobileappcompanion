import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/systemReducer';
import { getAllCourses, createCourse, editCourse } from '../redux/courseReducer';
import moment from 'moment';
import Modal from 'react-modal';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as locales from 'react-date-range/dist/locale';
import { useForm } from "react-hook-form";


Modal.setAppElement('#root');

const CoursePage = props => {

    //Modal
    const [isShow, setIsShow] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(null);
    const [dateRange, setDateRange] = React.useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const codeRef = React.useRef();
    const nameRef = React.useRef();
    const isActiveRef = React.useRef();
    const showModal = (e, item) => {
        e.preventDefault();
        setCurrentItem(item);
        setIsShow(true);
    }
    const closeModal = () => {
        setIsShow(false);
        setCurrentItem(null);
    }
    const loadData = () => {
        const { timeStart, timeEnd } = currentItem || { timeStart: null, timeEnd: null };
        // codeRef.current.value = code;
        // nameRef.current.value = name;
        // isActiveRef.current.checked = isActive;
        setDateRange([{
            startDate: timeStart ? new Date(timeStart) : new Date(),
            endDate: timeEnd ? new Date(timeEnd) : new Date(),
            key: 'selection'
        }])
    }


    const logout = e => {
        e.preventDefault();
        props.logout(() => {
            location.reload();
        });
    }

    React.useState(() => {
        props.system?.token && props.getAllCourses(props.system?.token);
    }, [])

    const submitHandler = values => {
        let res = {};
        res.code = values.code;
        res.name = values.name;
        res.timeStart = dateRange[0].startDate ? moment(dateRange[0].startDate).toISOString() : moment().toISOString();
        res.timeEnd = dateRange[0].endDate ? moment(dateRange[0].endDate).toISOString() : moment().toISOString();
        if (currentItem) {
            res.isActive = true;
            props.editCourse(res, currentItem._id, props.system?.token, closeModal);
        } else {
            props.createCourse(res, props.system?.token, closeModal);
        }
    }

    const deleteCourse = (e, item) => {
        e.preventDefault();
        console.log('haha');
    }

    const { handleSubmit, register, errors } = useForm();

    let table = <p>Không có khoá học</p>;
    if (props.course?.items && props.course?.items.length > 0) {
        table =
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th className='text-center align-middle' scope='col'>#</th>
                        <th className='text-center align-middle' scope='col'>Mã số môn học</th>
                        <th className='text-center align-middle' scope='col'>Tên môn học</th>
                        <th className='text-center align-middle' scope='col'>Thời gian</th>
                        <th className='text-center align-middle' scope='col'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {props.course.items.map((item, index) => {
                        if (item.isActive) {
                            return (
                                <tr key={index}>
                                    <th className='text-center align-middle' scope='row'>{index + 1}</th>
                                    <td className='align-middle'>{item.code || ''}</td>
                                    <td className='align-middle'>{item.name || ''}</td>
                                    <td className='align-middle'>{moment(item.timeStart).format('hh:mm A DD/MM/YYYY')} - {moment(item.timeEnd).format('hh:mm A DD/MM/YYYY')}</td>
                                    <td className='text-center'>
                                        <a href='#' className="btn btn-primary" onClick={e => showModal(e, item)}>
                                            <i className="fa fa-pencil-square-o" aria-hidden="true" />
                                        </a>
                                        <a href='#' className="btn btn-danger" onClick={e => deleteCourse(e, item)}>
                                            <i className="fa fa-trash-o" aria-hidden="true" />
                                        </a>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <div className='d-flex justify-content-between flex-grow-1 w-100 px-4 py-2 shadow' style={{ backgroundColor: 'white' }}>
                    <h1>Khoá học</h1>
                    {!props.system?.token ? <Link to='/login'>Đăng nhập</Link> :
                        <a href='#' onClick={e => logout(e)}>Đăng xuất</a>}
                </div>
                <div className='p-3 w-100'>
                    <div className="tile">
                        {table}
                    </div>
                </div>
                <div className='position-absolute' style={{ bottom: 20, right: 20 }}>
                    <a href='#' className='btn btn-lg btn-success rounded-circle' onClick={e => showModal(e)}>
                        <i className="fa fa-plus" aria-hidden="true" />
                    </a>
                </div>

            </div>
            <div>
                <Modal
                    isOpen={isShow}
                    onAfterOpen={loadData}
                    onRequestClose={closeModal}
                    style={{ overlay: { backgroundColor: 'rgba(33,37,41,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }, content: { background: 'transparent', width: '60%', padding: 0, left: 'auto', right: 'auto', bottom: 'auto', border: 'none', position: 'initial', paddingTop: '0.5rem' } }}
                    contentLabel="Example Modal"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="modal-body row">
                                <div className="form-group col-6">
                                    <label htmlFor="code">Mã môn học</label>
                                    <input type="text" name="code" id="code" placeholder='Mã môn học' className='form-control' defaultValue={currentItem?.code || ''}
                                        ref={register({
                                            required: true,
                                            message: 'Mã môn học bị trống'
                                        })}
                                    />
                                    <p style={{ color: 'red' }}>{errors.username && errors.username.message}</p>
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="name">Tên môn học</label>
                                    <input type="text" name="name" id="name" placeholder='Tên môn học' className='form-control' defaultValue={currentItem?.name || ''}
                                        ref={register({
                                            required: true,
                                            message: 'Tên môn học bị trống'
                                        })}
                                    />
                                    <p style={{ color: 'red' }}>{errors.username && errors.username.message}</p>
                                </div>
                                <div className='d-flex mt-3 col-12'>
                                    <label className='control-label'>Kích hoạt: &nbsp;</label>
                                    <div className='toggle'>
                                        <label>
                                            <input type='checkbox' name='isActive' defaultChecked={currentItem?.isActive || true}
                                                ref={register}
                                            />
                                            <span className='button-indecator' />
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDateRange([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={dateRange}
                                        locale={locales['vi']}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                <button type="submit" className="btn btn-primary">Lưu</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        </>
    );

}

const mapStatesToProps = state => ({ system: state.system, course: state.course });
const mapFunctionsToProps = { logout, getAllCourses, createCourse, editCourse };

export default connect(mapStatesToProps, mapFunctionsToProps)(CoursePage);