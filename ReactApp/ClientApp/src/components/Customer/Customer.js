import React, { Component } from 'react'
import { Switch,Route,Link } from 'react-router-dom';
import { Button ,Table, Segment,Modal} from 'semantic-ui-react';
import axios from 'axios';
import  CreateCustomer  from './CreateCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';


export default class Customer extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); 

    return (
      <div>
        <Switch 
        // location={isModal ? this.previousLocation : location}
        >
          <Route exact path='/customers' component={ CustomerTable } />
        </Switch>
        {isModal ? <Route path='/customers/new' component={ CreateCustomer }/> : null}
        {isModal ? <Route path='/customers/edit/:number' component={ EditCustomer }/> : null}
        {isModal ? <Route path='/customers/delete/:number' component={ DeleteCustomer }/> : null} 
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
      <Segment>
        <Button
        content='New Customer' 
        color='blue'
        as={Link}
        to={{ pathname: `/customers/new`, state: { modal: true }}}
        />
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
                to={{pathname:`/customers/edit/${customer.id}`,state:{ modal : true }}} 
              />
            </Table.Cell>
            <Table.Cell>
            <Button
                content='DELETE' 
                color='red'
                icon='trash'
                as={Link}
                to={{pathname:`/customers/delete/${customer.id}`,state:{ modal : true }}} 
            />
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    </Segment>
    )
  }
}

{/* const SelectItem = () => (
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
) */}


