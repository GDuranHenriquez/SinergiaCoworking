interface userData {
  email: string,
  password: string,
}



export const validation = (userData: userData) => {
  const error: { email?: string; password?: string } = {};
  //Email validation
  if (!/\S+@\S+\.\S+/.test(userData.email)) {
    error.email = "Este correo no es válido";
  }
  if (!userData.email) {
    error.email = "Ingrese un correo electrónico";
  }
  /* if (userData.email.length > 35) {
    error.email =
      "The email address should not contain more than 35 characters";
  } */
  //Password validation
  const regest = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\\-/])/
  if (
    !regest.test(
      userData.password
    )
  ) {
    error.password =
      "La contraseña debe contener al menos un número, una letra y un caracter especial";
  }

  if (!(userData.password.length >= 8 && userData.password.length <= 32)) {
    error.password = "La contraseña debe contener entre 8 y 32 caracteres";
  }

  return error;
};