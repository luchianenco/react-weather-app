import * as constant from '../constants/location';

const URL_5DAYS = constant.API_BASE_URL + 'forecast?APPID=3fb5a1e446cb5c25b0824df71acb020b&units=metric&q=__LOCNAME__';
const URL_16DAYS = constant.API_BASE_URL + 'forecast/daily?cnt=16&APPID=3fb5a1e446cb5c25b0824df71acb020b&units=metric&q=__LOCNAME__';

export function clearForecastData() {
    return {
        type: constant.LOCATION_FORECAST_CLEAR
    }
}

export function getLocationForecast(location, duration = constant.LOCATION_FORECAST_DURATION_5DAYS) {
    return dispatch => {
        dispatch(requestLoad(duration));
        fetchWeatherForecast(location, duration)
            .then(res => {
                return convertWeatherForecast(location, res);
            }).then(data => {
            dispatch(requestSuccess(duration, data));
        }).catch(err => {
            console.log(err);
            dispatch(requestError(duration));
        });
    }
}

function fetchWeatherForecast(location, duration) {
    const url = duration === constant.LOCATION_FORECAST_DURATION_16DAYS ? URL_16DAYS : URL_5DAYS;

    return fetch(url.replace('__LOCNAME__', location))
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

function requestLoad(duration) {
    const type = duration === constant.LOCATION_FORECAST_DURATION_5DAYS
        ? constant.LOCATION_FORECAST_5DAYS_DATA_REQUEST_LOAD
        : constant.LOCATION_FORECAST_16DAYS_DATA_REQUEST_LOAD
    ;

    return {
        type,
    };
}

function requestSuccess(duration, data) {
    const type = duration === constant.LOCATION_FORECAST_DURATION_5DAYS
        ? constant.LOCATION_FORECAST_5DAYS_DATA_REQUEST_SUCCESS
        : constant.LOCATION_FORECAST_16DAYS_DATA_REQUEST_SUCCESS
    ;
    return {
        type,
        payload: data
    };
}

function requestError(duration) {
    const type = duration === constant.LOCATION_FORECAST_DURATION_5DAYS
        ? constant.LOCATION_FORECAST_5DAYS_DATA_REQUEST_ERROR
        : constant.LOCATION_FORECAST_16DAYS_DATA_REQUEST_ERROR
    ;
    return {
        type
    };
}


