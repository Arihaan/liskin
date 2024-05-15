// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LiskIn {
    // Structs
    struct Credential {
        string name;
        uint256 year;
        string cType; // "Education", "Professional", "Certification"
    }
    
    struct User {
        string name;
        mapping(string => Credential[]) credentials;
    }
    
    struct Institution {
        string name;
    }
    
    // Mappings
    mapping(address => User) public allUsers;
    mapping(address => Institution) public allInstitutions;
    
    string[] private credentialTypes = ["Education", "Professional", "Certification"];
    
    // Methods
    function register(string memory _name, string memory _type) public returns (string memory) {
        if (keccak256(bytes(_type)) == keccak256(bytes("user"))) {
            if (addressExists(msg.sender, true)) {
                return "Already registered";
            } else {
                User storage newUser = allUsers[msg.sender];
                newUser.name = _name;
                for (uint256 i = 0; i < credentialTypes.length; i++) {
                    newUser.credentials[credentialTypes[i]]; // Initialize the mapping
                }
            }
        } else if (keccak256(bytes(_type)) == keccak256(bytes("institution"))) {
            if (addressExists(msg.sender, false)) {
                return "Already registered";
            } else {
                allInstitutions[msg.sender] = Institution(_name);
            }
        }
        return "Registration successful";
    }
    
    function addCredential(address _userWalletAddress, string memory _name, uint256 _year, string memory _type) public returns (string memory) {
        if (!addressExists(msg.sender, false)) {
            return "Unregistered Institution";
        }
        if (!addressExists(_userWalletAddress, true)) {
            return "Unregistered User";
        }
        
        Credential memory newCredential = Credential(_name, _year, _type);
        
        // Create a reference to the pushed User struct
        User storage user = allUsers[_userWalletAddress];
        
        // Modify the reference directly
        user.credentials[_type].push(newCredential);
        
        return "Credential Added";
    }
    
    function getCredentials(address _userWalletAddress, string memory _type) public view returns (string[] memory, uint256[] memory) {
        require(addressExists(_userWalletAddress, true), "Unregistered User");
        
        Credential[] memory credentials = allUsers[_userWalletAddress].credentials[_type];
        string[] memory names = new string[](credentials.length);
        uint256[] memory yearss = new uint256[](credentials.length);
        for (uint256 i = 0; i < credentials.length; i++) {
            names[i] = credentials[i].name;
            yearss[i] = credentials[i].year;
        }
        return (names, yearss);
    }
    
    // Internal function to check if address exists and if it belongs to a user or institution
    function addressExists(address _addr, bool _isUser) internal view returns (bool) {
        if (_isUser) {
            return (bytes(allUsers[_addr].name).length > 0);
        } else {
            return (bytes(allInstitutions[_addr].name).length > 0);
        }
    }
}
