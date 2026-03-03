import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const index = () => {
  const pingBackend = async()=>{
    const res = await fetch('http://10.12.73.248:3000');
    const data = await res.text();
    console.log(data);
    
  }
  return (
    <View>
      <Text>index</Text>
      <Pressable style={styles.btn} onPress={pingBackend}>
          <Text>Ping backen</Text>
      </Pressable>
      <Link href={"/(auth)/sign-in"}>
        <Text> Go to sign -In</Text>
      </Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  btn:{
    backgroundColor:"white",
    color:"black",
    padding:5

  }
})