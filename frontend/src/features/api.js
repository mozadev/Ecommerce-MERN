// Obtener el host actual
const host = window.location.hostname;

// Obtener el protocolo actual (http o https)
const protocol = window.location.protocol;

// Construir la URL dinámica
// const url = `https://backend-production-670d.up.railway.app/api`;
 const url = `ecommerce-mern-production-572d.up.railway.app/api`;

// Cambiar la URL base de la API para el entorno local
//const url = `http://localhost:3001/api`;

// Exportar la URL
export { url };


console.log(url);

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
  