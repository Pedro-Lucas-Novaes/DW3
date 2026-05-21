// Importando o Axios
import axios from "axios";
// Função que coleta o token do localStorage
export const getAxiosConfig = () => ({
  headers: {
    Authorization: `Bearer ${typeof window !== "undefined" ? (localStorage.getItem("token") ?? "") : ""}`,
  },
});

// Função que realiza o login
export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:4000/auth", {
      email,
      password,
    });
    // Após o login a API retorna o token
    // Coletando o token
    const token = response.data.token;
    // Armazenando o token no localStorage do navegador
    localStorage.setItem("token", token);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Função que realiza o logout
export const logout = (router) => {
  localStorage.removeItem("token");
  router.push("/");
};
