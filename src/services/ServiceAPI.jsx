const url = 'http://127.0.0.1:3001/api/v1';

export async function login(body) {
	try {
		const response = await fetch(`${url}/user/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}
