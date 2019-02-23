import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import  Customer  from './components/Customer/Customer';
import Product from './components/Product/Product';
import Store from './components/Store/Store';
import Sale from './components/Sale/Sale';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/fetchdata' component={FetchData} />
          <Route path='/customers' component={Customer} />
          <Route path='/products' component={Product} />
          <Route path='/stores' component={Store} />
          <Route path='/sales' component={Sale} />
        </Switch>
      </Layout>
      
       
    );
  }
}

