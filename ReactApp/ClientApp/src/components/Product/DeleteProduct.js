import React, { Component } from 'react'
import { Button, Modal, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class DeleteProduct extends Component {
    

  handleClick = (e) => {
      e.preventDefault();

      axios.delete(`/api/Products/${this.props.match.params.number}`)
      .then(() => this.props.history.push('/products'));
  }

  render() {
   

    return (
        <Modal 
            open={true}
            size='tiny'
            >
            <Header content='Delet product' />
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
                    to='/products'
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

