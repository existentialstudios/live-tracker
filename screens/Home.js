import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import * as TaskMan from 'expo-task-manager';
import { useSelector } from 'react-redux';

const LOC_TASK_NAME = 'LOC_TASK_NAME';
let foregroundSubscription = null;

TaskMan.defineTask(LOC_TASK_NAME, async ({ data, error }) => {
	if (error) {
		console.error(error);
		return;
	}
	if (data) {
		const { locations } = data;
		const location = locations[0];
		if (location) {
			console.log('Location in background', location.coords);
		}
	}
});

const Home = ({ navigation }) => {
	const [pos, setPos] = useState(null);

	const latLon = useSelector((state) => state.latLon);

	const pressHandler = () => {
		navigation.navigate('Map', {
			lat: pos?.latitude,
			lon: pos?.longitude,
		});
	};

	useEffect(() => {
		const requestPermissions = async () => {
			const foreground = await Location.requestForegroundPermissionsAsync();
			if (foreground.granted) {
				await Location.requestBackgroundPermissionsAsync();
			}
		};
		requestPermissions();
	}, []);

	const startForegroundUpdate = async () => {
		const { granted } = await Location.requestForegroundPermissionsAsync();
		if (!granted) {
			console.log('Location permissions denied.');
			return;
		}

		foregroundSubscription?.remove();

		foregroundSubscription = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.BestForNavigation,
			},
			(location) => {
				setPos(location.coords);
				navigation.setParams({
					lat: pos?.latitude,
					lon: pos?.longitude,
				});
			},
		);
	};

	const stopForegroundUpdate = () => {
		foregroundSubscription?.remove();
		setPos(null);
	};

	const startBackgroundUpdate = async () => {
		const { granted } = await Location.requestBackgroundPermissionsAsync();
		if (!granted) {
			console.log('Location permissions denied.');
			return;
		}

		const isTaskDefined = await TaskMan.isTaskDefined(LOC_TASK_NAME);
		if (!isTaskDefined) {
			console.log("Task isn't defined.");
			return;
		}

		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOC_TASK_NAME);
		if (hasStarted) {
			console.log('Already started...');
			return;
		}

		await Location.startLocationUpdatesAsync(LOC_TASK_NAME, {
			accuracy: Location.Accuracy.BestForNavigation,
			showsBackgroundLocationIndicator: true,
			foregroundService: {
				notificationTitle: 'Location',
				notificationBody: 'Tracking location in background.',
				notificationColor: '#333333',
			},
		});
	};
	const stopBackgroundUpdate = async () => {
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOC_TASK_NAME);
		if (hasStarted) {
			await Location.stopLocationUpdatesAsync(LOC_TASK_NAME);
			console.log('Location tracking stopped');
		}
	};

	return (
		<View style={styles.container}>
			<Text>Longitude: {pos?.longitude}</Text>
			<Text>Latitude: {pos?.latitude}</Text>
			<View style={styles.separator} />
			<Button onPress={startForegroundUpdate} title="Start in foreground" color="green" />
			<View style={styles.separator} />
			<Button onPress={stopForegroundUpdate} title="Stop in foreground" color="red" />
			<View style={styles.separator} />
			<Button onPress={startBackgroundUpdate} title="Start in background" color="green" />
			<View style={styles.separator} />
			<Button onPress={stopBackgroundUpdate} title="Stop in background" color="red" />
			<View style={styles.separator} />
			<View style={styles.separator} />
			<View style={styles.separator} />
			<View style={styles.separator} />
			<Button title="Go To Map" color="black" onPress={pressHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	switchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	button: {
		marginTop: 15,
	},
	separator: {
		marginVertical: 8,
	},
});

export default Home;
