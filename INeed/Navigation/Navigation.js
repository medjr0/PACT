import {React,useEffect} from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import FilmDetail from '../Components2/FilmDetail';
//import Favorites from '../Components2/Favorites';
//import Search from '../Components2/Search';
import Services from '../Components/Services';
import ServiceDetail from '../Components/ServiceDetail';
import Settings from '../Components/Settings';
import { connect } from 'react-redux'


//const SearchStackNavigator = createStackNavigator();
//const FavoritesStackNavigator = createStackNavigator();
const ServicesStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();

function MyServicesStackNavigator(props) {
  console.log(props)
  return (
    <ServicesStackNavigator.Navigator>
      <ServicesStackNavigator.Screen name="Services" component={Services} options = {{headerShown: false}}/>
      <ServicesStackNavigator.Screen name="ServiceDetail" component={ServiceDetail} options = {{headerShown: false}} />
    </ServicesStackNavigator.Navigator>
  );
}

function MySettingsStackNavigator() {
  return (
    <SettingsStackNavigator.Navigator>
      <SettingsStackNavigator.Screen name="Settings" component={Settings} options = {{headerShown: false}}  />
    </SettingsStackNavigator.Navigator>
  );
}

//function MySearchStackNavigator() {
//  return (
//    <SearchStackNavigator.Navigator>
//      <SearchStackNavigator.Screen name="Search" component={Search} />
//      <SearchStackNavigator.Screen name="FilmDetail" component={FilmDetail} />
//    </SearchStackNavigator.Navigator>
//  );
//}

//function MyFavoritesStackNavigator() {
//  return (
//    <FavoritesStackNavigator.Navigator>
//      <FavoritesStackNavigator.Screen name="Favoris" component={Favorites} />
//      <FavoritesStackNavigator.Screen name="FilmDetail" component={FilmDetail} />
//    </FavoritesStackNavigator.Navigator>
//  );
//}

const Drawer = createDrawerNavigator();

function MyDrawerNavigator(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Paramètres"
        //drawerContent={(props) => <CustomSidebarMenu {...props} />}
        screenOptions={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => {
            let iconSource = require('../Images/ic_favorite.png');
            switch (route.name) {
              case "Me Loger":
                iconSource = require('../Images/meLoger.png');
              break;
              case "Aide Administrative":
                iconSource = require('../Images/aideAdministrative.png');
              break;
              case "Apprendre le Français":
                iconSource = require('../Images/apprendreLeFrancais.png');
              break;
              case "Santé":
                iconSource = require('../Images/sante.png');
              break;
              case "Loisirs":
                iconSource = require('../Images/loisirs.png');
              break;
              case "Formation Professionnelle":
                iconSource = require('../Images/formationProfessionnelle.png');
              break;
              case "Traduction":
                iconSource = require('../Images/traduction.png');
              break;
              case "Paramètres":
                iconSource = require('../Images/parametres.png');
              break;
              default:
                iconSource = require('../Images/ic_favorite.png');
            }
            return <Image source={iconSource} style = {styles.iconDrawer} />;
          },
          activeBackgroundColor: '#DDDDDD',
          inactiveBackgroundColor: '#FFFFFF',
          showTitle: false,
          showIcon: true,
          title: '',
          headerTitle: ({ focused, color, size }) => {
            let iconSource = require('../Images/ic_favorite.png');
            switch (route.name) {
              case "Me Loger":
                iconSource = require('../Images/meLoger.png');
              break;
              case "Aide Administrative":
                iconSource = require('../Images/aideAdministrative.png');
              break;
              case "Apprendre le Français":
                iconSource = require('../Images/apprendreLeFrancais.png');
              break;
              case "Santé":
                iconSource = require('../Images/sante.png');
              break;
              case "Loisirs":
                iconSource = require('../Images/loisirs.png');
              break;
              case "Formation Professionnelle":
                iconSource = require('../Images/formationProfessionnelle.png');
              break;
              case "Traduction":
                iconSource = require('../Images/traduction.png');
              break;
              case "Paramètres":
                iconSource = require('../Images/parametres.png');
              break;
              default:
                iconSource = require('../Images/ic_favorite.png');
            }
            return <Image source={iconSource} style = {styles.iconHeader} />;
          }
        })}>
        <Drawer.Screen
          name="Me Loger"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name="Aide Administrative"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name="Apprendre le Français"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name="Santé"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name="Loisirs"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name = "Formation Professionnelle"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name="Traduction"
          component={MyServicesStackNavigator}
        />
        <Drawer.Screen
          name="Paramètres"
          component={MySettingsStackNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

//        <Drawer.Screen
//          name="Rechercher"
//          component={MySearchStackNavigator}
//        />
//        <Drawer.Screen
//          name="Mes Favoris"
//          component={MyFavoritesStackNavigator}
//        />


const styles = StyleSheet.create({
  iconDrawer: {
    width: 60,
    height: 60,
  },
  iconHeader: {
    width: 30,
    height: 30,
  }
});

const mapStateToProps = (state) => {
  return {
    trad: state.trad
  }
}

export default connect(mapStateToProps)(MyDrawerNavigator)
