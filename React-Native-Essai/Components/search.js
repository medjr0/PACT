import React from 'react';
import { ActivityIndicator, StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import FilmItem from '../Components/filmItem.js';
import { getFilmsFromApiWithSearchedText } from '../API/TMDB.js';

// Components/Search.js

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ''
    this.page = 0
    this.totalPages = 0
    this.state = { films: [],
    isLoading: false }
    this._loadFilms();
  }
  _loadFilms() {
      if (!this.state.isLoading){
      this.setState({isLoading: true})
      getFilmsFromApiWithSearchedText(this.searchedText,this.page + 1).then(data => {
          this.page = data.page,
          this.totalPages = data.total_pages,
          this.setState({ films:  [ ...this.state.films, ...data.results ],
                        isLoading: false
                      })

});}}

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' color='blue' />
          </View>
        )
      }
    }
  _searchTextInputChanged(text) {
   this.searchedText = text
 }
_searchFilms() {
  this.page = 0
  this.totalPages = 0
  this.setState({ films:  []
    
               }, () => {
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms()})
}
  render() {
    this._displayLoading()
    return (
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <TextInput style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()} />
          <Button style={styles.button} title='Rechercher' onPress={() => this._searchFilms()}/>
        </View>
        <FlatList
          data={this.state.films}
          renderItem={({item}) => <FilmItem film={item}/>}
          onEndReachedThreshold={3.5}
          onEndReached={() => {
          if (this.page < this.totalPages) {
          this._loadFilms()
        }}}
        />
        {this._displayLoading()}
      </View>
    )
  }
}




const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_container: {
    marginTop: 50,
    marginBottom: 5,
  },
  textinput: {
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    textAlign: 'center'
  },
  button: {
  }
})


export default Search
