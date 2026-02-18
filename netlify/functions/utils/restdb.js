const BASE_URL = process.env.RESTDB_BASE_URL;

const defaultHeaders = {
  'x-apikey': process.env.RESTDB_API_KEY,
  'Content-Type': 'application/json'
};

export const restdbFetch = (endpoint, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    },
    ...options
  });
};
