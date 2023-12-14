import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ServiceItem from './ServiceItem'

class ServiceList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      services: []
    }
  }

  _displayDetailForFilm = (idService) => {
    this.props.navigation.navigate('ServiceDetail', {idService: idService})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.services}
          extraData={this.props.votesServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <ServiceItem
              service={item}
              //isFilmFavorite={(this.props.favoritesFilm.findIndex(service => service.id === item.id) !== -1) ? true : false} // Bonus pour différencier les services déjà présent dans notre state global et qui n'ont donc pas besoin d'être récupérés depuis l'API
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              this.props.loadFilms()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})


export default ServiceList
