export const isEmail = (email) => {
  if (
    typeof email === "string" &&
    email.length !== 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return true;
  } else {
    return false;
  }
};

export const isUserName = (username) => {
  if (
    typeof username === "string" &&
    username.length !== 0 &&
    /^[a-zA-Z0-9_]{3,16}$/.test(username)
  ) {
    return true;
  } else {
    return false;
  }
};

export const isPassword = (password) => {
  if (
    typeof password === "string" &&
    password.length !== 0 &&
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

export const passwordMatch = (npass, cpass) => {
  if (npass === cpass) {
    return true;
  } else {
    return false;
  }
};
