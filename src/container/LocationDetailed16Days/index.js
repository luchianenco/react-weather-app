import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Grid, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Details16Days from './details';
import * as constant from '../../constants/location';
import * as actions from '../../actions/locationDetailedActions';

class LocationDetailed extends React.Component {
    constructor(props) {
        super(props);
        this.renderForecast = this.renderForecast.bind(this);
        this.renderDurationLink = this.renderDurationLink.bind(this);
    }

    componentDidMount() {
        this.props.loadForecast(this.props.match.params.location, constant.LOCATION_FORECAST_DURATION_16DAYS);
    }

    renderForecast() {
        const prefix = 'fcst_16d_' + this.props.match.params.duration;
        return this.props.forecast.data.list.map((forecast, index) => {
            return <Details16Days key={prefix + index} details={forecast}/>
        })
    }

    renderDurationLink() {
        return <Link to={`/weather/${this.props.match.params.location}/5days`}>5 Days</Link>
    }

    render() {
        if (!this.props.forecast.data) {
            return <div>Loading...</div>;
        }

        return <div>
            <div style={{'fontSize': '20px'}}> <Link to="/" onClick={this.props.clearForecastData}>Back</Link> : {this.props.forecast.data.name} : {this.renderDurationLink()}</div>
            <Grid>
                <Row>
                    {this.renderForecast()}
                </Row>
            </Grid>
        </div>;
    }
}

export default withRouter(
    connect(
        state => ({
            forecast: state.location.forecast16days
        }),
        dispatch => ({
            loadForecast: (location, duration) => dispatch(actions.getLocationForecast(location, duration)),
            clearForecastData: () => dispatch(actions.clearForecastData())
        })
    )(LocationDetailed)
);