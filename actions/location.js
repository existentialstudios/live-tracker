import { combineReducers } from 'redux';
import { UPDATE_LOC } from '../actions/location';

const updatedLoc =
	((latLon = { lat: '', lon: '' }),
	(action) => {
		switch (action.type) {
			case UPDATE_LOC:
				return { lat: action.lat, lon: action.lon };
			default:
				return latLon;
		}
	});

export default combineReducers({ latLon });
