import React from 'react'


class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state={
            firstname:"",
            lastname:"",
            password:"",
            repeatpassword:"",
            email:"",
            confirmemail:""
        }
    }
    render(){
        return(
            <div className="container-login">
                <form className="signup">
                    <input type="text"  name="firstname" placeholder="First Name" />
                    <input type="text"  name="lastname" placeholder="Last Name" />
                    <input type="password"  name="password" placeholder="Password" />
                    <input type="password"  name="repeatpassword" placeholder="Confirm Password" />
                    <input type="email"  name="email" placeholder="Email" />
                    <input type="email"  name="confirmemail" placeholder="Confirm Email" />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}
export default SignUp;