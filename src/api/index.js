const baseUrl = import.meta.env.VITE_BASE_URL;

const requestGET = async (url) => {
  const response = await fetch(baseUrl + url);
  return await response.json();
};

const requestPOST = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const requestPUT = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const requestPATCH = async (url, data) => {
  const response = await fetch(baseUrl + url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

const requestDELETE = async (url) => {
  const response = await fetch(baseUrl + url, {
    method: 'DELETE',
  });
  return await response.json();
};

export { requestGET, requestPOST, requestPUT, requestPATCH, requestDELETE };
