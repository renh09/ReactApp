import React , { Component } from 'react'
import { Button, Form, Modal,Segment,Icon,Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class  EditProduct extends Component {
  state = {
    name:'',
    price:'',
    productSold:null
  }

componentDidMount(){
    axios.get(`/api/Products/${this.props.match.params.number}`)
          .then(res => {
            this.setState({ 
              name:res.data.name,
              price:res.data.price,
              productSold:res.data.productSold
             })
          })
          .then(() => console.log(this.state))
          .catch(function (error) {
              console.log(error);
          })
  }

  handleChange = (e,{name, value}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, price, productSold } = this.state;
    const updateProduct = {
      id:this.props.match.params.number,
      name,
      price,
      productSold
    };

    axios.put(`/api/Products/${this.props.match.params.number}`,updateProduct
    ,{ headers: {
     'Content-Type': 'application/json'
 }})
    .then(res => {
      console.log(res);
      console.log(res.data);
      this.props.history.push('/products');
    });


  }

  render() {
    const { name, price} = this.state;

    return(
      <Modal 
        open={true} 
        size='tiny'
      >
        <Header content='Edit Product' />
        <Modal.Content>
        <Form onSubmit={this.handleSubmit} id='submit-form'>
           <Form.Field>
             <label>NAME</label>
             <Form.Input name='name' value={name} onChange={this.handleChange} />
           </Form.Field>
           <Form.Field>
             <label>PRICE</label>
             <Form.Input name='price' value={price} onChange={this.handleChange} />
           </Form.Field>
       </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='cancel'
            color='black'
            as={ Link }
            to='/products'
          />
          <Button 
            content='edit'
            form='submit-form' 
            color='green' 
            icon='check' 
            labelPosition='right'
          />
        </Modal.Actions>
    </Modal>
    )
  }
}




