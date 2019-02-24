import React, { Component } from 'react'
import { Button, Modal, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class DeleteCustomer extends Component {
    // state = {
    //     redirect: false
    // }

  handleClick = (e) => {
      e.preventDefault();

      axios.delete(`/api/Customers/${this.props.match.params.number}`)
      .then(() => {this.setState({ redirect:true })})
       //.then(() => this.props.history.push('/customers'));
  }

  render() {
    // if (this.state.redirect === true) {
    //     return (
    //         <Redirect to="/Customers" />
    //     )
    // }

    return (
        <Modal 
            open={true}
            size='tiny'
            >
            <Header content='Delet Customer' />
            <Modal.Content>
                <h3>
                Are you sure?
                </h3>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content='cancel'
                    color='black'
                    as={ Link }
                    to='/customers'
                />
                <Button
                    content='delete'
                    color='red'
                    icon='x' 
                    labelPosition='right'
                 onClick={this.handleClick}
                />
            </Modal.Actions>
    </Modal>
        
    )
  }
}

