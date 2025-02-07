/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {
  Container,
  Footer,
  FooterTab,
  Icon,
  Button,
  Text,
  Grid,
  Row,
  Col,
  Thumbnail,
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { ScreenOrientation } from 'expo';
import axios from 'axios';
import { NGROK } from '../app.config.json';
import { storeData, getData } from './helpers/asyncHelpers';

class GamesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streak: 0,
    };

    this.lockOrientation = this.lockOrientation.bind(this);
  }

  async componentWillMount() {
    this.lockOrientation();
  }

  /**
   * lockOrientation function locks orientation of phone/app to portrait upon GamesScreen will focus, this is necessary to prevent rotating after playing a game.  lockOrientation function also checks the database for the user's goal and updates AsyncStorage upon GameScreen will focus to update amount of games available should a user goal streak increase or decrease.
   */

  async lockOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);

    const auth0_id = await getData('userToken');

    axios.get(`${NGROK}/goals/${auth0_id}`).then((response) => {
      this.setState({
        streak: response.data[0].streak_days,
      });

      if (response.data[0]) {
        storeData('primaryGoal', JSON.stringify(response.data[0]));
      }
    }).catch(error => console.log(error));
  }

  render() {
    const { navigate } = this.props.navigation;
    const { streak } = this.state;

    return (
      <Container style={styles.container}>
        <View style={styles.viewport}>
          <NavigationEvents
            onWillFocus={this.lockOrientation}
          />
        <ScrollView>
          <Text style={styles.heading}>My Games</Text>

          <Grid style={{ width: 260, marginTop: 20 }}>
              <Row style={{ width: '100%', marginBottom: 10 }}>
                <Text style={styles.smallText}>Stick with your goals to unlock more games</Text>
              </Row>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <TouchableOpacity onPress={() => navigate('DK')}>
                  <Thumbnail
                    square
                    style={styles.gameImg}
                    source={require('../assets/images/DK.jpg')}
                  />
                </TouchableOpacity>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                {streak >= 8 ? 
                <TouchableOpacity onPress={() => navigate('GameTwo')}>
                  <Thumbnail
                    square
                    style={styles.gameImg}
                    source={require('../assets/images/crystal.png')}
                  />
                </TouchableOpacity>
                    : <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container> }
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                { streak >= 15 ? 
                  <TouchableOpacity onPress={() => navigate('GameThree')}>
                  <Thumbnail
                    square
                    style={styles.gameImg}
                    source={require('../assets/images/animals.png')}
                  />
                </TouchableOpacity>
                    : <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container> }
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                {streak >= 22 ? <TouchableOpacity onPress={() => navigate('GameFour')}>
                  <Thumbnail
                    square
                    style={styles.gameImg}
                    source={require('../assets/images/bubble.png')}
                  />
                </TouchableOpacity>
                    : <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container>}
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container>
              </Col>
            </Row>
            <Row style={{ width: '100%' }}>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container>
              </Col>
              <Col style={{ backgroundColor: '#fff', height: 120 }}>
                <Container style={styles.gameContainer}><Icon style={{ fontSize: 90, color: '#fff', alignSelf: 'center', marginTop: 8 }} name="md-lock" /></Container>
              </Col>
            </Row>
          </Grid>
          </ScrollView>
        </View>
        <Footer style={styles.footerbar}>
          <FooterTab style={{ backgroundColor: '#49d5b6' }}>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Stats')}>
                <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="md-stats" />
                <Text style={styles.buttonText}>Stats</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Games')}>
                <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="logo-game-controller-a" />
                <Text style={styles.buttonText}>Games</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Goals')}>
                <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="md-ribbon" />
                <Text style={styles.buttonText}>Goals</Text>
              </TouchableOpacity>
            </Button>
            <Button vertical>
              <TouchableOpacity onPress={this.props.navigation.openDrawer}>
                <Icon style={{ fontSize: 30, color: '#fff', marginLeft: 22 }} name="md-menu" />
                <Text style={styles.buttonText}>Menu</Text>
              </TouchableOpacity>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
  },
  viewport: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#49d5b6',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#49d5b6',
    marginTop: 10,
    textAlign: 'center',
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  smallText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    textAlign: 'center',
  },
  smallTextLeft: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4c4c4c',
    alignSelf: 'flex-start',
    marginLeft: 0,
  },
  smallTextGreenLeft: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#49d5b6',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  message: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  basicButton: {
    backgroundColor: '#49d5b6',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
  },
  transactionButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
  },
  saveButton: {
    backgroundColor: '#49d5b6',
    height: 40,
    alignSelf: 'flex-start',
    maxWidth: '98%',
    width: '98%',
    marginBottom: 10,
  },
  footerbar: {
    backgroundColor: '#49d5b6',
    fontWeight: 'bold',
    color: '#fff',
    paddingTop: 5,
  },
  mainImage: {
    width: 200,
    height: 200,
    backgroundColor: '#49d5b6',
    margin: 10,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#49d5b6',
  },
  gameContainer: {
    backgroundColor: '#49d5b6',
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
  },
  gameImg: {
    width: 120,
    height: 110,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default GamesScreen;
