import React, { Component } from 'react';
import { Button, Form, Segment} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditCustomer extends Component {
  state = {
    name:'',
    address:'',
    productSold:null
  }
  
  componentDidMount(){
    axios.get(`/api/Customers/${this.props.match.params.number}`)
          .then(res => {
            this.setState({ 
              name:res.data.name,
              address:res.data.address,
              productSold:res.data.productSold
             })
          })
          .then(() => console.log(this.state))
          .catch(function (error) {
              console.log(error);
          })
  }

  handleChange = (e,{ name,value}) => {
    this.setState({ [name]: value });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const{ name,address,productSold} = this.state;
    const updateCustomer = {
      id:this.props.match.params.number,
      name,
      address,
      productSold
    }

    axios.put(`/api/Customers/${this.props.match.params.number}`,updateCustomer
     ,{ headers: {
      'Content-Type': 'application/json'
  }})
    .then(res => {
      console.log(res);
      console.log(res.data);
      //back to customer page
      this.props.history.push('/customers');
    });

  
  }


  render() {
    const { name, address} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit} id='submit-form'>
          <Form.Field>
            <label>NAME</label>
            <Form.Input name='name' value={name} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>ADDRESS</label>
            <Form.Input name='address' value={address} onChange={this.handleChange} />
          </Form.Field>
          {/* TODO */}
        </Form>

        <Button
          content='cancel'
          color='black'
          as={ Link }
          to='/customers'
        />
        <Button 
          content='edit'
          form='submit-form' 
          color='green' 
          icon='check' 
          labelPosition='right'
        />
        
      </Segment>
    )
  }
}
