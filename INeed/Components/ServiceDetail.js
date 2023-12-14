import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Alert, Platform, Button } from 'react-native'
import { getServiceDetailFromApi } from '../API/API'
import { getObjectTradFromApi } from '../API/Translate_API'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import EnlargeShrink from '../Animations/EnlargeShrink'

class ServiceDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state
      if (params.service != undefined && Platform.OS === 'ios') {
        return {
            headerRight: <TouchableOpacity
                            style={styles.share_touchable_headerrightbutton}
                            onPress={() => params.shareFilm()}>
                            <Image
                              style={styles.share_image}
                              source={require('../Images/ic_share.ios.png')} />
                          </TouchableOpacity>
        }
      }
  }

  constructor(props) {
    super(props)
    this.state = {
      service: undefined,
      isLoading: false
  }

    this._clickPlus = this._clickPlus.bind(this)
    this._clickMoins = this._clickMoins.bind(this)
    this._shareFilm = this._shareFilm.bind(this)
  }

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      service: this.state.service,
    })
  }

  componentDidMount() {
    const idService = this.props.route.params.idService
    const voteServiceindex = this.props.votesServices.findIndex(item => item.id === idService)
    if (voteServiceindex !== -1) {
      this.setState({
        service: this.props.votesServices[voteServiceindex]
      }, () => { this._updateNavigationParams() })
      return
    }
    this.setState({ isLoading: true })
    getServiceDetailFromApi(idService).then(data => {
      getObjectTradFromApi(["title","description"],data.service,this.props.language).then(() =>
      this.setState({
        service: data.service,
        isLoading: false
      }, () => { this._updateNavigationParams() })).catch(() =>
      this.setState({
        service: data.service,
        isLoading: false
      }, () => { this._updateNavigationParams() }))
    });
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _clickPlus() {
    const action = { type: "ADD_PLUS", value: this.state.service }
    this.props.dispatch(action)
  }
  _clickMoins() {
    const action = { type: "ADD_MINUS", value: this.state.service }
    this.props.dispatch(action)
  }

  _displayPlusImage() {
    var sourcePlusImage = require('../Images/ic_plus.png')
    var voteServiceIndex = this.props.votesServices.findIndex(item => item[0] === this.state.service.id)
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
    var voteServiceIndex = this.props.votesServices.findIndex(item => item[0] === this.state.service.id)
    if (voteServiceIndex !== -1) {
      if (this.props.votesServices[voteServiceIndex][1] == -1){
      sourceMoinsImage = require('../Images/ic_moins_valide.png')
      }
    }
    return (
        <Image style={styles.vote_button_moins} source={sourceMoinsImage} />
    )
  }

  _displayFilm() {
    const { service } = this.state
    const { trad } = this.props
    if (service != undefined && trad != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image style={styles.image} source={{uri : service.logo}} />
          <View style={styles.vote_button_container}>
          <TouchableOpacity onPress={() => this._clickPlus()}>
            {this._displayPlusImage()}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._clickMoins()}>
            {this._displayMinusImage()}
          </TouchableOpacity>
          </View>
          <Text style={styles.title_text}>{service.title}</Text>
          <Text style={styles.description_text}>{service.description}</Text>
        </ScrollView>
      )
    }
  }

  //<Text style={styles.default_text}>{trad.releaseStr + " " + moment(new Date(service.release_date)).format('DD/MM/YYYY')}</Text>
  //<Text style={styles.default_text}>{trad.noteStr + " " + service.vote_average} / 10</Text>
  //<Text style={styles.default_text}>{trad.numberOfVoteStr + " " + service.vote_count}</Text>
  //<Text style={styles.default_text}>{trad.budgetStr + " " + numeral(service.budget).format('0,0[.]00 $')}</Text>
  //<TouchableOpacity
  //    style={styles.favorite_container}
  //    onPress={() => this._toggleFavorite()}>
  //    {this._displayFavoriteImage()}
  //</TouchableOpacity>
  _shareFilm() {
    const { service } = this.state
    Share.share({ title: service.title, message: service.description })
  }

  _displayFloatingActionButton() {
    const { service } = this.state
    if (service != undefined && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../Images/ic_share.android.png')} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center',
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  },
  share_image: {
    width: 30,
    height: 30
  },
  vote_button_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    language: state.language,
    trad: state.trad
  }
}

export default connect(mapStateToProps)(ServiceDetail)
