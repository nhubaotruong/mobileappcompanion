import React from 'react';
import { Link } from 'react-router-dom';
import style from './SideMenu.module.scss';

const Button = ({ link, text, icon }) => {
    return (
        <Link className={`btn btn-link d-flex justify-content-around align-items-center m-3 ${style.button}`} to={link} style={{ height: 50 }} >
            <div>
                {<i className={`fa fa-lg ${icon}`} aria-hidden="true" />}
            </div>
            <div>
                <h5 className='m-0'>{text}</h5>
            </div>
        </Link>
    );
}

const SideMenu = () => {
    return (
        <div className='d-flex justify-content-start flex-column bg-dark vh-100'>
            <Button link='/' text='Trang chủ' icon='fa-home' />
            <Button link='/course' text='Khoá học' icon='fa-list-ul' />
            <Button link='/class' text='Lớp học' icon='fa-table' />
        </div>
    );
}

export default React.memo(SideMenu);