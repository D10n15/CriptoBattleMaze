// web3.js

let provider;
let signer;
let userAddress;

// Detectar si MetaMask está instalado
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            userAddress = await signer.getAddress();

            document.getElementById("wallet-address").textContent = `🦊 Conectado: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

            // Obtener saldo en ETH
            const balance = await provider.getBalance(userAddress);
            const ethBalance = ethers.utils.formatEther(balance);
            document.getElementById("wallet-balance").textContent = `💰 Balance: ${ethBalance} ETH`;

        } catch (err) {
            console.error("Conexión fallida:", err);
        }
    } else {
        alert("¡MetaMask no está instalado!");
    }
}
