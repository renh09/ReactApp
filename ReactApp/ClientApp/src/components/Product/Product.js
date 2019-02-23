import React, { Component } from 'react'
import axios from 'axios';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';

export default class Product extends Component {
  render() {
    return (
      <ProductTable />
    )
  }
}

class ProductTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[]
    }
  }

  componentDidMount() {
    axios.get(`/api/Products`)
      .then(res => {
        const products = res.data;
        this.setState({ products });
      })
  }

  render() {
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
  
      <Table.Body>
        
        {this.state.products.map(product => 
        <Table.Row>
          <Table.Cell>{product.name}</Table.Cell>
          <Table.Cell>{product.price}</Table.Cell>
          <Table.Cell><Button color='yellow'><Icon name='edit' />EDIT</Button></Table.Cell>
          <Table.Cell><Button color='red'><Icon name='trash' />DELETE</Button></Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
    )
  }

}