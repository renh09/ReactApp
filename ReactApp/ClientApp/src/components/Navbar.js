import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          as={ Link }  
          name='home'
          to='/'
          active={activeItem === 'react'}
          onClick={this.handleItemClick}
        >
          React
        </Menu.Item>

        <Menu.Item
          as={ Link } 
          name='customers' 
          to='customers'
          active={activeItem === 'customers'} 
          onClick={this.handleItemClick}>
          Customers
        </Menu.Item>

        <Menu.Item
          as={ Link } 
          name='products'
          to='products'
          active={activeItem === 'products'}
          onClick={this.handleItemClick}
        >
          Products
        </Menu.Item>

        <Menu.Item
          as={ Link } 
          name='stores'
          to='stores'
          active={activeItem === 'stores'}
          onClick={this.handleItemClick}
        >
          Stores
        </Menu.Item>

        <Menu.Item
          as={ Link } 
          name='sales'
          to='sales'
          active={activeItem === 'sales'}
          onClick={this.handleItemClick}
        >
          Sales
        </Menu.Item>
      </Menu>
    )
  }
}

