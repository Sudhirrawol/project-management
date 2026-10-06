import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "./api/auth.api";
import { useState } from "react";


interface LoginProps {
    onLoginSuccess: (accessToken: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, [name]: value
        })

    }
    const mutation = useMutation({
        mutationFn: LoginUser,
        onSuccess: (data) => {
            console.log('Access token', data.accessToken)
            onLoginSuccess(data.accessToken)
        }
    })

    if (mutation.isSuccess) {
        console.log("Login response:", mutation.data);
    }
    const handleLogin = () => {
        mutation.mutate(formData)
    }
    return (<div>

        <h2>Login</h2>
        <input type="email"
            name='email'
            value={formData.email}
            placeholder="enter the email" onChange={handleChange} />

        <input name="password" type="password" value={formData.password} placeholder="enter the password" onChange={handleChange} />
        <button onClick={handleLogin} disabled={mutation.isPending}>{mutation.isPending ? "Logging in..." : "Login"}</button>
    </div>)
}
