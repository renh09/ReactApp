import React, { Component } from 'react'
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import axios from 'axios';

export default class CreateSale extends Component {
  
    state = {
      customers:[],
      products:[],
      stores:[],

      datetime: moment().subtract(10, 'days').calendar(),
      customerId:null,
      productId:null,
      storeId:null,
    };

    

  fetchData() {
    axios.get('api/Customers')
      .then(res => {
        let arr = [];

        res.data.map(i => {
          const obj = {};
          obj.key = i.id;
          obj.value = i.id;
          obj.text = i.name;

          arr.push(obj)
        })

        return arr;
      })
      .then((arr) => {
        this.setState({ customers: arr });
        console.log(this.state.customers);
      })

    axios.get('api/Products')
      .then(res => {
        let arr = [];

        res.data.map(i => {
          const obj = {};
          obj.key = i.id;
          obj.value = i.id;
          obj.text = i.name;

          arr.push(obj)
        })

        return arr;
      })
      .then((arr) => {
        this.setState({ products: arr });
        console.log(this.state.products);
      })

    axios.get('api/Stores')
      .then(res => {
        let arr = [];

        res.data.map(i => {
          const obj = {};
          obj.key = i.id;
          obj.value = i.id;
          obj.text = i.name;

          arr.push(obj)
        })

        return arr;
      })
      .then((arr) => {
        this.setState({ stores: arr });
        console.log(this.state.stores);
      })
  };

  componentWillMount() {
    this.fetchData();
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log(this.state.datetime,this.state.customerId,this.state.productId,this.state.storeId)

  }
  
  handleSubmit = (e) => {
      e.preventDefault();

      const { customerId, productId, storeId, datetime } = this.state
      const obj = {
         customerId, 
         productId, 
         storeId,
         dateSold: datetime
      };
    console.log(datetime);
      axios.post('/api/Sales', obj)
        .then(() => this.props.history.push('/sales'))
    }

  render() {
    const {name, price, customers, products, stores } = this.state;
    const { customerId, productId, storeId, datetime } = this.state
    return (
      <Modal 
        open={true}
        size="tiny" 
      >
        <Modal.Header>Create sales</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} id='create-product-form'>
            <Form.Field>
                <label>Date sold</label>
                <Form.Input disabled name='datetime' value={datetime} />
            </Form.Field>
            <Form.Field>
                <label>Customer</label>
                <Dropdown placeholder='Select' fluid selection options={customers} name='customerId' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Product</label>
                <Dropdown placeholder='Select' fluid selection options={products} name='productId' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Store</label>
                <Dropdown placeholder='Select' fluid selection options={stores} name='storeId' onChange={this.handleChange}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button 
              content='cancel' 
              as={Link} 
              to='/sales'
            />
            <Button
              positive 
              icon='check'
              labelPosition='right'
              content='create' 
              form="create-product-form"
            />
        </Modal.Actions>
      </Modal>
    )
  }
}