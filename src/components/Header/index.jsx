import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import './index.css';

import Logo from '../../assets/img/argentBankLogo.png';

export default function Header() {
	return (
		<nav className='main-nav'>
			<NavLink className='main-nav-logo' to='/'>
				<img className='main-nav-logo-image' src={Logo} alt='Argent Bank Logo' />
				<h1 className='sr-only'>Argent Bank</h1>
			</NavLink>
			<div>
				<NavLink className='main-nav-item' to='/user'>
					<FontAwesomeIcon icon={faCircleUser} style={{ color: '#000000' }} />
					Tony
				</NavLink>
				<NavLink className='main-nav-item' to='/'>
					<FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#000000' }} />
					Sign Out
				</NavLink>
				<NavLink className='main-nav-item' to='/signin'>
					<FontAwesomeIcon icon={faCircleUser} style={{ color: '#000000' }} />
					Sign In
				</NavLink>
			</div>
		</nav>
	);
}
