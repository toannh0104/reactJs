import {
    STATIONS_TEST_ACTION,

    FETCH_INIT_BEGIN,
    FETCH_INIT_SUCCESS,
    FETCH_INIT_FAILURE,
    FETCH_INIT_DISSMISS_ERROR,

    FETCH_SEARCH_RESULT_BEGIN,
    FETCH_SEARCH_RESULT_SUCCESS,
    FETCH_SEARCH_RESULT_FAILURE,
    FETCH_SEARCH_RESULT_DISMISS_ERROR

} from './constants';


let stops, stopList, stopTime, trips;

// test
export function stationsTestAction() {
    return {
        type: STATIONS_TEST_ACTION,
    };
}

// Fetch Initial Data
export function fetchInitialData() {
    return dispatch => {
        // fetch begin
        dispatch({
            type: FETCH_INIT_BEGIN
        });

        let stopsPromise = fetch('data/stops.json').then(res => {
            return res.json();
        });

        let stopListPromise = fetch('data/stop_list.json').then(res => {
            return res.json();
        });

        let stopTimePromise = fetch('data/stop_time.json').then(res => {
            return res.json();
        })

        let tripPromise = fetch('data/trips.json').then(res => {
            return res.json();
        })

        return new Promise((resolve, reject) => {
            return Promise.all([stopsPromise, stopListPromise, stopTimePromise, tripPromise])
                .then(
                    value => {
                        stops = value[0];
                        stopList = value[1];
                        stopTime = value[2];
                        trips = value[3];
                        dispatch({
                            type: FETCH_INIT_SUCCESS,
                            data: {
                                stops: value[0],
                                stopList: value[1],
                                stopTime: value[2],
                                trips: value[3]
                            }
                        });
                        resolve();
                    },
                    err => {

                        dispatch({
                            type: FETCH_INIT_FAILURE,
                            data: {
                                error: err
                            }
                        });
                        reject();
                    })
                .catch(() => {});
        });
    }
};
// dismissFetchInitError
export function dismissFetchTopicListError() {
    return {
        type: FETCH_INIT_DISSMISS_ERROR,
    };
};


// search data
export function fetchSearchData(departure, arrival, date) {
    return dispatch => {
        dispatch({
            type: FETCH_SEARCH_RESULT_BEGIN
        });
        return new Promise((resolve, reject) => {
            let departureID = [],
                arrivalID = [];
            stops.forEach(stop => {
                if (departure == stop.stop_name) {
                    departureID.push(stop.stop_id);
                } else if (arrival == stop.stop_name) {
                    arrivalID.push(stop.stop_id);
                }
            });
            let depTrips = [],
                arrTrips = [];
            stopTime.forEach(trip => {
                if (departureID.indexOf(trip.stop_id) > -1) {
                    depTrips.push(trip);
                } else if (arrivalID.indexOf(trip.stop_id) > -1) {
                    arrTrips.push(trip);
                }
            });

            depTrips.map((trip) => {
                trips.map((id) => {
                    if (id.trip_id == trip.trip_id) {
                        trip.name = id.service_id;
                    }
                });
            });
            let result = [];
            depTrips.map((trip1) => {
                arrTrips.map((trip2) => {
                    if (trip1.trip_id == trip2.trip_id && trip1.stop_sequence < trip2.stop_sequence && trip1.name.indexOf(date) > -1) {
                        var minute = trip2.arrival_time.substring(trip2.arrival_time.length - 5, trip2.arrival_time.length - 3) - trip1.departure_time.substring(trip1.departure_time.length - 5, trip1.departure_time.length - 3);
                        var hour = trip2.arrival_time.substring(0, trip2.arrival_time.length - 6) - trip1.departure_time.substring(0, trip1.departure_time.length - 6);
                        if (minute <= 0) {
                            hour = hour - 1;
                            minute = minute + 60;
                        }
                        var duration = hour + 'h-' + minute + 'm';
                        result.push({
                            departure_time: trip1.departure_time.substring(0, trip1.departure_time.length - 3),
                            arrival_time: trip2.arrival_time.substring(0, trip2.arrival_time.length - 3),
                            name: trip1.name,
                            id: trip1.trip_id,
                            duration: duration
                        });
                    }
                });
            });

            dispatch({
                type: FETCH_SEARCH_RESULT_SUCCESS,
                data: result
            });
            console.log(result);
            resolve();
        }, (err) => {
            dispatch({
                type: FETCH_SEARCH_RESULT_FAILURE,
                error: err
            });
            reject();
        }).catch((err) => {
            console.log(err);
        })
    }
}