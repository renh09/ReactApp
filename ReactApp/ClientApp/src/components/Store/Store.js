import React, { Component } from 'react'
import axios from 'axios';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';

export default class Store extends Component {
  render() {
    return (
      <StoreTable />
    )
  }
}

class StoreTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores:[]
    }
  }

  componentDidMount() {
    axios.get(`/api/Stores`)
      .then(res => {
        const stores = res.data;
        this.setState({ stores });
      })
  }

  render() {
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
  
      <Table.Body>
        
        {this.state.stores.map(store => 
        <Table.Row key={store.id}>
          <Table.Cell>{store.name}</Table.Cell>
          <Table.Cell>{store.address}</Table.Cell>
          <Table.Cell><Button color='yellow'><Icon name='edit' />EDIT</Button></Table.Cell>
          <Table.Cell><Button color='red'><Icon name='trash' />DELETE</Button></Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
    )
  }

}