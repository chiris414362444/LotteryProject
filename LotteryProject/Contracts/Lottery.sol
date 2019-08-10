pragma solidity ^0.4.23;

contract Lottery {
  address public manager;
  address[] public players;

  constructor() public {
    manager = msg.sender;
  }

  function getPlayers() public returns(address[]){
    return players;
  }

  function enetr() public payable{
    require(msg.value > 0.01 ether);
    players.push(msg.sender);
  }

  function random() private view returns(uint) {
    return uint(keccak256(block.difficulty, now, players));
  }

  modifier restricted{
    require(msg.sender == manager);
    _;
  }

  function pickwiner() public restricted{
    uint index = random() % players.length;
    players[index].transfer(address(this).balance);
    players = new address[](0);
  }
}
