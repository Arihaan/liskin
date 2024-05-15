import React from "react";

const UserPage = (props) => {
    return (
        <div>
            <div className="page-header">
                <img src="lisklogo.png" width={200}></img>
                <p>Your Lisk wallet is connected: {props.account}</p>
            </div>
            <div className="user-credentials">
                Welcome to your profile! <br/> <br/> Your credentials: 
                <div>
                    {props.credentials.map((credentialType, index) => (
                        <div key={index}>
                            <h3><u>{getCredentialTypeLabel(index)}</u></h3>
                            {credentialType[0].map((credentialName, i) => (
                                <div key={i}>
                                    <p>Name: {credentialName}</p>
                                    <p>Year: {credentialType[1][i].toString()}</p> {/* Convert BigNumber to string */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>            
        </div>
    )
}

const getCredentialTypeLabel = (index) => {
    switch (index) {
        case 0:
            return "Education";
        case 1:
            return "Professional";
        case 2:
            return "Certification";
        default:
            return "";
    }
}

export default UserPage;