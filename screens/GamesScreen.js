import React, { Component } from 'react';
import axios from 'axios';
import { storeData, retrieveData } from '../assets/helpers/AsyncStorage';

export default class GamesScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      games: null,
      userToken: retrieveData('userToken'),
    };

    this.getGames();
  }

  async getGames() {
    try {
      const value = await retrieveData('games');
      if (value) {
        this.setState({
          games: value,
        });
      }
    } catch (err) {
      const { userToken } = this.state;
      axios.get(`games/${userToken}`).then(response => {
        this.setState({
          games: response.data,
        });
        storeData('games', response.data);
      });
    }
  }

  return () {
    return (
      // <Button onClick={ this.props.navigation.navigate('DK') }>
    );
  }
};
