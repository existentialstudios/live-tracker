import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import React from 'react';

class MapClass extends Component {
	constructor(props) {
		super(props);
	}

	getInitialState() {
		return {
			region: new AnimatedRegion({
				latitude: lat,
				longitude: lon,
			}),
		};
	}

	onRegionChange(region) {
		this.state.region.setValue(region);
	}
}
