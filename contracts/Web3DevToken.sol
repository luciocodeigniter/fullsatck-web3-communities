// SPDX-License-Identifier: MIT
pragma solidity >0.8.0 < 0.9.0;

// [x] O deployer do contrato receberá o primeiro convite
// [x] Apenas endereços que já são convidados poderão convidar outros
// [x] Um endereço não pode convidar a si mesmo (para não ter balanço demais)
// [x] Cada endereço pode convidar no máximo 3 outros endereços
// [x] Cada endereço só pode ser convidado uma vez
// [x] Desabilitar a função de transfer (faremos override) para que ninguém possa tranferir o convite dela para outra pessoa
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3DevToken is ERC20 {
    // definimos o máximo de convites que podem ser realizados pelo sender
    uint256 constant MAX_INVITES = 3;

    // decimals() é uma função padrão do ERC-20 que define a quantidade de casas decimais do token (geralmente 18). 
    // Então, 1 * 10 ** decimals() está criando 1 token com a quantidade apropriada de casas decimais 
    // (1 token completo, considerando as casas decimais).
    // em resumo, isso é a representação de 1 (um) convite
    uint256 inviteAmount = 1 * 10 ** decimals();

    // precisamos armazenar os endereços e o total de convites que cada um já fez.
    // para isso usaremos uma estrutura de chave e valor
    //! importante aqui é a visibilidade `private` e teremos um metodo público
    //! para retornar o número de convites de acordo com o `address` informado
    mapping(address => uint256) private inviteCount;
    
    // "Web3DevToken" é o nome do token.
    // "W3DT" é o símbolo do token.
    constructor() ERC20("Web3DevToken", "W3DT") {
        // Essa linha está mintando (criando) um token e atribuindo-os ao msg.sender,
        // que é o endereço que fez o deploy do contrato. 
        // ou seja, o deployer receberá o primeiro convite (token)     
        _mint(msg.sender, inviteAmount);
    }

    // função pública para qualquer pessoa convidar outra pessoa
    function invite(address to) public {
        // Apenas endereços que já são convidados (que tem o token) poderão convidar outros.
        // Para isso verificamos o balance do sender
        require(balanceOf(msg.sender) > 0, "You are not invited");

        // Um endereço não pode convidar a si mesmo (para não ter balanço demais)
        // ou seja, o endereço do `to` tem que ser diferente do `msg.sender`
        require(msg.sender != to, "You can't invite yourself");

        // Cada endereço pode convidar no máximo 3 outros endereços
        require(inviteCount[msg.sender] < MAX_INVITES, "You can't invite more than 3 people.");

        // Cada endereço só pode ser convidado uma vez
        // balanceOf(to) == 0: Garante que o endereço `to` não possui tokens (ou convites) ainda. 
        // Se o saldo for maior que zero, significa que o endereço já foi convidado.
        require(balanceOf(to) == 0, "This address has already been invited");

        // agora que as coisas estão validadas, podemos cconvidar a pessoa
        // enviando o montante de um token (1 convite) para carteira `to`
        _mint(to, inviteAmount);

        // atualizamos a contagem de convites realizados do `msg.sender`
        inviteCount[msg.sender]++;
    }

    // função que exibe o valor da variável privada para o endereço informado
    function getInviteCount(address account) public view returns (uint256) {
        return inviteCount[account];
    }

    // Desabilitar a função de transfer (faremos override) para que ninguém possa tranferir 
    // o convite dela para outra pessoa
    function transfer(address, uint256) public pure override returns (bool) {
        revert("Transfers are disabled");
    }
}