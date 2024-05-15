import React from "react";

const Login = (props) => {
    return (
        <div className="home-container">
            <img src="lisklogo.png"></img>
            <p className="slogan">Tokenizing Educational and Professional Certifications on the Lisk Blockchain</p>
            <p className="get-started">Connect your wallet to get started:</p>
            <div className="button-container">
                <button className="connect-btn" onClick = {props.connectUserWallet}>Connect User Wallet</button>
                <button className="connect-btn" onClick = {props.connectInstitutionWallet}>Connect Institution Wallet</button>
            </div>
        </div>
    )
}

export default Login;