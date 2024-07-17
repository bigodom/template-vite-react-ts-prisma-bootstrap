import { useState } from "react"
import api from "../../services/api"

const Register = () => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('admin')

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        try {
            await api.post('/user', { email, password, role, name, login})
            window.alert('Usuário cadastrado com sucesso!')
        } catch (error) {
            console.log(error)
        }

        setEmail('')
        setName('')
        setLogin('')
        setPassword('')
    }


    return (
        <div className="container-lg">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Registro de Usuário</h1>
                </div>
                <div className="col-12">
                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nome</label>
                            <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="login" className="form-label">Usuário</label>
                            <input type="text" className="form-control" id="login" name="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Cargo <strong>(Deixar todos como 'admin' por enquanto)</strong></label>
                            <input type="text" className="form-control" id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;