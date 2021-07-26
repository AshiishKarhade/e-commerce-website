import { API } from "../../backend";

// API means --> http://localhost:8000/api/

// export const signup = (user) => {
//   // user coming from the frontend

//   return fetch(`${API}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => {
//       console.log("Response-------->", response);
//       console.log("Response-------->", response.json());

//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };
// Sign up
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// user must be continuously sign in when he hits the sign in button
export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    // window is global object in js
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout Success", response))
      .catch((err) => console.log(err));
  }
  next();
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};


