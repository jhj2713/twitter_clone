import React, { useState } from "react"
import { authService } from "fbase";

const AuthForm = () => {    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("")

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "Email") {
            setEmail(value);
        } else if (name === "Password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <div>
            <form onSubmit={onSubmit} className="container">
                <input 
                    name="Email"
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    required
                    onChange={onChange}
                    className="authInput"/>
                <input 
                    name="Password"
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    required
                    onChange={onChange}
                    className="authInput"/>
                <input 
                    type="submit" 
                    className="authInput authSubmit"
                    value={newAccount? "Create Account" : "Log In"}/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount? "Sign In" : "Create Account"}
            </span>
        </div>
    )
}

export default AuthForm;