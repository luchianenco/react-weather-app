import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Details from './details';
import * as actions from "../../actions/locationDetailedActions";

class LocationDetailed extends React.Component {
    constructor(props) {
        super(props);
        this.renderForecast = this.renderForecast.bind(this);
    }

    componentDidMount() {
        this.props.loadForecast(this.props.match.params.location);
    }

    renderForecast() {
        return this.props.forecast5days.data.list.map((forecast, index) => {

            return <Details key={index} details={forecast}/>
        })
    }

    render() {
        if (!this.props.forecast5days.data) {
            return <div>Loading...</div>;
        }

        return <div>
            <h2> <Link to="/" >Back</Link> : {this.props.forecast5days.data.name}</h2>
            <Grid>
                <Row>
                    {this.renderForecast()}
                </Row>
            </Grid>
        </div>;
    }
}

export default connect(
    state => ({
        forecast5days: state.location.forecast5days
    }),
    dispatch => ({
        loadForecast: location => dispatch(actions.getLocationForecast(location)),
    })
)(LocationDetailed);