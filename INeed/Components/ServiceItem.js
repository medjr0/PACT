import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FadeIn from '../Animations/FadeIn'
import { connect } from 'react-redux'
import {getObjectTradFromApi} from '../API/Translate_API'

class ServiceItem extends React.Component {

  constructor(props) {
    super(props)
    this._clickPlus = this._clickPlus.bind(this)
    this._clickMoins = this._clickMoins.bind(this)
  }

  _updateNavigationParams() {
  }

  componentDidMount() {
    const idService = this.props.service.id
    const voteServiceindex = this.props.votesServices.findIndex(item => item.id === idService)
    if (voteServiceindex !== -1) {
      this.setState({
        service: this.props.votesServices[voteServiceindex]
      }, () => { this._updateNavigationParams() })
      return
    }
    this.setState({ isLoading: true })
    var data = this.props.service
    getObjectTradFromApi(["title"],data,this.props.language).then(() =>
    this.setState({
      service: data,
      isLoading: false
    }, () => { this._updateNavigationParams() })).catch(() =>
      this.setState({
      service: data,
      isLoading: false
    }, () => { this._updateNavigationParams() }));
}


  _displayPlusImage() {
    var sourcePlusImage = require('../Images/ic_plus.png')
    var voteServiceIndex = this.props.votesServices.findIndex(item => item[0] === this.props.service.id)
    if (voteServiceIndex !== -1) {
      if (this.props.votesServices[voteServiceIndex][1] == 1){
      sourcePlusImage = require('../Images/ic_plus_valide.png')
      }
    }
    return (
      <Image style={styles.vote_button_plus} source={sourcePlusImage} />
    )
  }
  _displayMinusImage() {
    var sourceMoinsImage = require('../Images/ic_moins.png')
    var voteServiceIndex = this.props.votesServices.findIndex(item => item[0] === this.props.service.id)
    if (voteServiceIndex !== -1) {
      if (this.props.votesServices[voteServiceIndex][1] == -1){
      sourceMoinsImage = require('../Images/ic_moins_valide.png')
      }
    }
    return (
        <Image style={styles.vote_button_moins} source={sourceMoinsImage} />
    )
  }

  _clickPlus() {
    const action = { type: "ADD_PLUS", value: this.props.service }
    this.props.dispatch(action)
  }
  _clickMoins() {
    const action = { type: "ADD_MINUS", value: this.props.service }
    this.props.dispatch(action)
  }

  render() {
    const { service, displayDetailForFilm } = this.props
    return (
      <FadeIn>
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForFilm(service.id)}>
        <View style={styles.vote_button_container}>
        <TouchableOpacity onPress={() => this._clickPlus()}>
          {this._displayPlusImage()}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._clickMoins()}>
          {this._displayMinusImage()}
        </TouchableOpacity>
        </View>
        <View style={styles.viewImage}>
        <Image style={styles.image} source={{uri : service.logo}} />
        </View>
        <View style={styles.header_container}>
            <Text style={styles.title_text}>{service.title}</Text>
        </View>
      </TouchableOpacity>
      </FadeIn>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    alignItems: 'center'
  },
  viewImage: {
    flex: 1
  },
  image: {
    height: 100,
    width: 100,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  vote_button_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  vote_button_plus: {
    width: 50,
    height: 50,
  },
  vote_button_moins: {
    width: 50,
    height: 10,
  }
})

const mapStateToProps = (state) => {
  return {
    votesServices: state.votesServices,
    trad: state.trad,
    language: state.language
  }
}

export default connect(mapStateToProps)(ServiceItem)
