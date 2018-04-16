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
                        <div style={{'text-align': 'center'}}>
                            <img
                                src={'http://openweathermap.org/img/w/' + details.weather[0].icon +'.png'}
                                alt={details.weather[0].description}
                            />
                            <strong style={{'font-size':'20px'}}>{Math.round(details.main.temp)}&deg;C</strong>
                        </div>
                        <div style={{'text-align': 'center'}}>{dt.format('ddd DD.MM HH:mm')}</div>
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

export default Details;