import { Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const Login = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white',alignItems:"center"}}>
        <View>
        <Image
          style={{ width: 150, height: 150, resizeMode: "contain" }}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-16.png",
          }}
        />
        </View>
        <KeyboardAvoidingView>
            <View style={{alignItems:"center"}}>
                <Text 
                style={
                  {fontSize:20,
                  fontWeight:"bold",
                  color:"#041E42"}
                }>
                    Log in to your Account</Text>
            </View>
            <View style={{marginTop:70}}>
                <View style={
                  { flexDirection:"row",
                    alignItems:"center",
                    gap:5,backgroundColor:"#E0E0E0",
                    paddingVertical:5,
                    borderRadius:5,
                    marginTop:30
                  }}>
                    <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="black" /> 
                    <TextInput style={{ color: "gray",marginVertical: 10,width: 250}} placeholder='Enter your email'/>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({})