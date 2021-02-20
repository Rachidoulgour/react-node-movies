import React from 'react'


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            password:"",         
            email:""
        }
    }
    render(){
        return(
            <div className="container-login">
                <form className="login">
                    <input type="password"  name="password" placeholder="Password" />                  
                    <input type="email"  name="email" placeholder="Email" />                  
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}
export default Login;