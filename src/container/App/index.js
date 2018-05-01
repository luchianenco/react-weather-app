import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import style from './App.css';
import Home from '../Home';
import LocationDetailed5Days from '../LocationDetailed5Days';
import LocationDetailed16Days from '../LocationDetailed16Days';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={style.app}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/weather/:location/5days" component={LocationDetailed5Days} />
                        <Route exact path="/weather/:location/16days" component={LocationDetailed16Days} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
