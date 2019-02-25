import React, { Component } from 'react'
import { Button, Form, Modal, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import moment from 'moment'
import axios from 'axios'

export default class EditSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sales:[],
      customers:[],
      products:[],
      stores:[],

      customerName:'',
      productName:'',
      storeName:'',

      datetime: moment().subtract(10, 'days').calendar(),
      customerId:null,
      productId:null,
      storeId:null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchData() {
    axios.get(`api/sales/${this.props.match.params.id}`)
    .then(res => {
        const sales = res.data;
        this.setState({ 
          sales,
          customerName: sales.customer.name, 
          productName: sales.product.name, 
          storeName: sales.store.name 
        });
    }).then(() => console.log(this.state.sales))

    

    axios.get('api/customers')
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

    axios.get('api/products')
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

    axios.get('api/stores')
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

  componentDidMount() {
    this.fetchData();
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    console.log(this.state.datetime,this.state.customerId,this.state.productId,this.state.storeId)

  }
  
  handleSubmit = (e) => {
      e.preventDefault();

      const { customerId, productId, storeId, datetime, sales } = this.state
      const obj = {
        "id": sales.id,
         customerId, 
         productId, 
         storeId,
         "dateSold": datetime
      };
      axios.put(`/api/Sales/${this.props.match.params.id}`, obj,{ headers: {
        'Content-Type': 'application/json'
    }})
        .then(() => this.props.history.push('/sales'))
    }

  render() {
    const { customers, products, stores } = this.state;
    const { customerName, productName, storeName, } = this.state
    const { datetime } = this.state
    return (
      <Modal 
        open={true}
        size="tiny" 
      >
        <Modal.Header>Edit sales</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} id='edit-sales-form'>
            <Form.Field>
                <label>Date sold</label>
                <Form.Input disabled name='datetime' value={datetime} />
            </Form.Field>
            <Form.Field>
                <label>Customer</label>
                <Dropdown 
                 placeholder={customerName}
                 fluid selection options={customers} name='customerId' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Product</label>
                <Dropdown 
                placeholder={productName} 
                fluid selection options={products} name='productId' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Store</label>
                <Dropdown 
                placeholder={storeName} 
                fluid selection options={stores} name='storeId' onChange={this.handleChange}/>
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
              content='edit' 
              form="edit-sales-form"
            />
        </Modal.Actions>
      </Modal>
    )
  }
}