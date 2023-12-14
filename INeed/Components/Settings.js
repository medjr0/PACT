import SelectDropdown from 'react-native-select-dropdown';
import React from 'react';
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { getObjectTradFromApi } from '../API/Translate_API'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isChoosed: false,
      language: "fr",
      trad : { barSearch: "Nom du Service",
               search : "rechercher",
               releaseStr: "Sorti le :",
               noteStr: "Note :",
               numberOfVoteStr: "Nombre de votes :",
               budgetStr: "Budget :",
               genreStr: "Genre :",
               companieStr: "Companie :",
               formationPro: "Formation Professionnelle"
    }
  }
  this._changeLanguage = this._changeLanguage.bind(this)
}

_changeLanguage(newLanguage){
  var data = this.state.trad
  const action = {type: "CHANGE_LANGUAGE", value: { data: data, language: newLanguage}}
    getObjectTradFromApi(["barSearch","search","releaseStr","noteStr","numberOfVoteStr","budgetStr","genreStr","companieStr","formationPro"],data,newLanguage).then(() =>
      this.setState({ language : newLanguage}),
      action.value.data = data ,
      this.props.dispatch(action), () => { this._updateNavigationParams()
      }).catch(() =>
        action.value.language = "fr",
        this.props.dispatch(action), () => { this._updateNavigationParams() })
    if(!this.state.isChoosed) { 
      this.setState({isChoosed : true
      }, () => {  this.props.navigation.navigate("Me Loger")});}
}

