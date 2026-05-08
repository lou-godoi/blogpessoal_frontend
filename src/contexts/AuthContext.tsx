import type { ReactNode } from "react"
import type UsuarioLogin from "../models/UsuarioLogin"
import React, { useState } from "react"
import { login } from "../services/Service"

interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = React.createContext<AuthContextProps>(
    {} as AuthContextProps
)

export function AuthProvider({children} : AuthProviderProps) {

     const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

     const [isLoading, setIsLoading] = useState(false)

     async function handleLogin(usuarioLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario)
            alert("O Usuário foi autenticado com sucesso!")
            console.log("Usuário autenticado com sucesso: ", usuario)
        } catch (error) {
            alert("Os Dados do usuário estão inconsistentes!")
        }
        setIsLoading(false)
    }
      
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{usuario, handleLogout, handleLogin, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
     

}




