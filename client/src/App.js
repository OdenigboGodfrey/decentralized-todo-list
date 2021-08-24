import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { HomeWrapper as Home } from './pages/home/Home';
import { ListWrapper as List } from './pages/list/List';
import NoMatch from './pages/no-match/NoMatch';
import getWeb3 from './getWeb3';
import TodoList from './contracts/TodoList.json';
import { Button } from 'react-bootstrap';

function App() {
  const [dependencies, setDependencies] = useState({ web3: null, account: null, todoList: null, loaded: false });

  useEffect(() => {
    (async function() {
      const web3 = await getWeb3();

      const networkId = await web3.eth.net.getId();
      const networkData = TodoList.networks[networkId];
      const todoList = new web3.eth.Contract(TodoList.abi, networkData.address);

      setDependencies(previousState => ({ ...previousState, web3, todoList }));
    })();
  }, []);

  useEffect(() => {
    (async function() {
      const { web3, todoList } = dependencies;
      if (web3 && todoList) {
        const [account] = await web3.eth.getAccounts();
        if (account) {
          setDependencies(previousState => ({ ...previousState, account, loaded: true }));
        } else {
          setDependencies(previousState => ({ ...previousState, loaded: true }));
        }
      }
    })();
  }, [dependencies]);

  /**
   * @description Abstraction for connecting user to application
   * @returns {undefined}
   */
  async function connect() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const { web3 } = dependencies;
    const [account] = await web3.eth.getAccounts();
    console.log(account);
    setDependencies(previousState => ({...previousState, account}));
  }

  return (
    <Router>
      {dependencies.loaded ?
        (dependencies.account ?
          <Switch>
            <Route path="/list">
              <List
                account={dependencies.account}
                todoList={dependencies.todoList}
              />
            </Route>
            <Route path="/">
              <Home
                account={dependencies.account}
                todoList={dependencies.todoList}
              />
            </Route>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch> :
          <Button onClick={connect}>connect</Button>) :
        <div>Loading...</div>
      }
    </Router>
  )
}

export default App;
