// API base URL
const API_BASE_URL = 'https://671891927fc4c5ff8f49fcac.mockapi.io/v2';

/**
 * Fetch persons from API with pagination and sorting
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {string} sortBy - Field to sort by
 * @param {string} order - Sort order (asc/desc)
 * @returns {Promise<Array>} Array of person objects
 */
export const fetchPersons = async (page = 1, limit = 10, sortBy = 'createdAt', order = 'desc') => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    order
  });

  const response = await fetch(`${API_BASE_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
};

/**
 * Create a new person
 * @param {Object} personData - Person data to create
 * @returns {Promise<Object>} Created person object
 */
export const createPerson = async (personData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Update an existing person
 * @param {string} id - Person ID
 * @param {Object} personData - Updated person data
 * @returns {Promise<Object>} Updated person object
 */
export const updatePerson = async (id, personData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Delete a person
 * @param {string} id - Person ID
 * @returns {Promise<Object>} Deleted person object
 */
export const deletePerson = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
