# Amazon TV Subscription Smart Contract

This smart contract manages Amazon TV subscriptions, allowing the owner to grant access to multiple addresses and control login permissions.

## Features

- **Owner Management**: The contract creator becomes the owner and has special privileges.
- **Change Password**: Only the owner can change the password.
- **Access Management**: The owner can grant and revoke access to other addresses.
- **Login System**: Users with access can log in with the correct password.

## Contract Functions

### `constructor()`

- Initializes the contract with the creator as the owner and sets an initial password.

### `changePassword(uint256 oldPassword, uint256 newPassword)`

- Allows the owner to change the password.

### `grantAccess(address addr)`

- Grants access to a specified address, allowing them to log in.
- Limited to 4 devices per account.

### `revokeAccess(address addr)`

- Revokes access from a specified address.

### `loginAccount(address addr, uint256 key)`

- Allows an address with access to log in with the correct password.

### `getContractAddress()`

- Retrieves the contract address.

## Usage

1. Deploy the contract.
2. Owner can change the password using `changePassword`.
3. Owner can grant or revoke access to addresses using `grantAccess` and `revokeAccess`.
4. Users with access can log in using `loginAccount`.

## Project Setup Instructions

To run this project on your computer after cloning the GitHub repository, follow the steps below:

1. **Install Dependencies:**
   - Navigate to the project directory in the terminal.
   - Run the following command to install project dependencies:
     ```bash
     npm install
     ```

2. **Start Ethereum Node:**
   - Open two additional terminals in your Visual Studio Code or preferred code editor.

   - In the second terminal, start the local Ethereum node using Hardhat:
     ```bash
     npx hardhat node
     ```

3. **Deploy Smart Contract:**
   - In the third terminal, deploy the smart contract to the local Ethereum network:
     ```bash
     npx hardhat run --network localhost scripts/deploy.js
     ```

4. **Launch Front-end:**
   - Go back to the first terminal and start the front-end application:
     ```bash
     npm run dev
     ```

5. **Access the Project:**
   - The project will be accessible on your local machine, typically at [http://localhost:3000/](http://localhost:3000/).