_updateNavigationParams() {
  this.props.navigation.setParams({
    language: this.language,
    trad : this.trad
  })
}

  render() {
    const langs_value = ["af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","ny","zh-cn","zh-tw","co","hr","cs","da","nl","en","eo","et","tl","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","iw","hi","hmn","hu","is","ig","id","ga","it","ja","jw","kn","kk","km","ko","ku","ky","lo","la","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ps","fa","pl","pt","ma","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tg","ta","te","th","tr","uk","ur","ug","uz","vi","cy","xh","yi","yo","zu"
    ];
    const langs = [
        "Afrikaans",
        "Albanian",
        "Amharic",
        "Arabic",
        "Armenian",
        "Azerbaijani",
        "Basque",
        "Belarusian",
        "Bengali",
        "Bosnian",
        "Bulgarian",
        "Catalan",
        "Cebuano",
        "Chichewa",
        "Chinese Simplified",
        "Chinese Traditional",
        "Corsican",
        "Croatian",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Esperanto",
        "Estonian",
        "Filipino",
        "Finnish",
        "French",
        "Frisian",
        "Galician",
        "Georgian",
        "German",
        "Greek",
        "Gujarati",
        "Haitian Creole",
        "Hausa",
        "Hawaiian",
        "Hebrew",
        "Hindi",
        "Hmong",
        "Hungarian",
        "Icelandic",
        "Igbo",
        "Indonesian",
        "Irish",
        "Italian",
        "Japanese",
        "Javanese",
        "Kannada",
        "Kazakh",
        "Khmer",
        "Korean",
        "Kurdish (Kurmanji)",
        "Kyrgyz",
        "Lao",
        "Latin",
        "Latvian",
        "Lithuanian",
        "Luxembourgish",
        "Macedonian",
        "Malagasy",
        "Malay",
        "Malayalam",
        "Maltese",
        "Maori",
        "Marathi",
        "Mongolian",
        "Myanmar (Burmese)",
        "Nepali","Norwegian",
        "Pashto",
        "Persian",
        "Polish",
        "Portuguese",
        "Punjabi",
        "Romanian",
        "Russian",
        "Samoan",
        "Scots Gaelic",
        "Serbian",
        "Sesotho",
        "Shona",
        "Sindhi",
        "Sinhala",
        "Slovak",
        "Slovenian",
        "Somali",
        "Spanish",
        "Sundanese",
        "Swahili",
        "Swedish",
        "Tajik",
        "Tamil",
        "Telugu",
        "Thai",
        "Turkish",
        "Ukrainian",
        "Urdu",
        "Uyghur",
        "Uzbek",
        "Vietnamese",
        "Welsh",
        "Xhosa",
        "Yiddish",
        "Yoruba",
        "Zulu"
    ];
    const langsInLang = [
      "Afrikaans",
      "Shqip / Shqiptar", //à vérifier = albanais
      "ኣማርኛ", //AMHARIQUE
      "	اللغة العربية", //ARABE
      "Արեւմտահայերէն", //Arménien (occidental)
      "Azərbaycanca", //Azerbaijani
      "Euskara", //BASQUE
      "Беларуская", //Biélorusse
      "বাংলা", //BENGALI
      "Босански", //Bosnien
      "български език", //Bulgare
      "Català", //CATALAN
      "Sinugboanon", //Cebuano
      "Chicheŵa", //CHICHEWA
      "中文",//Chinois simplifié
      "國語", //Chinois traditionnel
      "Corsu", //CORSE
      "Hrvatski", //CROATE
      "Čeština", //Tchèque
      "Dansk", //Danois
      "Nederlands", //Néerlandais
      "English",
      "Esperanto",
      "Eesti", //ESTONIEN
      "Filipino", //Filipino/Tagalog?
      "Suomi", //FINNOIS
      "Français",
      "Frysk", //FRISON
      "Galego", //GALICIEN
      "ქართული", //Georgien
      "Deutsch", //ALLEMAND
      "Ελληνικά", //GREC
      "ગુજરાતી", //GUJARATI
      "Kreyòl Ayisyen", //Créole haïtien
      "	حَوْسَ", //HAOUSSA
      "ʻōlelo Hawaiʻi", //Hawaiianien
      "	עברית", //Hébreux
      "हिन्दी", //HINDI
      "Tiếng H'Mông", //Hmong en VIETNAMIEN
      "Magyar", //HONGROIS
      "Íslenska", //Islandais
      "Asụsụ Igbo", //IGBO
      "Bahasa Indonesia", //Indonésien
      "Irlande	Gaeilge", //Gaélique IRLANDAIS
      "Italiano", //Italien
      "日本語", //JAPONAIS
      "Basa Jawa", //Javanais
      "ಕನ್ನಡ", //KANNADA
      "Қазақ Tілі", //Kazhaque
      "ភាសាខ្មែរ", //KHMER
      "조선말", //Coréen (du sud)
      "Kurdí", //KURDE
      "Кыргыз тили", //Kirghize
      "ພາສາລາວ", //LAO
      "Latina lingua", //LATIN
      "Latviešu", //LETTON
      "Lietuvių", //LITUANIEN
      "Lèmburgs", //LUXEMBOURGEOIS
      "Mакедонски", //Macédonien
      "fiteny malagasy", //Malgache
      "Bahasa Melayu", //MALAIS
      "മലയാളം", //MALAYALAM
      "Malti", //Maltais
      "te Reo Māori", //MAORI
      "मराठी", //Marathi
      "Монгол Хэл", //Mongole
      "မြန်မာဘာသာစကား", //Birman
      "नेपाली", //Nepali
      "Norsk", //Norvégien
      "پښتو", //Pachto
      "	فارسی / درى", //Dari (=Persan)
      "Polski", //Polonnais
      "Português", //Portuguais
      "ਪੰਜਾਬੀ", //PENDJABI
      "Română", //ROUMAIN
      "Русский", //RUSSE
      "gagana Sāmoa", //SAMOAN
      "Gàidhlig", //Gaélique écossais
      "Српски / Srpski", //SERBE
      "Sesotho",
      "Shona",
      "सिन्धी ", //Sindhi
      "සිංහල ", //Singhalais
      "Slovenčina", //SLOVAQUE
      "Slovenščina", //Slovène
      "	اللغة الصومالية / Af-Soomaali", //SOMALI
      "Español", //ESPAGNOL
      "Basa Sunda", //Soundanais
      "Kiswahili", //Swahili
      "Svenska", //Suédois
      "Тоҷикӣ", //Tadjik
      "தமிழ்", //TAMOUL
      "తెలుగు", //Télougou
      "ภาษาไทย", //Thaï
      "Türkçe", //Turc
      "Українська", //UKRAINIEN
      "	ہندوستانی", //OURDOU
      "	ئۇيغۇر تىلى", //OUÏGHOUR
      "	اوزبیک / Ўзбек / Oʻzbek", //Ouzbek
      "Tiếng Việt", //VIETNAMIEN
      "Cymraeg", //GALLOIS
      "isiXhosa", //XHOSA
      "	ייִדיש", //YIDDISH
      "Yorùbá", //YORUBA
      "isiZulu" //ZOULOU
    ]; //this.props.navigation.setOptions({headerShown: false})}
    return (
      <View style={styles.main_container}>
      <SelectDropdown
        data={langsInLang}
        onSelect={(selectedItem, index) => {
          this._changeLanguage(langs_value[index]);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />
      </View>
    )
  }
  componentDidMount(){ //fix "Can't call setState on a component that is not yet mounted"}
}


}


const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  }
})

const mapStateToProps = (state) => {
  return {
    language: state.language,
    trad: state.trad
  }
}

export default connect(mapStateToProps)(Settings)
