import { createContext, useContext, useState } from "react";
import ObjectFactoryUtilities from "../../view/Utilitarios/ObjectFactoryUtilities";

const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [userData, setUserData] = useState({});

    const saveUser = async (response) => {
        setUserData(await ObjectFactoryUtilities.createUserSession(response));
    };

    const logout = () => {
        setUserData(
            userData.id = '',
            userData.name = '',
            userData.email = '',
            userData.password = '',
            userData.cep = '',
            userData.estado = '',
            userData.logradouro = '',
            userData.bairro = '',
            userData.cidade = '',
            userData.numero = '',
            userData.complemento = '',
            userData.profile = '',
            userData.token = '',
        );
    };

    const tipoUser = () => {
        if (userData === null) {
            return null
        } else {
            return userData.profile
        }
    }

    const isCliente = () => {
        return tipoUser() === 'cliente';
    }
    const isAdmin = () => {
        return tipoUser() === 'admin';
    }

    return (
        <AuthContext.Provider value={{ userData, logout, saveUser, isCliente, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export { useAuth, AuthProvider }