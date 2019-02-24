import React, { Component } from 'react'
import { Button, Modal, Header} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class DeleteStore extends Component {
    

  handleClick = (e) => {
      e.preventDefault();

      axios.delete(`/api/Stores/${this.props.match.params.number}`)
      .then(() => this.props.history.push('/stores'));
  }

  render() {
   

    return (
        <Modal 
            open={true}
            size='tiny'
            >
            <Header content='Delet Store' />
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
                    to='/stores'
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

