import React , { Component } from 'react'
import { Button, Form, Modal, Icon} from 'semantic-ui-react'
import axios from 'axios';

export default class  CreateCustomer extends Component {
  render(){
    return(
      <Modal trigger={<Button color='blue'>New Customer</Button>}>
        <Modal.Header>Create customer</Modal.Header>
        <Modal.Content>
          <CustomerForm />
        </Modal.Content>
       </Modal>
    )
  }
}

class CustomerForm extends Component {
  state = {
    name:'',
    address:'',
    productSold:null
  }

  handleChange = (e,{name, value}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, address, productSold } = this.state;
    const newCustomer = {
      name,
      address,
      productSold
    };

    axios.post('/api/Customers',newCustomer)
    .then(res => {
      console.log(res);
      console.log(res.data);
    });


  }

  render() {
    const { name, address} = this.state;

    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>NAME</label>
          <Form.Input name='name' value={name} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>ADDRESS</label>
          <Form.Input name='address' value={address} onChange={this.handleChange} />
        </Form.Field>
        <Button color='black'>cancel</Button>
        <Button color='green' icon labelPosition='right'>create<Icon name='check' /></Button>
    </Form>
    )
  }
}


