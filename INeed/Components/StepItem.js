//Components/StepItem.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'

class StepItem extends React.components{

  render() {
    const { step, displayDetailForStep } = this.props
    return (

      <TouchableOpacity
        style={styles.main_container}
        onPress={() => displayDetailForStep(step.id)}>//create a displayDetailForStep function once the navigation frame is created
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{step.title}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{step.overview}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  content_container: {
    flex: 1,
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
    paddingRight: 5
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  }
})

export default StepItem
