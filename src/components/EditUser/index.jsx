import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import './index.css';

import { putProfileUser } from '../../services/ServiceAPI';
import { addIdentity } from '../../utils/Store/store.jsx';

export default function EditUser({ setEditUser }) {
	const userSelector = useSelector((state) => state.Auth);
	const dispatch = useDispatch();

	const [lastname, setLastname] = useState(
		userSelector.lastname !== null
			? userSelector.lastname
			: localStorage.getItem('lastname')
			? localStorage.getItem('lastname')
			: sessionStorage.getItem('firstname') && sessionStorage.getItem('lastname')
	);
	const [lastnameError, setLastnameError] = useState(false);
	const [lastnameErrorMessage, setLastnameErrorMessage] = useState('');
	const [firstname, setFirstname] = useState(
		userSelector.firstname !== null
			? userSelector.firstname
			: localStorage.getItem('firstname')
			? localStorage.getItem('firstname')
			: sessionStorage.getItem('firstname') && sessionStorage.getItem('firstname')
	);
	const [firstnameError, setFirstnameError] = useState(false);
	const [firstnameErrorMessage, setFirstnameErrorMessage] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const editUser = async (e) => {
		e.preventDefault();
		const regexText = /^[A-Za-zéèàçâêûôîäëüïöÂÊÛÎÔÄËÜÏÖ\s]{2,20}$/; //eslint-disable-line
		if (!lastname || lastname === '') {
			setLastnameError(true);
			setLastnameErrorMessage('Please enter the lastname field !');
		} else if (!regexText.test(lastname)) {
			setLastnameError(true);
			setLastnameErrorMessage('Please enter the lastname field correctly !');
		} else if (!firstname || firstname === '') {
			setFirstnameError(true);
			setFirstnameErrorMessage('Please enter the firstname field !');
		} else if (!regexText.test(firstname)) {
			setFirstnameError(true);
			setFirstnameErrorMessage('Please enter the firstname field correctly !');
		} else {
			setLastnameError(false);
			setLastnameErrorMessage('');
			setFirstnameError(false);
			setFirstnameErrorMessage('');
			try {
				const token =
					userSelector.token !== null
						? userSelector.token
						: localStorage.getItem('token')
						? localStorage.getItem('token')
						: sessionStorage.getItem('token') && sessionStorage.getItem('token');
				const data = await putProfileUser(token, { firstName: firstname, lastName: lastname });
				if (data.status === 200) {
					setError(false);
					setFirstnameError(false);
					setLastnameError(false);
					setErrorMessage('');
					setFirstnameErrorMessage('');
					setLastnameErrorMessage('');
					if (userSelector.lastname && userSelector.firstname) {
						dispatch(
							addIdentity({
								firstname: data.body.firstName,
								lastname: data.body.lastName,
							})
						);
					} else if (localStorage.getItem('lastname') && localStorage.getItem('firstname')) {
						localStorage.setItem('lastname', lastname);
						localStorage.setItem('firstname', firstname);
					} else if (sessionStorage.getItem('lastname') && sessionStorage('firstname')) {
						sessionStorage.setItem('lastname', lastname);
						sessionStorage.setItem('firstname', firstname);
					} else {
						setError(true);
						setErrorMessage('Une erreur est survenu lors de la mise à jour des données');
					}
					setEditUser(false);
				} else if (data.status === 400) {
					setError(true);
					setErrorMessage('Invalid Request !');
				} else if (data.status === 500) {
					setError(true);
					setErrorMessage('A server error occurred !');
				} else {
					setError(true);
					setErrorMessage('An error occurred while modifying the profile !');
				}
			} catch (error) {
				setError(true);
				setErrorMessage('An error occurred while modifying the profile !');
			}
		}
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				editUser(e);
			}}
			className='form-editProfile'
		>
			<div className='input'>
				<input
					id='lastname'
					name='lastname'
					className=''
					value={lastname}
					onChange={(e) => {
						e.preventDefault();
						setLastname(e.target.value);
					}}
					type='text'
				/>
				<input
					id='firstname'
					name='firstname'
					className=''
					value={firstname}
					onChange={(e) => {
						e.preventDefault();
						setFirstname(e.target.value);
					}}
					type='text'
				/>
			</div>

			<div className='action'>
				{lastnameError && <span className='error'>{lastnameErrorMessage}</span>}
				{firstnameError && <span className='error'>{firstnameErrorMessage}</span>}
				{error && <span className='error'>{errorMessage}</span>}
				<div className='button'>
					<input type='submit' value='Save' className='edit-button--edit' />
					<button
						type='button'
						className='edit-button--edit'
						onClick={(e) => {
							e.preventDefault();
							setEditUser(false);
						}}
					>
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
}
