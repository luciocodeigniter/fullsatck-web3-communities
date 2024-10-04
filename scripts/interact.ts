/**
 * script para interagir com o contrato web3DevToken
 *! Para rodar: npx hardhat run ./scripts/interact.ts --network localhost
 *! O trecho `--network localhost` indica qual é a rede que vamos usar
 */
import hardhat from 'hardhat';
import * as fs from 'fs';
import * as path from 'path';

//! pegamos os dados do contrato deployado
const filePath = path.resolve(__dirname, '../deployedContracts.json');
const contractData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// quero um script para convidar um endereço. 
//! Nesse caso estou usando o meu endereço de desenvolvimento da metamask: 0x7831d84E29E4CC3004864fe40ec39d608C5fF194
const METAMASK_WALLET_ADDRESS = '0x7831d84E29E4CC3004864fe40ec39d608C5fF194';


async function main() {
    // preciso da conta que fez o deploy do contrato para interagir com o mesmo,
    // visto que nesse ponto o nosso contrato já está `deployado`
    const [account] = await hardhat.viem.getWalletClients();

    // agora precisamos nos conectar com o contrato.
    //! IMPORTANTE: Passamos o endereço do contrato como segundo argumento, pois pode ocorrer 
    //! de fazermos deploys de vários contratos com o mesmo nome
    const web3DevToken = await hardhat.viem.getContractAt("Web3DevToken", contractData.contractAddress);

    console.log(`======================BEFORE==========================`);

    // lendo alguns balanços.
    // const balance = await web3DevToken.read.balanceOf([METAMASK_WALLET_ADDRESS]);
    // const balanceOfDeployer = await web3DevToken.read.balanceOf([account.account.address]);
    // console.log(`Balance of developer wallet before ${METAMASK_WALLET_ADDRESS} is ${balance.toString()}`);
    // console.log(`Balance of deployer before ${account.account.address} is ${balanceOfDeployer.toString()}`);

    // console.log(`========================AFTER========================`);

    // vamos convidar o endereço METAMASK_WALLET_ADDRESS
    // const inviteTransactionHash = await web3DevToken.write.invite([METAMASK_WALLET_ADDRESS]);


    // teste de erro para mais de três convites
    // const inviteTransactionHash2 = await web3DevToken.write.invite([METAMASK_WALLET_ADDRESS]);
    // const inviteTransactionHash3 = await web3DevToken.write.invite([METAMASK_WALLET_ADDRESS]);
    // const inviteTransactionHash4 = await web3DevToken.write.invite([METAMASK_WALLET_ADDRESS]);
    // const inviteTransactionHash5 = await web3DevToken.write.invite([METAMASK_WALLET_ADDRESS]);

    // teste de erro para convidar a si mesmo
    // const inviteTransactionHashDeployer = await web3DevToken.write.invite([account.account.address]);

    // recuperar o total de convites de algum endereço
    const totalInvites = await web3DevToken.read.getInviteCount([account.account.address]);
    console.log(`Total invite of deployer: ${totalInvites.toString()}`);
}

main().catch((error) => {
    console.log(error);
});
