import React, {Component} from 'react';

import Header from '../header/header';
import RandomPlanet from '../random-planet/random-planet';
import ErrorBoundry from '../error-boundry/error-boundry'
import SwapiService from '../../services/swapi-services';
import DummySwapiService from '../../services/dummy-swapi-service';

import {SwapiServiceProvider} from '../swapi-service-context';
import PeoplePage from '../pages/people-page';
import PlanetsPage from '../pages/planets-page';
import StarshipsPage from '../pages/starships-page';
import LoginPage from '../pages/login-page';
import SecretPage from '../pages/secret-page';

import './app.css';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceChange = ()=>{
    this.setState(({swapiService})=>{
      const Service = swapiService instanceof SwapiService ? DummySwapiService: SwapiService;

      return{
        swapiService: new Service()
      }
    })
    
  }

  
  render() {

    const { isLoggedIn } = this.state;

      return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
          <div className="stardb-app">
              
                <Header onServiceChange={this.onServiceChange}/>
                
                <RandomPlanet />
                <Switch>
                <Route path='/' exact render={()=> <h2>Welcom to StarDB</h2>} />
                <Route path ='/people/:id?' component={PeoplePage} />
                <Route path ='/planets' component={PlanetsPage} />
                <Route path ='/starships' exact component={StarshipsPage} />
                <Route path="/starships/:id"  render={({match})=>{
                  const { id } = match.params;
                  return <StarshipDetails itemId= {id}/>
                } 
                } />

                <Route path='/login' render={()=> (
                  <LoginPage 
                    isLoggedIn={ isLoggedIn }
                    onLogin={ this.onLogin }/>
                )} />

                <Route path='/secret' render={()=> (
                  <SecretPage 
                    isLoggedIn={ isLoggedIn }/>
                )}/>

                <Route render={()=> <h2>Page not found!</h2>} />
              </Switch>
          </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}