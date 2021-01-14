import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native'
import { AsyncStorage } from 'react-native';

function LoginPage({ navigation }) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    React.useEffect(() => {
        load()
    }, [])

    const load = async () => { //function first loads and see if token exists
        try {
            let jsonValue = await AsyncStorage.getItem("LoginToken");
            console.log(jsonValue)
            if (jsonValue != null) {
                navigation.navigate('Home')
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function _postLoginData() {
        try {
            await fetch('http://(ipv4):(Port)/Login/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: name,
                    Password: password
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    try {
                        AsyncStorage.removeItem("LoginToken")
                        AsyncStorage.setItem('LoginToken', JSON.stringify(responseJson)) //Stores token locally on phone for next login.
                        navigation.navigate('Home')
                    } catch (err) {
                        Alert.alert('Login attempt failed', 'You enter a incorrect Username or Password. Please try again.',
                            [{ text: 'Ok' }])
                    }
                });
        }
        catch (err) {
            Alert.alert('Login attempt failed', 'You enter a incorrect Username or Password. Please try again.',
                [{ text: 'Ok' }])
        }
    }
 

    return (
        <View style={styles.container}>
            <Image style={styles.BackgroundImg} source={require('../images/LoginBackground.jpg')} />
            <View>
                <View style={styles.AlbumCoverContainer}>
                    <Image style={styles.AlbumImg1} source={require('../images/AlbumImg1.png')} />
                    <Image style={styles.AlbumImg2} source={require('../images/AlbumImg2.png')} />
                </View>
                <View>
                    <Text style={styles.Title}>BETTER MUSIC</Text>
                    <Text style={styles.LittleTittle}>THE WORLD’S MUSIC IN YOUR HANDS</Text>
                    <Text style={styles.underTitle}>Sign up now and enjoy any song or album, Better music featuresthe best of whats new, starring and what’s trending</Text>
                </View>

                <View style={styles.userCredContainer}>
                    <Image style={styles.NewImg} source={require('../images/Login/LoginBottom.png')} />
                    <View style={styles.userCred}>
                        <TextInput placeholder="Username" style={styles.Username} onChangeText={(text) => setName(text)}></TextInput>
                        <TextInput placeholder="Password" style={styles.Password} onChangeText={(text) => setPassword(text)}></TextInput>
                    </View>
                    <View style={styles.userCred}>

                        <TouchableOpacity onPress={() => _postLoginData()} >
                            <Image style={styles.Login} source={require('../images/login.png')} />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </View>
    )
}
export default LoginPage;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:800,
        position: 'relative'
    }, NewImg: {
        position: 'absolute',
        height: 300,
        width: 400,


    },
    BackgroundImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',

    },
    AlbumCoverContainer: {
        position: 'relative',
        width: '100%',
        height: 300,
        flexDirection: 'row',
    },
    AlbumImg1: {
        position: 'relative',
        left: '17%',
        top: '20%',
        width: 100,
        height: 100,

    },
    AlbumImg2: {
        position: 'relative',
        left: '47%',
        top: '50%',
        width: 100,
        height: 100,

    },
    Title: {
        position: 'relative',
        marginTop: '10%',
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    LittleTittle: {
        position: 'relative',
        marginTop: '5%',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    underTitle: {
        position: 'relative',
        marginTop: '5%',
        width: '80%',
        fontSize: 15,
        textAlign: 'center',
        left: '8%',
        color: 'white'
    },
    userCredContainer: {
        position: 'relative',
        top: '2%',
        backgroundColor: 'white',
        height: '100%',
        borderRadius: 50,
    },
    userCred: {
        position: 'relative',
        top: '5%',
        height: '10%',

    },
    Username: {
        height: '20%',
        fontSize: 25,
        width: '50%',
        left: '26%',
        borderBottomColor: '#6f0014',
        borderBottomWidth: 2,
        color: 'black'

    },
    Password: {
        position: 'relative',
        top: '50%',
        height: '20%',
        fontSize: 25,
        width: '50%',
        left: '26%',
        borderBottomColor: '#6f0014',
        borderBottomWidth: 2,

    },
    Login: {

        position: 'relative',
        left: '32%',
        resizeMode: "stretch",
        height: 40,
        width: 150

    }
})