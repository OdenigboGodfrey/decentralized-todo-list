import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import TodoListForm from '../../components/todo-list-form/TodoListForm';

import './Home.css';

export function Home({ lists, onSubmit }) {
  return (
    <Container className="home" style={{ maxWidth: '1000px' }}>
      <Row>
        <Col>
          <TodoListForm
            label="Create List"
            onSubmit={onSubmit}
            placeholder="Today's Shopping List"
          />
        </Col>
      </Row>
      <Row className="lists-container">
        <div className="section-header lists-header">Lists</div>
        <div className="lists">{lists.map((list, index) => (<List key={index} name={list.name}/>))}</div>
      </Row>
    </Container>
  );
}

function List({
  name
}) {
  return (
    <div className="list">{name}</div>
  );
}

export function HomeWrapper() {
  const [lists, setLists] = useState([]);
  const [submittingNewList, setSubmittingNewList] = useState(false);

  /**
   * get lists
   */
  useEffect(() => {
    setLists(getLists());
  }, []);

  /****************************
   * MOCK
   * Used until back-end is
   * implemented
   ****************************/

  function getLists() {
    return [
      { name: 'List 1' },
      { name: 'List 2' },
      { name: 'List 3' },
      { name: 'List 4' }
    ]
  }

  /**
   * MOCK SUBMIT
   */
  function onSubmit(value) {
    setSubmittingNewList(true);
    setTimeout(() => {
      setLists(previousState => ([...previousState, { name: value }]));
      setSubmittingNewList(false);
    }, 5000);
  }

  return (
    <LoadingOverlay
      active={submittingNewList}
      spinner
      text='Creating new list...'
    >
      <Home
        lists={lists}
        onSubmit={onSubmit}
      />
    </LoadingOverlay>
  );
}