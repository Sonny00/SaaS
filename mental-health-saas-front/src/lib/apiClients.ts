const API_BASE_URL = 'http://localhost:8000'; // Remplacez par l'URL de votre API

// Fonction pour ajouter un employé
export const addEmployeeApi = async (email) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout de l\'employé');
  }

  return await response.json();
};

// Fonction pour récupérer les employés
export const fetchEmployeesApi = async () => {
  const response = await fetch(`${API_BASE_URL}/employees`);

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des employés');
  }

  return await response.json();
};

// Fonction pour supprimer un employé
export const deleteEmployeeApi = async (id) => {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'employé");
    }
  
    return await response.json();
  };
