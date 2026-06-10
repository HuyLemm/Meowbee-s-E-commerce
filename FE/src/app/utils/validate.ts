export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,16}$/;

  return passwordRegex.test(password);
};

export const validateLogin = (email: string, password: string) => {
  if (!isValidEmail(email)) {
    return {
      valid: false,
      message: "Email must follow valid email format.",
    };
  }

  if (!isValidPassword(password)) {
    return {
      valid: false,
      message:
        "Password must be 8–16 characters and include uppercase, lowercase, number, and special character.",
    };
  }

  return {
    valid: true,
    message: "",
  };
};