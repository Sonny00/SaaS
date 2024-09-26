
const API_URL = 'http://localhost:3000'; // Ton backend URL


export async function registerUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
}

// Fonction pour la connexion
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json(); // Retourne le token JWT
}

// Fonction pour vérifier si un token est valide
export async function verifyToken(token: string) {
  const response = await fetch(`${API_URL}/auth/protected`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
    },
  });

  if (!response.ok) {
    throw new Error('Token verification failed');
  }

  return response.json();
}
