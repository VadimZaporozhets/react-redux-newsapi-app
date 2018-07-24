import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import SourcesContainer from './containers/sources-container';
import ArticlesContainer from './containers/articles-container';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={SourcesContainer} / >     
          <Route path="/articles/:sourceId" component={ArticlesContainer} / >     
        </Switch>
      </div>
    );
  }
}

export default App;
