import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './global.css';

import Header from './components/Header';
import Home from './pages/Home';
import Signin from './pages/Signin';
import User from './pages/User';
import Error from './pages/Error';
import Footer from './components/Footer';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user' element={<User />} />
				<Route path='/signin' element={<Signin />} />
				<Route path='*' element={<Error />} />
			</Routes>
			<Footer />
		</Router>
	</React.StrictMode>
);
