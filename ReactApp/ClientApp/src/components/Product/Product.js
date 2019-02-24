import React, { Component } from 'react'
import { Switch,Route,Link } from 'react-router-dom';
import { Button ,Table, Segment,Modal,Icon} from 'semantic-ui-react';
import axios from 'axios';

import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

export default class Product extends Component {
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
          <Route exact path='/products' component={ ProductTable } />
        </Switch>
        {isModal ? <Route path='/products/new' component={ CreateProduct }/> : null}
        {isModal ? <Route path='/products/edit/:number' component={ EditProduct }/> : null}
        {isModal ? <Route path='/products/delete/:number' component={ DeleteProduct }/> : null} 
      </div>
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
      <Segment>
        <Button
        content='New Product' 
        color='blue'
        as={Link}
        to={{ pathname: `/products/new`, state: { modal: true }}}
        />
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
          <Table.Row key={product.id}>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
            <Table.Cell>
              <Button
                content='EDIT' 
                color='yellow'
                icon='edit'
                as={Link}
                to={{pathname:`/products/edit/${product.id}`,state:{ modal : true }}} 
              />
            </Table.Cell>
            <Table.Cell>
            <Button
                content='DELETE' 
                color='red'
                icon='trash'
                as={Link}
                to={{pathname:`/products/delete/${product.id}`,state:{ modal : true }}} 
            />
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    </Segment>
    )
  }

}