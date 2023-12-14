import React from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';

function FilmItem(props){
  const film = props.film
  return (
      <View style={styles.main_container}>
        <View style={{ flex: 3 }}>
          <Image style={styles.image} source={{uri : "https://image.tmdb.org/t/p/w500" + film.poster_path}} />
        </View>
        <View style={ styles.sub_container}>
          <View style={ styles.header_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <View style ={ styles.vote_container}>
              <Text style={styles.vote_text}>{film.vote_average}</Text>
            </View>
          </View>
          <View style={ styles.description_container}>
            <Text style={styles.description_text} numberOfLines={5} >{film.overview}</Text>
          </View>
          <View style={ styles.date_container}>
            <Text style={styles.date_text}>{film.release_date}</Text>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    flex: 1,
    height: 190,
  },
  image: {
    flex : 1,
    width: 120,
    height: 180,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  sub_container: {
    flexDirection: 'column',
    flex: 7,
    backgroundColor: 'white'
  },
  header_container: {
    flex: 3,
    marginTop: 5,
    flexDirection: 'row',
  },
  title_text: {
  fontSize: 20,
  fontWeight: 'bold',
  flex: 7,
  flexWrap: 'wrap',
  paddingLeft: 5,
  backgroundColor: 'white'
  },
  vote_container:{
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
  },
  vote_text: {
  flexWrap: 'wrap',
  fontSize: 18,
  fontWeight: 'bold',
  },
  description_container:{
    flex: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'white'
  },
  description_text:{
    flexWrap: 'wrap',
    paddingLeft: 5,
    color: 'grey'
  },
  date_container:{
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 5,
    backgroundColor: 'white'
  },
  date_text:{
    flexWrap: 'wrap',
    textAlign: 'right',
    fontSize: 18,
    paddingRight: 5
  }

})

export default FilmItem
