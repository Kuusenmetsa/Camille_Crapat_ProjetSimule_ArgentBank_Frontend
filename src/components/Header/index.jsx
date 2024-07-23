import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import Logo from '../../assets/img/argentBankLogo.png';

import { useTestConnect } from '../../utils/Hook/sessionManagement';

export default function Header() {
	const userSelector = useSelector((state) => state.Auth);

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
						{userSelector.firstname
							? userSelector.firstname
							: JSON.parse(localStorage.getItem('user'))
							? JSON.parse(localStorage.getItem('user')).firstname
							: JSON.parse(sessionStorage.getItem('user')) && JSON.parse(sessionStorage.getItem('user')).firstname}
					</NavLink>
					<NavLink className='main-nav-item' to='/'>
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
