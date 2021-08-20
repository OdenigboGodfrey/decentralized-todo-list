import React, { useEffect, useState } from 'react';
import  { Container, Col, Form, Row, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import TodoListForm from '../../components/todo-list-form/TodoListForm';

import './List.css';

export function List({
  checkItem,
  items,
  onSubmit,
  onSave
}) {
  return (
    <Container className="list" style={{ maxWidth: '1000px' }}>
      <Row>
        <Col>
          <TodoListForm
            label="Add Item"
            onSubmit={onSubmit}
            placeholder="Tomatoes"
          />
        </Col>
      </Row>
      <Row className="items-row-container">
        <Col>
          <div className="section-header">Items</div>
          <Form className="items-container" onSubmit={onSave}>
            {items.map((item, index) => (
              <Form.Check
                className={item.checked ? 'item item-checked' : 'item'}
                type="checkbox"
                onChange={() => checkItem(index, !item.checked)}
                key={index}
                label={item.name}
                checked={item.checked}
              />
            ))}
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export function ListWrapper() {
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  /**
   * get items
   */
  useEffect(() => {
    setItems(getItems());
  }, []);

  /****************************
   * MOCK
   * Used until back-end is
   * implemented
   ****************************/

  // @TODO: Consolidate with what is in story
  function checkItem(index, checked) {
    setItems(previousState => {
      const updatedState = [...previousState];
      updatedState[index].checked = checked;
      return updatedState;
    });
  }

  function getItems() {
    return [
      { name: 'Item 1', checked: false },
      { name: 'Item 2', checked: false },
      { name: 'Item 3', checked: false },
      { name: 'Item 4', checked: false }
    ]
  }

  function onSave(event) {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 3000);
  }

  function onSubmit(value) {
    setItems(previousState => ([...previousState, { name: value, checked: false }]));
  }

  return (
    <LoadingOverlay
      active={saving}
      spinner
      text='Saving list state...'
    >
      <List
        checkItem={checkItem}
        items={items}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    </LoadingOverlay>
  );
}