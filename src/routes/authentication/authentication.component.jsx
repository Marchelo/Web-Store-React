import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { AuthenticationContainer } from "./authentication.styles.jsx";

const defaultFormFields = {     // initialisation of fields in form
    email: '',
    password: '',
}

const Authentication = () => {

    return(
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
} 

export default Authentication;