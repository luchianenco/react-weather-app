import React from 'react';
import { connect } from 'react-redux';
import Location from '../Location';
import { Grid, Row, Col } from 'react-bootstrap';

class LocationList extends React.Component {

    constructor(props) {
        super(props);

        this.renderLocations = this.renderLocations.bind(this);
    }

    renderLocations() {
        if (this.props.locations.length === 0) {
            return NoLocationMessage();
        }

        return this.props.locations.map((location, index) => {
            return <Col key={index + location.name} xs={6} md={4}><Location data={location} /></Col>
        })
    }

    render() {
        return (
            <div>
                <Grid>
                <h3>Selected Locations:</h3>
                    <Row className="show-grid">
                        {this.renderLocations()}
                    </Row>
                </Grid>
            </div>
        );
    }
}

const NoLocationMessage = () => <div style={{'paddingLeft': '16px', 'color':'red'}}>No Location selected!</div>;


export default connect(
    state => ({
        locations: state.location.locations
    })
)(LocationList);