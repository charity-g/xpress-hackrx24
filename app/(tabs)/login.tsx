import { StyleSheet, TextInput, Pressable} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { ScreenButton } from '@/components/ScreenButton';

export default function Login() {
  const [text, onChangeText] = useState('');
  const [text2, onChangeText2] = useState('');
  let verified = '/login';

  const _getPwdData = async () => {
    try {
      const real =  await AsyncStorage.getItem(
        text
      );
      if (real === text2) {
        console.log(real);
        verified = '/profile';
        router.replace(verified);
        return true;
      } else {
        verified = '/login';
        return false;
      }
    } catch (error) {
      console.log("_storeData in screen tabs in tab NewAccount failed");
      return false;
    }
  };

  return (
    <ThemedView style={{height: "100%"}}>
    <SafeAreaProvider>
    <SafeAreaView >
      <ThemedText type="title" style={styles.titleContainer}> Login </ThemedText>
      
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholderTextColor='#444444'
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText2}
        value={text2}
        secureTextEntry={true}
        placeholderTextColor='#444444'
        placeholder="Password"
      />
      <ThemedView>
          <Pressable onPress={_getPwdData}>
            <ScreenButton href={verified} text="Login" color='#6BF2E5'></ScreenButton>
          </Pressable>
          </ThemedView>
    </SafeAreaView>
    </SafeAreaProvider>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
   titleContainer: {
     gap: 8,
     marginTop: 20,
   },
   button: {
     width: "20%",
     backgroundColor: 'blue',
     color: 'white',
     padding: 20
   },
   input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
 });
 
