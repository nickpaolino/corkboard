const token = localStorage.getItem("token");

const url = "http://localhost:3000/api/v1/";

const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};

const getUser = jwt => {
  return fetch(`${url}current_user`, {
    headers: { Authorization: jwt }
  }).then(res => res.json());
};

const login = body => {
  return fetch(`${url}auth`, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  }).then(res => res.json());
};

export const api = {
  auth: {
    login,
    getUser
  }
};
