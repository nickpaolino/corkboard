const token = localStorage.getItem("token");

const url = "http://localhost:3000/api/v1/auth";

const headers = {
  "Content-Type": "application/json",
  Accepts: "application/json"
};

// const headers = {
//   "Content-Type": "application/json",
//   Accepts: "application/json",
//   Authorization: token
// };

const login = body => {
  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  }).then(res => res.json());
};

export const api = {
  auth: {
    login
  }
};
