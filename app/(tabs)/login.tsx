import { Text, View} from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ScreenButton } from '@/components/ScreenButton';

export default function Login() {
  return (
    <SafeAreaProvider>
    <SafeAreaView style={{height: 100, flexDirection: 'row'}}>
      <Text style={{color: 'white'}} >Login</Text>
      <ScreenButton  href="/profile" text="Login"></ScreenButton>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}
