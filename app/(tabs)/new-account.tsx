import { StyleSheet, TextInput, Pressable, View, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ScreenButton } from '@/components/ScreenButton';

export default function NewAccount() {
  const [text, onChangeText] = useState('');
  const [text2, onChangeText2] = useState('');

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        text,
        text2,
      );
    } catch (error) {
      console.log("_storeData in screen tabs in tab NewAccount failed: " + error);
    }
  };
  
  return (
    <ThemedView style={{height: "100%"}}>
    <SafeAreaProvider>
    <SafeAreaView >
    <View  style={styles.titleContainer}>
        <ThemedText type="title" style={{paddingLeft: 20, textAlign: "left"}}>Create New Account</ThemedText>
        <Image
          source={require('@/assets/images/LogoMotto.png')}
          style={styles.reactLogo}
        />
      </View>

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
      {
        text.length > 0 && text2.length > 0 &&
          (<ThemedView>
          <Pressable onPress={_storeData}>
            <ScreenButton  href="/profile" text="Create Account" color='#6BF2E5'></ScreenButton>
          </Pressable>
          </ThemedView>)
    
      }
    </SafeAreaView>
    </SafeAreaProvider>
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    gap: 8,
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reactLogo: {
    height: 120,
    width: 200,
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
 
