import * as constant from '../constants/location';

const URL = 'http://api.openweathermap.org/data/2.5/weather?APPID=3fb5a1e446cb5c25b0824df71acb020b&units=metric&q=__LOCNAME__';

export function addLocationValueUpdate(value) {
    return {
        type: constant.ADD_LOCATION_VALUE_UPDATE,
        payload: value
    }
}

export function getLocationWeatherInfo(location) {
    return dispatch => {
        dispatch(requestLoad());
        fetchWeatherInfo(location)
            .then(res => {
                return convertWeatherData(location, res);
            }).then(data => {
                dispatch(requestSuccess(data));
            }).catch(err => {
                console.log(err);
                dispatch(requestError());
            });
    }
}

function convertWeatherData(loc, res) {
    try {
        return {
            name: loc,
            temp: Math.round(res.main.temp),
            humidity: res.main.humidity,
            pressure: res.main.pressure,
            weatherIcon: res.weather[0].icon,
            weatherDescription: res.weather[0].main,
            windSpeed: res.wind.speed,
            windDeg: res.wind.deg
        };

    } catch (err) {
        throw new Error('Invalid data provided');
    }

}

function fetchWeatherInfo(location) {
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

function requestLoad() {
    return {
        type: constant.LOCATION_WEATHER_DATA_REQUEST_LOAD,
    };
}

function requestSuccess(data) {
    return {
        type: constant.LOCATION_WEATHER_DATA_REQUEST_SUCCESS,
        payload: data
    };
}

function requestError() {
    return {
        type: constant.LOCATION_WEATHER_DATA_REQUEST_ERROR
    };
}
