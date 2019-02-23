import React, { Component } from 'react'
import axios from 'axios';
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react';

export default class Sale extends Component {
  render() {
    return (
      <SaleTable />
    )
  }
}

class SaleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales:[]
    }
  }

  componentDidMount() {
    axios.get(`/api/Sales`)
      .then(res => {
        const sales = res.data;
        this.setState({ sales });
      })
  }

  render() {
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Store</Table.HeaderCell>
            <Table.HeaderCell>Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
  
      <Table.Body>
        
        {this.state.sales.map(sale => 
        <Table.Row key={sale.id}>
          <Table.Cell>{sale.customerId}</Table.Cell>
          <Table.Cell>{sale.productId}</Table.Cell>
          <Table.Cell>{sale.storeId}</Table.Cell>
          <Table.Cell>{sale.dateSold}</Table.Cell>
          <Table.Cell><Button color='yellow'><Icon name='edit' />EDIT</Button></Table.Cell>
          <Table.Cell><Button color='red'><Icon name='trash' />DELETE</Button></Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
    )
  }

}