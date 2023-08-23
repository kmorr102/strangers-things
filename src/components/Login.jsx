import { useState } from "react";
const cohort = '2305-FTB-ET-WEB-PT'
const BaseURL=`https://strangers-things.herokuapp.com/api/${cohort}`
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import App from "../App";

// token for superman30/krypt0n0nbust = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUxMGY5MmJlYjkzNTAwMTRjMzg2MzUiLCJ1c2VybmFtZSI6InN1cGVybWFuMzAiLCJpYXQiOjE2OTI0NzExODZ9.NZKPRcqxYRxX8so2l7FEJGMA9-O0IlHYjBk-PtWtFGM"

export default function LogIn(){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[successMessage,setSuccessMessage]=useState("");
    const[error, setError]=useState(null);
    const Navigate= useNavigate();
    
    async function handleSubmit(event){
        event.preventDefault();
        Navigate('/')
        try {
            const APIResponse= await fetch(`${BaseURL}/users/login`,
            {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    user: { 
                        username,
                        password,
                    }
                })
            });
            const result= await APIResponse.json()
           if (result.data && result.data.token) {
            console.log("Received Token:", result.data.token);
            localStorage.setItem('authtoken', result.data.token);
           // Store the token in local storage
            setToken(result.data.token);

            setSuccessMessage(result.message)
            setUsername('')
            setPassword('')
            console.log(result);
            return result;
        } else {
            setError(result.error.message || "Unexpected error occurred."); 
        }

    } catch (error) {
        setError(error.message);
    }
}
return(
    <div>
        <h1>Log In</h1>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username:{''}
                <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </label>
            <label>
                Password:{''}
                <input type="text" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </label>
            <button>
                Log In
            </button>
        </form>
        <Link to={"/SignUp"}className='register'>Sign Up Now</Link>
    </div>
)
}
