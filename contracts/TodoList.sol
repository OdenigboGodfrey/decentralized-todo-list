pragma solidity >=0.4.21 <0.7.0;

contract TodoList {
  function createList(string memory listName) public {
  }

  function getAllListNames() public view returns (string memory lists) {
  }

  function getListItems(uint listIndex) public view returns (string memory itemNames, bool[] memory itemsChecked) {
  }

  function updateList(uint listIndex, string memory items, bool[] memory itemsChecked) public {
  }
}