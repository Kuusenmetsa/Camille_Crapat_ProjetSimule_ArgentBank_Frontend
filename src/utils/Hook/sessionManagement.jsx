import { useSelector } from 'react-redux';

export function useTestConnect() {
	if (useSelector((state) => state.Auth.token) !== null) {
		return 1;
	} else if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
		return 1;
	} else {
		return 0;
	}
}
