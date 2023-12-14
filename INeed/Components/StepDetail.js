//Components/StepDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

class DetailItem extends React.components {

  constructor(props){
    super(props)
    this.state = {
      step : undefined, //In step there is a field: title, description, residence_permit and enable_work
      isLoading : false,
      isCompleted : false
    }
  }

  _displayLoading(){
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _displayStep() {
    const { step } = this.state
    if (step != undefined) {
      return (
        <ScrollView style = {styles.scrollview_container}>
          <Text style = {styles.step_title}>{step.title}</Text>
          <Text style = {styles.step_description}>{step.description}</Text>
          <Text style = {styles.default_text}>Titre de séjour actif : {step.residence_permit}</Text>
          <Text style = {styles.default_text}>Puis-je travailler : {step.enable_work}</Text>
        </ScrollView>
      )
    }
  }

  render(){
    return(
      <View style = {styles.main_container}>
        {this._displayLoading()}
        {this._displayStep()}
      </View>
    )
  }
}

  const styles = StyleSheet.create({
    main_container : {
      flex : 1
    },
    loading_container : {
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
    step_title: {
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
    step_description: {
      fontStyle: 'italic',
      color: '#666666',
      margin: 5,
      marginBottom: 15
    },
    default_text : {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
    }
  })

export default StepDetail
