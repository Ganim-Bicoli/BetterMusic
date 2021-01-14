import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import { Audio } from 'expo-av';
import { MaterialIcons } from "@expo/vector-icons";
import Slider from '@react-native-community/slider'

function SearchPage({ route, navigation }) {
  const { ArtistSelected } = route.params

  const [sound, setSound] = React.useState();
  const [CurrTime, setCurrtime] = useState(0.00);

  const [CurrentMusicMillies, setCurrentMusicMillies] = useState(0) 
  const [SongDuration, setSongDuration] = useState(0) 

  
  React.useEffect(() => {
    onLoad();
}, [])
  async function onLoad() {
      const { sound } = await Audio.Sound.createAsync( //Audio loads the selected song
         { uri: ArtistSelected.SongPath },
        { shouldPlay: true }
      );
      setSound(sound);

      sound.getStatusAsync()
      .then(function (result) {
        setSongDuration((result.durationMillis/1000)) //Sets the duration of the song.
      })
  }
  async function playSound() { //palys the sound
    sound.getStatusAsync()
      .then(function (result) {
       sound.playFromPositionAsync(CurrentMusicMillies);
      })
    await sound.playAsync();
  }
  async function Pause() {
    await sound.pauseAsync();
  }
  React.useEffect(() => { //Expo-av documentations says that you have to unload sound after it has been laoded.
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const handelChange = (val) => {  //ToDo fix slider automaticlly updates while playing.
    
    setCurrentMusicMillies((val*1000))
    sound.playFromPositionAsync((val*1000));
    
}

 const formatTime = (secs) => { /* göra tiden till rätt format */

    let minutes = Math.floor(secs/60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) seconds = `0${seconds}`;

return `${minutes}:${seconds}`;
 }
  return (

    <View style={styles.container}>

      <Image style={styles.BackgroundImg} source={require('../images/backgrounds/background.jpg')} />

      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderTxt}>{ArtistSelected.ArtName + ' ' + ArtistSelected.SongName + ' - ' + ArtistSelected.AlbumName}</Text>
      </View>
      <View style={{ alignItems: "center" }}>

      </View>

      <View style={{ alignItems: "center" }}>
        <Image style={styles.CenterImg} source={{ uri: ArtistSelected.ArtistPath }} />
      </View>

      <View style={styles.musicInfoContainer}>
        <View style={styles.infoContainer}>


          <Text style={styles.ArtistTxt}>{ArtistSelected.ArtName} {ArtistSelected.ArtLastName}</Text>


          <Text style={styles.musicTxt}>{ArtistSelected.SongName}</Text>
          <Text style={styles.durationTxt}>{formatTime(CurrTime)} - {formatTime(SongDuration)}</Text>
        </View>

        <View style={styles.backgroundMini}>
          <Image style={styles.backgroundImgMini} source={{ uri: ArtistSelected.AlbumPath }} />
          <Text style={styles.albumTxtMini}>{ArtistSelected.AlbumName}-Album</Text>
        </View>
      </View>
      <View>
      </View>
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={Pause}>
          <MaterialIcons name='pause' size={45} color="#50db7c" />
        </TouchableOpacity>
        <TouchableOpacity onPress={playSound}>

       

          <MaterialIcons name='play-arrow' size={45} color="#50db7c" />
        </TouchableOpacity>
        
      </View>
      <View>
      <Slider 
            style={styles.SliderStyle}
            minimumValue={0}
            maximumValue={SongDuration}
            minimumTrackTintColor="#FFFFF"
            maximumTrackTintColor="#50db7c"
            onSlidingComplete={handelChange}
            onValueChange={value => setCurrtime(value) }
            
        />
      </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SliderStyle:{
    width:'80%',
    height:40,
    top:70,
    marginLeft:'10%'
  },
  BackgroundImg: {
    position: 'absolute',
    width: '100%',
    height: '115%',

  },
  HeaderTxt: {
    fontSize: 15,
    color: 'white'
  },
  HeaderContainer: {
    width: '100%',
    height: '20%',
    alignItems: "center",
    top: '3%',
  },
  CenterImg: {
    position: 'relative',
    height: 320,
    width: 320,
    borderRadius: 350,
    borderColor: '#52ec84',
    borderWidth: 7
  },
  musicInfoContainer: {
    position: 'relative',
    top: '27%',
    width: '100%',
    textAlign: 'left',
    flexDirection: 'row',

  },
  infoContainer: {
    position: 'relative',
    width: '70%',

  },
  ArtistTxt: {
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: '5%',
    color: 'white'
  },
  musicTxt: {
    color: 'white',
    marginLeft: '5%',
    fontSize: 20
  }, durationTxt: {
    marginLeft: '5%',
    color: 'white'

  },
  backgroundMini: {
    position: 'relative',
    marginLeft: '3%',
    marginTop: '3%',
    textAlign: 'center',
    color: '#fff'
  }, albumTxtMini: {
    color: 'white'
  },
  backgroundImgMini: {
    width: 80,
    height: 80,
    borderWidth: 3,
    borderColor: '#52ec84'
  },
  playerContainer: {
    flexDirection: 'row',
    paddingLeft: '39%',
    top: '12%'

  }
})

export default SearchPage;

