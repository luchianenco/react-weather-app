import * as constant from '../constants/location';

const URL = constant.API_BASE_URL + 'forecast?APPID=3fb5a1e446cb5c25b0824df71acb020b&units=metric&q=__LOCNAME__';

export function getLocationForecast(location) {
    return dispatch => {
        dispatch(requestLoad());
        fetchWeatherForecast(location)
            .then(res => {
                return convertWeatherForecast(location, res);
            }).then(data => {
            dispatch(requestSuccess(data));
        }).catch(err => {
            console.log(err);
            dispatch(requestError());
        });
    }
}

function fetchWeatherForecast(location) {
    return fetch(URL.replace('__LOCNAME__', location))
        .then(res => {
            if (! res.ok) {
                return null;
            }
            return res.json();
        })
        .then(json => {
            return json;
        })
        .catch(err => {
            console.log(err);
        })
}

function convertWeatherForecast(loc, res)
{
    try {
        return {
            id: res.city.id,
            name: res.city.name,
            list: res.list
        };

    } catch (err) {
        throw new Error('Invalid data provided');
    }
}

function requestLoad() {
    return {
        type: constant.LOCATION_FORECAST_DATA_REQUEST_LOAD,
    };
}

function requestSuccess(data) {
    return {
        type: constant.LOCATION_FORECAST_DATA_REQUEST_SUCCESS,
        payload: data
    };
}

function requestError() {
    return {
        type: constant.LOCATION_FORECAST_DATA_REQUEST_ERROR
    };
}
