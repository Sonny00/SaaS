const API_BASE_URL = 'http://localhost:8000'; // Remplacez par l'URL de votre API

// Fonctions pour la gestion des employés

// Ajouter un employé
export const addEmployeeApi = async (email) => {
  const response = await fetch(`${API_BASE_URL}/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de l'employé");
  }

  return await response.json();
};

// Récupérer les employés
export const fetchEmployeesApi = async () => {
  const response = await fetch(`${API_BASE_URL}/employees`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des employés");
  }

  return await response.json();
};

// Supprimer un employé
export const deleteEmployeeApi = async (id) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'employé");
  }

  return await response.json();
};

// Mettre à jour un employé
export const updateEmployeeApi = async (id, email) => {
  const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la mise à jour de l'employé");
  }

  return await response.json();
};

// Fonctions pour la gestion des demandes d'entretien

// Ajouter une demande d'entretien
export const addInterviewRequestApi = async (date, time, questionnaire, userId) => {
  const response = await fetch(`${API_BASE_URL}/interview-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, time, questionnaire, userId }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la demande d'entretien");
  }

  return await response.json();
};

// Récupérer les demandes d'entretien
export const fetchInterviewRequestsApi = async () => {
  const response = await fetch(`${API_BASE_URL}/interview-requests`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des demandes d'entretien");
  }

  return await response.json();
};

export const updateInterviewRequestApi = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview-requests/${id}`, {
      method: 'PATCH', // Remplacez PUT par PATCH ici
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Si la réponse est une erreur 404
    if (response.status === 404) {
      throw new Error(`Demande d'entretien avec l'ID ${id} non trouvée.`);
    }

    // Si la réponse est OK mais avec d'autres erreurs
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de la demande');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error('Erreur dans la mise à jour');
  }
};



export const deleteInterviewRequestApi = async (id) => {
  const response = await fetch(`${API_BASE_URL}/interview-requests/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de la demande d'entretien");
  }

  return await response.json();
};

// Fonctions pour la gestion des messages anonymes

// Ajouter un message anonyme
export const addAnonymousMessageApi = async (messageContent) => {
  const response = await fetch(`${API_BASE_URL}/anonymous-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: messageContent }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout du message anonyme");
  }

  return await response.json();
};

// Récupérer tous les messages anonymes
export const fetchAnonymousMessagesApi = async () => {
  const response = await fetch(`${API_BASE_URL}/anonymous-messages`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des messages anonymes");
  }

  return await response.json();
};

// Récupérer un message anonyme spécifique
export const fetchAnonymousMessageByIdApi = async (id) => {
  const response = await fetch(`${API_BASE_URL}/anonymous-messages/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Message avec l'ID ${id} non trouvé`);
    }
    throw new Error("Erreur lors de la récupération du message anonyme");
  }

  return await response.json();
};

const validStatuses = ['NON_TRAITE', 'EN_COURS', 'TRAITE'];

const isValidStatus = (status) => validStatuses.includes(status);

export const updateAnonymousMessageApi = async (id, newStatus) => {
  if (!isValidStatus(newStatus)) {
    throw new Error(`Statut invalide: ${newStatus}`);
  }

  const response = await fetch(`${API_BASE_URL}/anonymous-messages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }), // JSON au bon format
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Message avec l'ID ${id} non trouvé`);
    }
    throw new Error("Erreur lors de la mise à jour du message");
  }

  return await response.json();
};



// Supprimer un message anonyme
export const deleteAnonymousMessageApi = async (id) => {
  const response = await fetch(`${API_BASE_URL}/anonymous-messages/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Message avec l'ID ${id} non trouvé`);
    }
    throw new Error("Erreur lors de la suppression du message anonyme");
  }

  return await response.json();
};

// Supprimer un message anonyme
