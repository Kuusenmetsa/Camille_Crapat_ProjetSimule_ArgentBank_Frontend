const url = 'http://127.0.0.1:3001/api/v1';

// Service API pour identifier un utilisateur
// Method : POST
/* 
Model données : 
	{
		"email": "string",
		"password": "string"
	}
*/
/*
Réponse du serveur :
	{
  		"status": 0,
  		"message": "string",
  		"body": {
  			"token": "string"
		}
	}
*/
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

// Service API pour créer un utilisateur
// Method : POST
/* 
Model données : 
	{
		"email": "string",
		"password": "string",
		"firstName": "string",
		"lastName": "string"
	}
*/
/*
Réponse du serveur :
	{
  		"status": 0,
  		"message": "string",
  		"body": {
    		"id": "string",
    		"email": "string"
		}
	}
*/
export async function signup(body) {
	try {
		const response = await fetch(`${url}/user/signup`, {
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

// Service API pour récupérer des données utilisateurs
// Method : POST
// JWT obligatoire
/*
Réponse du serveur :
	{
  		"status": 0,
  		"message": "string",
  		"body": {
    		"id": "string",
    		"email": "string"
		}
	}
*/
export async function getProfileUser(token) {
	try {
		const response = await fetch(`${url}/user/profile`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify({}),
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

// Service API pour modifier des données utilisateurs
// Method : PUT
// JWT obligatoire
/* 
Model données : 
{
  	"firstName": "string",
  	"lastName": "string"
}
*/
/*
Réponse du serveur :
	{
  		"status": 0,
  		"message": "string",
  		"body": {
    		"id": "string",
    		"email": "string"
		}
	}
*/
export async function putProfileUser(token, body) {
	try {
		const response = await fetch(`${url}/user/profile`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
			body: JSON.stringify(body),
		});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}
