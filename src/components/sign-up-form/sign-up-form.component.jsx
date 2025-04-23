import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from "./sign-up-form.styles.jsx";

const defaultFormFields = {     // initialisation of fields in form
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
        
    const resetFormFields = () => {
        setFormFields(defaultFormFields); 
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert('passwords not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields();
        } catch (error){
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email is already in use');
            }else{
                console.log('error with creating user with email and password', error);
            }
        }
    }

    const handleChange = (event) => {   // updating of fields in form by using key-name and value 
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display name' type="text" onChange={handleChange} required name="displayName" value={displayName}/>

                <FormInput label='Email' type="email" onChange={handleChange} required name="email" value={email}/>

                <FormInput label='Password' type="password" onChange={handleChange} required name="password" value={password}/>
                
                <FormInput label='Confirm password' type="password" onChange={handleChange} required name="confirmPassword" value={confirmPassword}/>
            
                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;