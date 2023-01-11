const baseUrl = import.meta.env.VITE_BASE_URL;

const get = async (url) => {
  const response = await fetch(baseUrl + url);
  return await response.json();
};

const post = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const put = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const patch = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const remove = async (url) => {
  const response = await fetch(baseUrl + url, {
    method: 'DELETE',
  });
  return await response.json();
};

export { get, post, put, remove, patch };
