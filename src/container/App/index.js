import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header';
import style from './App.css';
import Home from '../Home';
import LocationDetailed from '../LocationDetailed';

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className={style.app}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/weather/:location/:duration?" component={LocationDetailed} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
