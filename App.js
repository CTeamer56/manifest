/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text, Button, Footer, FooterTab, Icon, Content } from 'native-base';
// import { Platform, StatusBar, StyleSheet, View , TouchableOpacity, PushNotificationIOS } from 'react-native';
// import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
// import axios from 'axios';
// import PlaidScreen from './screens/PlaidScreen';
// import SignupScreen from './screens/SignupScreen';
// import LoginScreen from './screens/LoginScreen';
// import HomeScreen from './screens/HomeScreen';
// import PushNotification from 'react-native-push-notification';
// import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET } from './app.config.json';
// import Geolocation from 'react-native-geolocation-service';
import AppContainer from './navigation/AppNavigator.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isAuthenticated: false,
      latitude: null,
      longitude: null,
      auth0_id: null,
      picture: null,
      name: null,
    };
  }

  async componentDidMount() {
    // GET LOCATION PERMISSIONS:
    async function getLocationAsync() {
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        return navigator.geolocation.watchPosition(
          position => {
            console.log(position);
          },
          err => console.error(err),
          { timeout: 2000, maximumAge: 2000, enableHighAccuracy: true, distanceFilter: 1 }
        );
      }
      throw new Error('Location permission not granted');
    }

    // setInterval(() => {
    navigator.geolocation.watchPosition(
      position => {
        console.log('position outside of permissions', position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // fetch(`https://api.foursquare.com/v2/venues/search?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&ll=${latitude},${longitude}&intent=checkin&radius=60&categoryId=4bf58dd8d48988d1e0931735&v=20190425`)
        //   .then(result => {
        //     console.log('get location result from front:', result);
        //     return result.json();
        //   })
        //   .then(response => {
        //     console.log('response:', response);
        //   })
        //   .catch(err => {
        //     console.log('get location error from front:', err);
        //   })
        // PushNotificationIOS.presentLocalNotification({alertBody: 'but does it work?'});
      },
      err => console.error(err),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000, distanceFilter: 0 }
    );
    // }, 20000);

    getLocationAsync();
    // WATCH CURRENT POSITION:
    this.setState({ isReady: true });
  }

  render() {
    const { latitude } = this.state;

    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container>
        <DrawerNavigator latitude={latitude} />
      </Container>
    );
  }
}


// class LoginScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Login />
//         <TouchableOpacity onPress={this.props.navigation.openDrawer}>
//           <Text>Open Menu</Text>
//         </TouchableOpacity>
//         <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Login</Text>
//       
//       </View>
//     );
//   }
// }

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    PlaidLink: PlaidScreen,
    Login: LoginScreen,
    Signup: SignupScreenContainer(),
  },
  {
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#49d5b6',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#49d5b6',
    },
  }
);

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

export default createAppContainer(DrawerNavigator);
