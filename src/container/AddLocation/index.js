import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import * as actions from '../../actions/addLocationActions';

class AddLocation extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidMount()
    {
        if (this.props.request.isLoaded && this.props.request.isSuccess) {
            this.handleChange('');
        }

    }

    getValidationState() {
        const length = this.props.value.length;
        if (length > 1) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(value) {
        this.props.onUpdate(value);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.props.value);
    }

    getSubmitText() {
        return this.props.isLoading ? 'Loading' : 'Submit';
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <form onSubmit={this.handleFormSubmit}>
                        <FormGroup
                            controlId="form"
                            validationState={this.getValidationState()}
                        >
                            <Col xs={12} md={8}>
                                <ControlLabel>Location:</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.props.value}
                                    placeholder="Enter New Location"
                                    disabled={this.props.isDisabled}
                                    onChange={(e) => this.handleChange(e.target.value)}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Add new location to track the weather!</HelpBlock>
                            </Col>
                            <Col xs={6} md={4}>
                                <Button bsStyle="primary" type="submit" disabled={this.props.isDisabled}>{this.getSubmitText()}</Button>
                            </Col>
                        </FormGroup>
                    </form>
                </Row>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        request: state.location.request,
        value: state.location.addLocation.value,
        isDisabled: state.location.addLocation.isDisabled
    }),
    dispatch => ({
        onSubmit: location => dispatch(actions.getLocationWeatherInfo(location)),
        onUpdate: value => dispatch(actions.addLocationValueUpdate(value))
    })
)(AddLocation);