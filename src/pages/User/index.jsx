import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './index.css';

import { useTestConnect } from '../../utils/Hook/sessionManagement';

import EditUser from '../../components/EditUser';

export default function User() {
	const navigate = useNavigate();
	const testConnect = useTestConnect();
	const userSelector = useSelector((state) => state.Auth);
	const [editUser, setEditUser] = useState(false);

	useEffect(() => {
		document.title = 'Argent Bank - Mon compte';
	}, []);

	useEffect(() => {
		if (!testConnect) {
			navigate('/signin');
		}
	}, [testConnect, navigate]);

	return (
		<main className='main bg-dark'>
			<div className='header'>
				<h1>
					Welcome back
					<br />
					{!editUser ? (
						userSelector.firstname !== null && userSelector.lastname !== null ? (
							`${userSelector.firstname} ${userSelector.lastname}`
						) : localStorage.getItem('firstname') && localStorage.getItem('lastname') ? (
							`${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')}`
						) : (
							sessionStorage.getItem('firstname') &&
							sessionStorage.getItem('lastname') &&
							`${sessionStorage.getItem('firstname')} ${sessionStorage.getItem('lastname')}`
						)
					) : (
						<EditUser setEditUser={setEditUser} />
					)}
				</h1>
				{!editUser && (
					<button
						className='edit-button'
						onClick={(e) => {
							e.preventDefault();
							setEditUser(!editUser);
						}}
					>
						Edit Name
					</button>
				)}
			</div>
			<h2 className='sr-only'>Accounts</h2>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>Argent Bank Checking (x8349)</h3>
					<p className='account-amount'>$2,082.79</p>
					<p className='account-amount-description'>Available Balance</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>View transactions</button>
				</div>
			</section>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>Argent Bank Savings (x6712)</h3>
					<p className='account-amount'>$10,928.42</p>
					<p className='account-amount-description'>Available Balance</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>View transactions</button>
				</div>
			</section>
			<section className='account'>
				<div className='account-content-wrapper'>
					<h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
					<p className='account-amount'>$184.30</p>
					<p className='account-amount-description'>Current Balance</p>
				</div>
				<div className='account-content-wrapper cta'>
					<button className='transaction-button'>View transactions</button>
				</div>
			</section>
		</main>
	);
}
