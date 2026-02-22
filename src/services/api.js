const API_BASE_URL = import.meta.env.VITE_API_URL;

const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`);
  if (!response.ok) throw new Error(`Greška na endpointu: ${endpoint}`);
  return await response.json();
};

export const api = {
  getCollection: (name) => fetchFromApi(`${name}?_embed&per_page=100`),
  getPosts: (params) => fetchFromApi(`posts?_embed&${params}`),
  getSingle: (name, id) => fetchFromApi(`${name}/${id}?_embed`),
  getMedia: (id) => fetchFromApi(`media/${id}`),
};
