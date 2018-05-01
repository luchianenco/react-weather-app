import React from 'react';
import { Col, Panel } from 'react-bootstrap';
import moment from 'moment';

class Details extends React.Component {
    render() {
        const details = this.props.details;
        const dt = moment.unix(details.dt);
        return (
            <Col xs={3} md={2} style={{"margin": "5px"}}>
                <Panel>
                    <Panel.Body>
                        <div style={{'textAlign': 'center'}}>
                            <img
                                src={'http://openweathermap.org/img/w/' + details.weather[0].icon +'.png'}
                                alt={details.weather[0].description}
                            /><br/>
                            <strong style={{'fontSize':'16px', 'color': 'red'}}>Day: {Math.round(details.temp.day)}&deg;C</strong><br/>
                            <strong style={{'fontSize':'16px', 'color': 'blue'}}>Night: {Math.round(details.temp.night)}&deg;C</strong>
                        </div>
                        <div style={{'textAlign': 'center'}}>{dt.format('ddd DD.MM HH:mm')}</div>
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

export default Details;