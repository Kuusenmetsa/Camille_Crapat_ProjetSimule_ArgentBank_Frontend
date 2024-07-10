import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

import './index.css';

export default function Signin() {
	useEffect(() => {
		document.title = 'Argent Bank - Connexion';
	}, []);
	return (
		<main className='main bg-dark'>
			<section className='sign-in-content'>
				<FontAwesomeIcon icon={faCircleUser} style={{ color: '#000000' }} />
				<h1>Sign In</h1>
				<form>
					<div className='input-wrapper'>
						<label htmlFor='username'>Username</label>
						<input type='text' id='username' />
					</div>
					<div className='input-wrapper'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' />
					</div>
					<div className='input-remember'>
						<input type='checkbox' id='remember-me' />
						<label htmlFor='remember-me'>Remember me</label>
					</div>
					<button className='sign-in-button'>Sign In</button>
				</form>
			</section>
		</main>
	);
}
