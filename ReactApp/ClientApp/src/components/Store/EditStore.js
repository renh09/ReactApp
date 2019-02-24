import React , { Component } from 'react'
import { Button, Form, Modal,Header} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class  CreateStore extends Component {

  state = {
    name:'',
    address:'',
    productSold:null
  }

  componentDidMount(){
    axios.get(`/api/Stores/${this.props.match.params.number}`)
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

  handleChange = (e,{name, value}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, address, productSold } = this.state;
    const updateStore = {
      id:this.props.match.params.number,
      name,
      address,
      productSold
    };

    axios.put(`/api/Stores/${this.props.match.params.number}`,updateStore
    ,{ headers: {
     'Content-Type': 'application/json'
 }})
    .then(res => {
      console.log(res);
      console.log(res.data);
      this.props.history.push('/stores');
    });


  }

  render() {
    const { name, address} = this.state;

    return(
      <Modal 
        open={true} 
        size='tiny'
      >
        <Header content='Edit Store' />
        <Modal.Content>
        <Form onSubmit={this.handleSubmit} id='submit-form'>
           <Form.Field>
             <label>NAME</label>
             <Form.Input name='name' value={name} onChange={this.handleChange} />
           </Form.Field>
           <Form.Field>
             <label>ADDRESS</label>
             <Form.Input name='address' value={address} onChange={this.handleChange} />
           </Form.Field>
       </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='cancel'
            color='black'
            as={ Link }
            to='/stores'
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




