import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { AnimatedRegion, Animated, Marker } from 'react-native-maps';

const Map = ({ route, navigation }) => {
	const { lat, lon } = route.params;

	const [region, setRegion] = useState({
		latitude: lat,
		longitude: lon,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	});

	return (
		<View style={styles.container}>
			<View style={styles.coordBox}>
				<Text>Latitude: {lat}</Text>
				<Text>Longitude: {lon}</Text>
			</View>
			<MapView style={{ height: '80%', width: '100%' }} region={region}>
				<Marker coordinate={{ latitude: lat, longitude: lon }} />
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 24,
	},

	coordBox: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		marginBottom: 20,
	},
});

export default Map;
