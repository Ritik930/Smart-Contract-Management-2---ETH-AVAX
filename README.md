# Smart-Contract-Management-2---ETH-AVAX

### Prerequisites
- Node.js and npm installed on your computer.

### Setup Instructions

#### Install Dependencies
Open your terminal and navigate to the project directory:
```bash
cd /path/to/your/project
```
Install npm dependencies:
```bash
npm install
```

#### Run Local Ethereum Node
Open a second terminal in your VS Code or another terminal window.
Start a local Ethereum node using Hardhat:
```bash
npx hardhat node
```

#### Deploy Smart Contracts
Open a third terminal in VS Code or another terminal window.
Deploy your smart contracts to the local network:
```bash
npx hardhat run --network localhost scripts/deploy.js
```
Replace `scripts/deploy.js` with the path to your actual deployment script if it's located elsewhere.

#### Launch Frontend
Back in the first terminal, start the Next.js development server:
```bash
npm run dev
```

### Accessing Your Project
Once the development server is running, you can access your project in a web browser at:
```
http://localhost:3000/
```

### Additional Notes
- Make sure all three terminals remain open while you're working on the project. Each terminal serves a different purpose:
  - First terminal: Installing dependencies and running the frontend.
  - Second terminal: Running the local Ethereum node.
  - Third terminal: Deploying smart contracts.
- Ensure that Hardhat is correctly configured (`hardhat.config.js`) with the necessary network settings (`localhost` in this case) and that your `deploy.js` script correctly references your contracts.

### Author
Ritik kumar (linkdein id :-https://www.linkedin.com/in/ritik-kumar-8376ba225/)
