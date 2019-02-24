import React, { Component } from 'react'
import { Switch,Route,Link } from 'react-router-dom';
import { Button ,Table,Segment} from 'semantic-ui-react';
import axios from 'axios';

import CreateStore from './CreateStore';
import EditStore from './EditStore';
import DeleteStore from './DeleteStore';



export default class Store extends Component {
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
          <Route exact path='/stores' component={ StoreTable } />
        </Switch>
        {isModal ? <Route path='/stores/new' component={ CreateStore }/> : null}
        {isModal ? <Route path='/stores/edit/:number' component={ EditStore }/> : null}
        {isModal ? <Route path='/stores/delete/:number' component={ DeleteStore }/> : null} 
      </div>
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
      <Segment>
        <Button
        content='New Store' 
        color='blue'
        as={Link}
        to={{ pathname: `/stores/new`, state: { modal: true }}}
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
          
          {this.state.stores.map(store => 
          <Table.Row key={store.id}>
            <Table.Cell>{store.name}</Table.Cell>
            <Table.Cell>{store.address}</Table.Cell>
            <Table.Cell>
              <Button
                content='EDIT' 
                color='yellow'
                icon='edit'
                as={Link}
                to={{pathname:`/stores/edit/${store.id}`,state:{ modal : true }}} 
              />
            </Table.Cell>
            <Table.Cell>
            <Button
                content='DELETE' 
                color='red'
                icon='trash'
                as={Link}
                to={{pathname:`/stores/delete/${store.id}`,state:{ modal : true }}} 
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


