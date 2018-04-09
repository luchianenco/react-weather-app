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
        console.log(this.props.locations);
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

const NoLocationMessage = () => <div>No Location selected</div>;

const mapStateToProps = state => {
    return {
        locations: state.location.locations
    }
};

export default connect(mapStateToProps)(LocationList);