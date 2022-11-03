import { useState, useEffect } from "react"


export function  SignUp ( props ) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [validEmail,setValidEmail] = useState(false)
    const [validPassword,setValidPassword] = useState(false)


    
    useEffect( () => {
    //check the value of email
    //check if email contains @ and it is not the forst character 
    if(email.length >= 5 && email.indexOf('@') > 0 ){
        setValidEmail (true)
    }
    else {
        setValidEmail (false)
    }
         }, [email] )

         useEffect( ()=> {
             if ( password.length >= 8  ) {
                 setValidPassword (true)
            }
            else {
                setValidPassword (false)
            }

         }, [password])

         const submitHandler = (event) => {
             //stop the form from refreshing the page
             event.preventDefault()
             //capture data from form 
             const data = new FormData ( event.target )
             props.handler(data.get("useremail"), data.get("userpd"))
             .then(()=>console.log("success"))
             .catch((error) => {
                 //console.log("ooops")
         })
        }
        
    return (
        <div className = "container">
            <div  className = "row" >
                <form className ="col-md-4 offset-md-4" onSubmit ={submitHandler}>
                    <h2> Sign up for an Account </h2>
                   < div className = "mb-3">
                       <label htmlFor = "useremail">Email</label>
                       <input 
                            type = "email" 
                            id = "useremail" 
                            name = "useremail"
                            placeholder = "you@domain.com"
                            className = "form-control"
                            value = {email}
                            onChange = {(event) => setEmail(event.target.value)}
                       />
                   </div>
                   < div className = "mb-3">
                       <label htmlFor = "userpw">Password (minimum 8 character)</label>
                       <input 
                            type = "password" 
                            id = "userpd" 
                            name = "userpd"
                            placeholder = "*******"
                            className = "form-control"
                            value = {password}
                            onChange = {(event) => setPassword(event.target.value)}
                       />
                   </div>
                   <div className = "d-grid" >
                   <button 
                        type = "Submit " 
                        className = "btn btn-primary"
                        disabled = { ( validEmail && validPassword ) ? false : true }
                    >
                        Sign Up
                   </button>
                   </div>
                </form>
            </div>
       </div>
     )

}