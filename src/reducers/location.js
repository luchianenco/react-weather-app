import * as constant from '../constants/location';

const initialState = {
    locations: [],
    addLocation: {
        value: '',
        isDisabled: false
    },
    forecast5days: {
        data: null,
        request: {
            isLoading: false,
            isLoaded: false,
            isSuccess: false
        }
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
        // Add New Location Input Value
        case constant.ADD_LOCATION_VALUE_UPDATE: {
            return {
                ...state,
                addLocation: {
                    value: action.payload,
                    isDisabled: false
                }
            }
        }
        // Data Forecast Success
        case constant.LOCATION_FORECAST_DATA_REQUEST_SUCCESS: {
            return {
                ...state,
                forecast5days: {
                    data: action.payload,
                    request: {
                        isLoading: false,
                        isLoaded: true,
                        isSuccess: true
                    }
                }
            };
        }

        default: {
            return state;
        }

    }
};

export default locations;