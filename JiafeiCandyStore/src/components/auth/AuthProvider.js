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
    // const [user, setUser] = useState(null)

    // const login = async (login, password) => {


    //     const users = await fetch('http://24dc-201-48-134-13.ngrok.io/user')
    //     const vUsers = await users.json()
    //     console.log(vUsers)
    //     const resp = vUsers.filter((u) => {
    //         return u.login === login && u.password === password
    //     })

    //     if (resp.length == 0) {
    //         return false;
    //     } else {
    //         const vu = resp[0]
    //         setUser({
    //             nome: vu.nome,
    //             login: vu.login,
    //             profile: vu.profile,
    //             id: vu.id,
    //             token: Math.random() * 100000000
    //         })
    //         return true;
    //     }

    //     // return false'
    // }

    // const logout = () => {
    //     setUser(null)
    // }

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
        <AuthContext.Provider value={{ userData, logout, saveUser, isCliente, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}


export { useAuth, AuthProvider }