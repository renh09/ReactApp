import React, { Component } from 'react'
import { Table, Button,Segment } from 'semantic-ui-react'
import { Switch, Route, Link } from "react-router-dom"

import axios from 'axios';

import CreateSale from './CreateSale';
import EditSale from './EditSale';
import DeleteSale from './DeleteSale';

export default class Sale extends Component {
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
    ); // not initial render

    return (
      <div>
        <Switch >
          <Route exact path='/sales' component={ SaleTable }/>   
        </Switch>
        {isModal ? <Route path='/sales/new' component={ CreateSale }/> : null}
        {isModal ? <Route path='/sales/edit/:id' component={ EditSale }/> : null}
        {isModal ? <Route path='/sales/delete/:id' component={ DeleteSale }/> : null}
      </div>
    )
  }
}


class SaleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales: [],
    };

  }

  

  componentDidMount() {
    axios.get('api/Sales')
        .then(res => {
            const sales = res.data;
            this.setState({ sales });
        })
  }

  render() {
    const { sales } = this.state;

    return (
        <Segment>
          <Button 
              content='New Sale'
              color='blue'
              as={Link}
              to={{ pathname: `/sales/new`, state: { modal: true }}}
          />  
            <Table striped>
              <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Customer</Table.HeaderCell>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Store</Table.HeaderCell>
                    <Table.HeaderCell>Date Sold</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {sales.map((sale) => {
                  return (
                    <Table.Row key={sale.id}>
                        <Table.Cell>{sale.customer.name}</Table.Cell>
                        <Table.Cell>{sale.product.name}</Table.Cell>
                        <Table.Cell>{sale.store.name}</Table.Cell>
                        <Table.Cell>{sale.dateSold.slice(0,10)}</Table.Cell>
                        <Table.Cell>
                        <Button 
                            color='yellow' 
                            icon='edit'
                            content='EDIT'
                            as={ Link } 
                            to={{ pathname: `/sales/edit/${sale.id}`, state: { modal: true }}}
                        />
                        </Table.Cell>
                        <Table.Cell>
                          <Button 
                            negative
                            icon='trash'
                            content='DELETE'
                            as={ Link } 
                            to={{ pathname: `/sales/delete/${sale.id}`, state: { modal: true }}}
                          />
                        </Table.Cell>
                    </Table.Row>)
                })}
              </Table.Body>
            </Table>
        </Segment>
    )
  }
    
}
