// SPDX-License-Identifier: MIT
pragma solidity 0.8.0 < 0.9.0;

// [] O deployer do contrato receberá o primeiro convite
// [] Apenas endereços que já são convidados poderão convidar outros
// [] Um endereço não pode convidar a si mesmo (para não ter balanço demais)
// [] Cada emdereço pode convidar no máximo 3 outros endereços
// [] Desabilitar a função de transfer (faremos override)
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3DevToken {

}