import axios from "axios";

export const client = axios.create({
    baseURL: "http://localhost:3030",
    headers: {
        "Content-Type": "application/json"
    }
});

/**
 * Axios es un cliente http basado en promesas que permite hacer 'requests' a servidores nodejs,
 * es decir que hace el equivalente a GET, POST, etc. de PHP para entornos construidos sobre nodejs
 * 
 * En este archivo se define la conexión al servidor local (nota el puerto, es el mismo que se abre 
 * cuando corres la API (Backend)).
 * 
 * https://www.npmjs.com/package/axios
 */