interface userData {
  email: string,
  password: string,
}



export const validation = (userData: userData) => {
  const error: { email?: string; password?: string } = {};
  //Email validation
  if (!/\S+@\S+\.\S+/.test(userData.email)) {
    error.email = "This is not a valid email";
  }
  if (!userData.email) {
    error.email = "You must enter an email address";
  }
  /* if (userData.email.length > 35) {
    error.email =
      "The email address should not contain more than 35 characters";
  } */
  //Password validation
  if (
    !/(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-/])/.test(
      userData.password
    )
  ) {
    error.password =
      "Password must contain at least one number, one letter, and one special character";
  }

  if (!(userData.password.length >= 8 && userData.password.length <= 32)) {
    error.password = "Password must have between 8 and 32 characters";
  }

  return error;
};