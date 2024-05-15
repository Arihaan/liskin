import React, { useState } from 'react';

const InsPage = (props) => {
    const [userWalletAddress, setUserWalletAddress] = useState('');
    const [credentialName, setCredentialName] = useState('');
    const [credentialYear, setCredentialYear] = useState('');
    const [credentialType, setCredentialType] = useState('');

    const handleSubmit = () => {
        // Check if all fields are filled
        if (!userWalletAddress || !credentialName || !credentialYear || !credentialType) {
            alert('Please fill all fields');
            return;
        }

        // Send data to backend
        props.addCredential(userWalletAddress, credentialName, credentialYear, credentialType);

        // Clear the form
        setUserWalletAddress('');
        setCredentialName('');
        setCredentialYear('');
        setCredentialType('');
    };

    return (
        <div>
            <div className="page-header">
                <img src="lisklogo.png" width={200}></img>
                <p>Your Lisk wallet is connected: {props.account}</p>
            </div>
           <div className='user-credentials'>
            <h2>Add User Credential</h2>
            <form>
                <div className='credential'>
                    <label>User Wallet Address: </label>
                    <input type="text" size={64} value={userWalletAddress} onChange={(e) => setUserWalletAddress(e.target.value)} />
                </div>
                <div className='credential'>
                    <label>Credential Name: </label>
                    <input type="text" size={64} value={credentialName} onChange={(e) => setCredentialName(e.target.value)} />
                </div>
                <div className='credential'>
                    <label>Credential Year: </label>
                    <input type="number" value={credentialYear} onChange={(e) => setCredentialYear(e.target.value)} />
                </div>
                <div className='credential'>
                    <label>Credential Type: </label>
                    <select value={credentialType} onChange={(e) => setCredentialType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="Education">Education</option>
                        <option value="Professional">Professional</option>
                        <option value="Certification">Certification</option>
                    </select>
                </div>
                <button className="connect-btn" type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        </div>
    )
}

export default InsPage;