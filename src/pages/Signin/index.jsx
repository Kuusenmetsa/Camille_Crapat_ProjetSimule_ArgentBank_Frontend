import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

import { login } from '../../services/ServiceAPI';

export default function Signin() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
	const [remember, setRemember] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();

	// Changement du titre de la page
	useEffect(() => {
		document.title = 'Argent Bank - Connexion';
	}, []);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/user');
		}
	}, [navigate]);

	const connection = async (e) => {
		e.preventDefault();
		const regexMail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/; //eslint-disable-line
		const regexPassword = /^[0-9a-zA-Z\&\#\@\+\=\$\£\€\%\*\µ\?\/\!\§]{2,40}$/; //eslint-disable-line

		if (email === '' || !email) {
			setEmailError(true);
			setEmailErrorMessage('Veuillez saisir le champ "Username" !');
		} else if (!regexMail.test(email)) {
			setEmailError(true);
			setEmailErrorMessage('Veuillez saisir le champ "Username" de manière conforme !');
		} else if (password === '' || !password) {
			setPasswordError(true);
			setPasswordErrorMessage('Veuillez saisir le champ "Password" !');
		} else if (!regexPassword.test(password)) {
			setPasswordError(true);
			setPasswordErrorMessage('Veuillez saisir le champ "Password" de manière conforme !');
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
			setPasswordError(false);
			setPasswordErrorMessage('');
			try {
				const data = await login({
					email: email,
					password: password,
				});
				if (data.body && data.body.token) {
					setError(false);
					setErrorMessage('');
					localStorage.setItem('token', data.body.token);
					navigate('/user');
				} else if (data.status === 400) {
					setError(true);
					setErrorMessage('Votre e-mail ou votre mot de passe est incorrect !');
				} else if (data.status === 404) {
					setError(true);
					setErrorMessage('Le serveur API est introuvable !');
				} else if (data.status === 500) {
					setError(true);
					setErrorMessage('Une erreur en lien avec le serveur est survenue lors de la connexion !');
				} else {
					setError(true);
					setErrorMessage('Une erreur est survenue lors de la connexion !');
				}
			} catch (error) {
				setError(true);
				setErrorMessage('Une erreur est survenue lors de la connexion !');
			}
		}
	};

	return (
		<main className='main bg-dark'>
			<section className='sign-in-content'>
				<FontAwesomeIcon icon={faCircleUser} style={{ color: '#000000' }} />
				<h1>Sign In</h1>
				<form>
					<div className='input-wrapper'>
						<label htmlFor='username'>Username</label>
						<input type='text' id='username' value={email} onChange={(e) => setEmail(e.target.value)} />
						{emailError && <span className='error'>{emailErrorMessage}</span>}
					</div>
					<div className='input-wrapper'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' value={password} onInput={(e) => setPassword(e.target.value)} />
						{passwordError && <span className='error'>{passwordErrorMessage}</span>}
					</div>
					<div className='input-remember'>
						<input type='checkbox' id='remember-me' value={remember} onChange={() => setRemember(!remember)} />
						<label htmlFor='remember-me'>Remember me</label>
					</div>
					{error && <span className='error'>{errorMessage}</span>}
					<button className='sign-in-button' onClick={(e) => connection(e)}>
						Sign In
					</button>
				</form>
			</section>
		</main>
	);
}
