import React, { Component } from 'react'
import { Switch,Route,Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import  CreateCustomer  from './CreateCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';


export default class Customer extends Component {
  render() {
    return (
      <div>
         <CreateCustomer />
        <Switch>
          <Route exact path='/customers' component={ CustomerTable } />
          <Route  path='/customers/edit/:number' component={ EditCustomer } />      <Route  path='/customers/delete/:number' component={ DeleteCustomer } />    
        </Switch>
       
        <SelectItem />
      </div>
    )
  }
}

class CustomerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers:[]
    }
  }

  componentDidMount() {
    axios.get(`/api/Customers`)
      .then(res => {
        const customers = res.data;
        this.setState({ customers });
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
        
        {this.state.customers.map(customer => 
        <Table.Row key={customer.id}>
          <Table.Cell>{customer.name}</Table.Cell>
          <Table.Cell>{customer.address}</Table.Cell>
          <Table.Cell>
            <Button
              content='EDIT' 
              color='yellow'
              icon='edit'
              as={Link}
              to={`/customers/edit/${customer.id}`} /
            >
          </Table.Cell>
          <Table.Cell>
          <Button
              content='DELETE' 
              color='red'
              icon='trash'
              as={Link}
              to={`/customers/delete/${customer.id}`} /
            >
          </Table.Cell>
        </Table.Row>)}
      </Table.Body>
    </Table>
    )
  }
}

const SelectItem = () => (
  <select name='number'>
    <option>10</option>
    <option>9</option>
    <option>8</option>
    <option>7</option>
    <option>6</option>
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
  </select>
)


