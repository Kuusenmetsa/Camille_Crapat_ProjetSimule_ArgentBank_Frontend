import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './index.css';

import Logo from '../../assets/img/argentBankLogo.png';

import { useTestConnect } from '../../utils/Hook/sessionManagement';
import { delConnection } from '../../utils/Store/store';

export default function Header() {
	const userSelector = useSelector((state) => state.Auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const disconnect = (e) => {
		e.preventDefault();
		localStorage.clear();
		sessionStorage.clear();
		dispatch(delConnection());
		navigate('/');
	};

	return (
		<nav className='main-nav'>
			<NavLink className='main-nav-logo' to='/'>
				<img className='main-nav-logo-image' src={Logo} alt='Argent Bank Logo' />
				<h1 className='sr-only'>Argent Bank</h1>
			</NavLink>
			{useTestConnect() ? (
				<div>
					<NavLink className='main-nav-item' to='/user'>
						<FontAwesomeIcon icon={faCircleUser} style={{ color: '#000000' }} />
						{userSelector.firstname !== null
							? userSelector.firstname
							: localStorage.getItem('firstname')
							? localStorage.getItem('firstname')
							: sessionStorage.getItem('firstname') && sessionStorage.getItem('firstname')}
					</NavLink>
					<NavLink className='main-nav-item' to='/' onClick={(e) => disconnect(e)}>
						<FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#000000' }} />
						Sign Out
					</NavLink>
				</div>
			) : (
				<div>
					<NavLink className='main-nav-item' to='/signin'>
						<FontAwesomeIcon icon={faCircleUser} style={{ color: '#000000' }} />
						Sign In
					</NavLink>
				</div>
			)}
		</nav>
	);
}
