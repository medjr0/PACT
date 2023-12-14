import React from 'react';
import { ActivityIndicator, StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
import ServiceItem from './ServiceItem';
import ServiceList from './ServiceList';
import { getServicesFromApiWithSearchedText } from '../API/API';
import { connect } from 'react-redux'

// Components/Search.js

class Services extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ''
    this.page = 0
    this.totalPages = 0
    this.state = { films: [],
    isLoading: false,
    }
    this._loadFilms = this._loadFilms.bind(this)
  }



  componentDidMount() {
    const idFilm = this.props.route.params.idFilm
    const voteServiceindex = this.props.votesServices.findIndex(item => item.id === idFilm)
    if (voteServiceindex !== -1) {
      this.setState({
        film: this.props.votesServices[voteServiceindex]
      }, () => { this._updateNavigationParams() })
      return
    }
    //var dataTrad = this.state.trad
    //getSearchBarTradFromApi(dataTrad,this.props.language).then(() =>
    //this.setState({
    //  trad: dataTrad
    //}, () => { this._updateNavigationParams() })).catch(() => console.log("catch !"));
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      trad : this.trad
    })
  }

  _loadFilms() {
      if (!this.state.isLoading){
      this.setState({isLoading: true})
      getServicesFromApiWithSearchedText(this.searchedText,this.page + 1).then(data => {
          this.page = data.page,
          this.totalPages = data.total_pages,
          this.setState({ films:  [ ...this.state.films, ...data.results ], isLoading: false
          })

});}}


_searchFilms() { //lance la recherche d'un film
 this.page = 0
 this.totalPages = 0
 this.setState({ films:  []})
 this._loadFilms()

}

  _displayLoading() { //affichage du chargement
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

 _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("ServiceDetail", { idFilm: idFilm })
  }

  render() {
    this._displayLoading()
    let route_index = this.props.navigation.getParent().getState().index;
    let route_name = this.props.navigation.getParent().getState().routeNames[route_index] //connaissance du type de service recherché
    return (
      <View style={styles.main_container}>
        <View style={styles.header_container}>
          <TextInput style={styles.textinput}
          placeholder={this.props.trad.barSearch}
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
          testID="input"/>
          <Button style={styles.button} title= {this.props.trad.search} onPress={() => this._searchFilms()}/>
        </View>
        <ServiceList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false}
        />
        {this._displayLoading()}
      </View>
    )
  }
  componentDidMount(){ //fix "Can't call setState on a component that is not yet mounted"
  this._loadFilms();}
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


const mapStateToProps = (state) => {
  return {
    service_type: state.service_type,
    trad: state.trad
  }
}

export default connect(mapStateToProps)(Services)
