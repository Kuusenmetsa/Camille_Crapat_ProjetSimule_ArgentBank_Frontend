import { useSelector, useDispatch } from 'react-redux';
import { addConnection } from '../Store/store';

export function useTestConnect() {
	if (useSelector((state) => state.Auth.token)) {
		return 1;
	} else if (JSON.parse(localStorage.getItem('user'))) {
		if (JSON.parse(localStorage.getItem('user').token)) {
			return 1;
		} else {
			return 0;
		}
	} else if (JSON.parse(sessionStorage.getItem('user'))) {
		if (JSON.parse(sessionStorage.getItem('user')).token) {
			return 1;
		} else {
			return 0;
		}
	} else {
		return 0;
	}
}

export function useTokenUpdate() {
	const dispatch = useDispatch();
	const tokenStore = useSelector((state) => state.Auth.token);
	if (!tokenStore) {
		if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
			const token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
			dispatch(addConnection({ token: token }));
		}
	}
}
