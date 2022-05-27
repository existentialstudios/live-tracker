import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Map from '../screens/Map';

const Stack = createStackNavigator();

const MyStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: 'red',
				},
				headerTintColor: 'white',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen name="Home" component={Home} />

			<Stack.Screen name="Map" component={Map} />
		</Stack.Navigator>
	);
};

export default MyStack;
