import React from 'react';
import Tile from './components/Tile.jsx';
import SideMenu from './components/SideMenu.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ClassPage from './pages/ClassPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import LoginPage from './pages/LoginPage.jsx';


const App = () => {
	return (
		<BrowserRouter>
			<div className="row">
				<div className="col-2 p-0">
					<SideMenu />
				</div>
				<div className='col-10' style={{ backgroundColor: '#f0f2f2', padding: 0 }}>
					<Switch>
						<Route exact path='/' component={HomePage} />
						<Route exact path='/class' component={ClassPage} />
						<Route exact path='/course' component={CoursePage} />
						<Route exact path='/login' component={LoginPage} />
					</Switch>
				</div>
			</div >
		</BrowserRouter>
	);
}

export default App;
