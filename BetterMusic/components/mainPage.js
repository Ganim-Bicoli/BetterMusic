import React, { useState } from 'react'
import { View, Text, FlatList, TextInput, Image, StyleSheet, useEffect, TouchableOpacity, ActivityIndicator, Alert  } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";

function MainPage({ navigation }) {

  const [songSelected, setSongSelected] = useState()
  const [isLoading, setLoading] = useState(true)
  const [MusicObj, setMusicObj] = useState([])


  React.useEffect(() => {
   
    getArtistAlbumList()
}, [])

  const songInput = (enteredText) => {
    setSongSelected(enteredText)
    console.log(songSelected)
  }

  const getSongsFromApi = async () => {
    try {
      let response = await fetch(
        'http://192.168.1.224:61581/music/' + songSelected
        
      );
      let ArtistSelected = await response.json();
      navigation.navigate('Music', { ArtistSelected })

    } catch (error) {
      Alert.alert('Opps','Sorry, we dont have that artist. Please try again with a different artist.',
      [{text: 'Ok'
  
      }])
      console.error(error);
    }
  };


  async function getArtistAlbumList() {
    if (isLoading == true) {
      setLoading(false)
      try {
        let response = await fetch(
          'http://192.168.1.224:61581/music',
        );
        let ArtistSelected = await response.json();
        setMusicObj(ArtistSelected)
        console.log(ArtistSelected)

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ScrollView style={styles.ViewBackground}>
      <View>
        <View style={styles.SearchBar}>
          <TextInput placeholder="Enter song title" onChangeText={songInput} style={styles.textBox} />
          <TouchableOpacity onPress={() => getSongsFromApi()}>
          <MaterialIcons style={styles.ButtonStyle} size={20} name='search' color="#fff" />
          </TouchableOpacity >
          
        </View>
        {isLoading == true ? <ActivityIndicator size="large" color="#00ff00" /> :
          <View style={styles.contentWrap}>
            <Text style={styles.TitleText}>Artist</Text>
            <View >
              <FlatList horizontal={true}
                keyExtractor={(item) => item.Id}
                data={MusicObj}
                renderItem={({ item }) =>
                  <TouchableOpacity>
                    <View style={styles.ArtistWrap}>

                      <Image style={styles.ArtistImg} source={{ uri: item.ArtistPath }} />
                      <Text style={styles.ArtistText}>{item.ArtName}</Text>
                    </View>
                  </TouchableOpacity>}
              />
            </View>
            <View>
              <Text style={styles.TitleText}>Album</Text>
              <View >
                <FlatList horizontal={true}
                  keyExtractor={(item) => item.Id}
                  data={MusicObj}
                  renderItem={({ item }) =>
                    <TouchableOpacity>
                      <View style={styles.ArtistWrap}>
                        <Image style={styles.AlbumImg} source={{ uri: item.AlbumPath }} />
                        <Text style={styles.ArtistText}>{item.AlbumName}</Text>
                      </View>
                    </TouchableOpacity>}
                />
              </View>
            </View>
            <View style={styles.FavoritList}>
              <Text style={styles.FavTitleText}>Your lists</Text>
              <FlatList horizontal={false}
                keyExtractor={(item) => item.Id}
                data={MusicObj}
                renderItem={({ item }) =>
                  <TouchableOpacity>
                    <View style={styles.FavListWrap}>
                      <Image style={styles.ArtistImg2} source={{ uri: item.AlbumPath }} />
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.FavoritArtistText}>{item.AlbumName}</Text>
                        <Text style={styles.FavoritArtistText}>5/5</Text>
                        <Text style={styles.FavoritArtistText}>HOT</Text>
                     
                      </View>
                     
                    </View>
                  </TouchableOpacity>}
              />
            </View>
          </View>
        }
      </View>


    </ScrollView>


  )

}

const styles = StyleSheet.create({
  ViewBackground: {
    backgroundColor: '#1d1726',
    flex: 1
  },
  SearchBar: {
    flexDirection: 'row'
  },
  textBox: {
    position: 'relative',
    marginLeft:'5%',
    width: '70%',
    backgroundColor: "#2d2835",
    color: '#f9f9f9',
    fontSize: 15,
    marginTop: '15%'

  },
  ButtonStyle: {
    position: 'relative',
    marginTop:58,
    backgroundColor: "#2d2835",
    color: '#f9f9f9',
    padding:5,
    borderRadius:5,
    marginLeft:20
     
   
  },
  contentWrap: {
    width: '90%',
    marginLeft: '5%'
  },
  ArtistWrap: {
    width: 100,
    height: 160,
    marginRight: 10,
    marginTop: 10
  },
  ArtistImg: {
    width: '100%',
    height: '90%',
    borderRadius: 10
  },
  AlbumImg: {
    width: '100%',
    height: '65%',
  },
  ArtistImg2: {
    width: '30%',
    height: '100%',
    borderRadius: 10
  },
  ArtistText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400'
  },
  FavoritList: {
    position: 'relative',
    width: '100%',
    height: 'auto',
  },
  FavListWrap: {
    position: 'relative',
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#8c093a',
    marginBottom: 5,
    borderRadius: 6,
  },
  FavoritArtistImg: {
    position: 'relative',
    height: '100%',
    width: '30%',
  },
  FavoritArtistText: {
    position: 'relative',
    width: '30%',
    height: '100%',
    padding: 5,
    fontWeight: '500',
    color: 'white'

  },
  FavTitleText: {
    position: 'relative',
    color: 'white',
    fontSize: 25,
  },
  TitleText: {
    position: 'relative',
    color: 'white',
    fontSize: 25,
    marginTop: 10
  },

  TitleTextLower: {
    position: 'relative',
    marginTop: '1%',
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  fixToText: {
    width: '80%',
    left: '10%',
  }
});

export default MainPage;