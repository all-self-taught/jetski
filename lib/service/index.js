export const checkStatus = response => {
  if (response.ok) return response.json()
  else throw new Error(`${response.status} ${response.statusText}`)
}

const fetchService = (BASE_URL, { path, state }) => {
  const { url, method } = path;
  const { params } = state.page.pageData || {};
  const { formData: request } = state.page || {};

  let finalUrl = url;

  const body = method === 'POST' ?  JSON.stringify(request) : undefined;
  
  const headers = body ? {
    'Content-Type': 'application/json'
  } : {}

  if (params) {
      Object.keys(params).forEach(v => {
          finalUrl = finalUrl.replace(`:${v}`, params[v]);
      });
  }

  return fetch(`${BASE_URL}${finalUrl}`, { method, body, headers })
    .then(checkStatus)
}

export default fetchService;