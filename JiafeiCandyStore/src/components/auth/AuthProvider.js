import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const login = async (login, senha) => {


        const users = await fetch('http://localhost:3000/user')
        const vUsers = await users.json()
        console.log(vUsers)
        const resp = vUsers.filter((u) => {
            return u.login === login && u.senha === senha
        })

        if (resp.length == 0) {
            return false;
        } else {
            const vu = resp[0]
            setUser({
                nome: vu.nome,
                login: vu.login,
                profile: vu.profile,
                id: vu.id,
                token: Math.random() * 100000000
            })
            return true;
        }

        // return false'
    }

    const logout = () => {
        setUser(null)
    }

    const tipoUser = () => {
        if (user === null) {
            return null
        } else {
            return user.profile
        }
    }

    const isCliente = () => {
        return tipoUser() === 'cliente';
    }
    const isAdmin = () => {
        return tipoUser() === 'admin';
    }
   

    return (
        <AuthContext.Provider value={{ user, login, logout, isCliente, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}


export { useAuth, AuthProvider }