import { useState } from "react";

import {  
    signInWithGooglePopup,
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword 
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer } from "./sign-in-form.styles";

const defaultFormFields = {     // initialisation of fields in form
    email: '',
    password: '',
}

const SignInForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields); 
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error){
            if (error.code === 'auth/invalid-credential') {
                alert('Incorrect email or password');
            }
            console.log(error);            
        }
    }

    const handleChange = (event) => {   // updating of fields in form by using key-name and value 
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' type="email" onChange={handleChange} required name="email" value={email}/>
                <FormInput label='Password' type="password" onChange={handleChange} required name="password" value={password}/>

                <div className="buttons-container">
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;