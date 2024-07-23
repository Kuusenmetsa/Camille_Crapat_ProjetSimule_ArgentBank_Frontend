import { useSelector, useDispatch } from 'react-redux';
import { addConnection } from '../Store/store';

export function useTestConnect() {
	if (useSelector((state) => state.Auth.token) !== null) {
		return 1;
	} else if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
		return 1;
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
