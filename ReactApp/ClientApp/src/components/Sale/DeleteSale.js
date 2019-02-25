import React, { Component } from 'react'
import { Button, Header, Modal} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import axios from 'axios'

export default class DeleteSales extends Component {
  
  handleClick = (e) => {
    e.preventDefault();

    axios.delete(
       `api/sales/${this.props.match.params.id}`
      )
      .then(() => this.props.history.push('/sales'))
    }

  render() {
    return (
      <Modal open={true} size='tiny'>
      <Modal.Header>Delete Sales</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Are you sure?</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
          <Button 
            content="cancel"
            as={Link} 
            to='/sales'
          />
          <Button
            negative
            icon='trash'
            labelPosition='right'
            content="delete"
            onClick={this.handleClick}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}