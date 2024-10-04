/**
 * Realiza o deploy do contrato web3DevToken
 * ! Para rodar: npx hardhat run ./scripts/deploy.ts --network localhost
 * ! O trecho `--network localhost` indica qual é a rede que vamos usar
 */

// Importamos o Hardhat e os módulos nativos do Node.js
import hardhat from 'hardhat';
import * as fs from 'fs';
import * as path from 'path';

// Função principal que será executada quando o script rodar
async function main() {
    // Faz o deploy do contrato Web3DevToken
    const web3DevToken = await hardhat.viem.deployContract("Web3DevToken", []);

    // Conta que será usada para fazer o deploy do contrato
    const [account] = await hardhat.viem.getWalletClients();

    // Obtém o endereço do contrato após o deploy
    const contractAddress = web3DevToken.address;

    // Define o caminho onde o endereço será salvo
    const outputPath = path.resolve(__dirname, '../deployedContracts.json');

    // Cria um objeto com o endereço do contrato e a conta que fez o deploy
    const data = {
        contractAddress: contractAddress,
        deployedBy: account.account.address,
        network: hardhat.network.name
    };

    // Escreve o objeto em um arquivo JSON
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

    console.log(`Contrato deployado com sucesso! Endereço: ${contractAddress}`);
}

main().catch((error) => {
    console.log(error);
});