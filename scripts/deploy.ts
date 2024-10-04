/**
 * Realiza o deploy do contrato web3DevToken
 * ! Para rodar: npx hardhat run ./scripts/deploy.ts --network localhost
 * ! O trecho `--network localhost` indica qual é a rede que vamos usar
 */

// precisamos importar o hardhat
import hardhat from 'hardhat';

// declamos a função que será executada um quando esse script rodar
async function main() {

    // nessa linha o hardhat faz o deploy do contrato
    // O [] vazio indica que o construtor do contrato não recebe nada como argumento
    const web3DevToken = await hardhat.viem.deployContract("Web3DevToken", []);
    
    // precisamos da conta que será usada para fazer o deploy do contrato
    const [account] = await hardhat.viem.getWalletClients();
}

main().catch((error) => {
    console.log(error);
});