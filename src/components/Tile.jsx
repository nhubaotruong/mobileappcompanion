import React from 'react';

const MiddleBox = ({ data }) => {
	return (
		<div className='shadow my-2 p-3' style={{ width: '90%', backgroundColor: 'white', borderRadius: 5 }}>
			<h4 style={{ color: '#168644' }}>{data.idSubject}&nbsp;&nbsp;&nbsp;&nbsp;{data.idClass}</h4>
			<h4><b>{data.nameSubject}</b></h4>
			<h5>{data.nameTeacher}</h5>
			<br />
			<div className='d-flex justify-content-between py-1'>
				<div className='d-flex align-items-center'>
					<i className="fa fa-lg fa-clock-o mr-2" aria-hidden="true"></i>
					{data.time}
				</div>
				<div className='d-flex'>{data.classroom}</div>
			</div>
		</div>
	);
}

export default MiddleBox;
