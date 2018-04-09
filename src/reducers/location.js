import * as constant from '../constants/location';

const initialState = {
    locations: [],
    addLocation: {
        value: '',
        isDisabled: false
    },
    request: {
        isLoading: false,
        isLoaded: false,
        isSuccess: false
    }
};

const locations = (state = initialState, action) => {
    switch(action.type) {
        // Request successful
        case constant.LOCATION_WEATHER_DATA_REQUEST_SUCCESS: {
            return {
                ...state,
                locations: [...state.locations, action.payload],
                addLocation: {
                    value: '',
                    isDisabled: false
                },
                request: {
                    isLoading: false,
                    isLoaded: true,
                    isSuccess: true
                }
            };
        }

        // Request Error
        case constant.LOCATION_WEATHER_DATA_REQUEST_ERROR: {
            return {
                ...state,
                addLocation: {
                    value: state.addLocation.value,
                    isDisabled: false
                },
                request: {
                    isLoading: false,
                    isLoaded: true,
                    isSuccess: false
                }
            };
        }
        // Request sent --- waiting for response
        case constant.LOCATION_WEATHER_DATA_REQUEST_LOAD: {
            return {
                ...state,
                addLocation: {
                    value: state.addLocation.value,
                    isDisabled: true
                },
                request: {
                    isLoading: true,
                    isLoaded: false,
                    isSuccess: false
                }
            };
        }

        case constant.ADD_LOCATION_VALUE_UPDATE: {
            return {
                ...state,
                addLocation: {
                    value: action.payload,
                    isDisabled: false
                }
            }
        }

        default: {
            return state;
        }

    }
};

export default locations;