import React from 'react';
import { connect } from "react-redux";
import AddLocation from '../AddLocation';
import LocationList from '../LocationList';

class Home extends React.Component {
    render () {
        return (
            <div>
                <AddLocation/>
                <LocationList locations={this.props.locations}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        locations: state.location.locations
    })
)(Home);