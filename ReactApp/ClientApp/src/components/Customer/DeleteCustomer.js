import React, { Component } from 'react'
import { Button, Form, Segment} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


export default class DeleteCustomer extends Component {
    state = {
        redirect: false
    }

  handleClick = (e) => {
      e.preventDefault();

      axios.delete(`/api/Customers/${this.props.match.params.number}`)
      .then(() => {this.setState({ redirect:true })})
    //   .then(this.props.history.push('/customers'));
  }

  render() {
    if (this.state.redirect === true) {
        return (
            <Redirect to="/Customers" />
        )
    }

    return (
        <Button
            content='delete'
            onClick={this.handleClick}
        />
    )
  }
}

