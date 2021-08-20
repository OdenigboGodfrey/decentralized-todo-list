const TodoList = artifacts.require('./TodoList.sol');
const truffleAssert = require('truffle-assert');

contract('TodoList', accounts => {
  const FIRST_LIST = 'First List';
  const SECOND_LIST = 'Second List';
  
  let todoList;
  
  before(async () => {
    todoList = await TodoList.deployed();
  });

  describe('createList', () => {
    it('should add the new and empty list for a given user', async () => {
      const tx = await todoList.createList(FIRST_LIST);
      truffleAssert.eventEmitted(tx, 'ListCreated', (event) => {
        const { listName, index } = event;
        return (
          listName === FIRST_LIST &&
          index === 0
        );
      });
    });

    it('should be able to add a second list for a given user', async () => {
      const tx = await todoList.createList(SECOND_LIST);
      truffleAssert.eventEmitted(tx, 'ListCreated', (event) => {
        const { listName, index } = event;
        return (
          listName === SECOND_LIST &&
          index === 1
        );
      })
    });
  });

  describe('getAllListNames', () => {
    it('should return a delimited string containing all of the names', async () => {
      const listNames = await todoList.getAllListNames();
      assert.equal(listNames, `${FIRST_LIST}||${SECOND_LIST}`);
    });
  });

  // HACK: Test this first to update state of blockchain, so that next test can use that
  describe('updateList', () => {
    it('should be able to update list for the first time', async () => {
      const items = 'Apple||Banana||Grapes';
      const itemsChecked = [false, true, false];
      const listIndex = 1; // second list
      const tx = await todoList.updateList(listIndex, items, itemsChecked);
      truffleAssert.eventEmitted(tx, 'ListUpdated', (event) => {
        return (
          event.listIndex === listIndex &&
          event.items === items &&
          event.itemsChecked[0] === itemsChecked[0] &&
          event.itemsChecked[1] === itemsChecked[1] &&
          event.itemsChecked[2] === itemsChecked[2]
        );
      });
    });

    it('should be able to update list for more than once', async () => {
      const items = 'Apple||Banana||Grapes||Pears';
      const itemsChecked = [true, true, true, true];
      const listIndex = 1; // second list
      const tx = await todoList.updateList(listIndex, items, itemsChecked);
      truffleAssert.eventEmitted(tx, 'ListUpdated', (event) => {
        return (
          event.listIndex === listIndex &&
          event.items === items &&
          event.itemsChecked === itemsChecked &&
          event.itemsChecked[0] === itemsChecked[0] &&
          event.itemsChecked[1] === itemsChecked[1] &&
          event.itemsChecked[2] === itemsChecked[2] &&
          event.itemsChecked[3] === itemsChecked[3]
        );
      });
    });
  });

  describe('getListItems', () => {
    it('should return a tuple containing a delimited string containing all task names and an array of booleans containing checked status', async () => {
      const items = await todoList.getListItems(1);
      assert.equal(items.names, 'Apple||Banana||Grapes||Pears');
      assert.ok(items.itemsChecked[0]);
      assert.ok(items.itemsChecked[1]);
      assert.ok(items.itemsChecked[2]);
      assert.ok(items.itemsChecked[3]);
    });
  });
});
