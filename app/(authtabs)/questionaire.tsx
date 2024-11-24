import { StyleSheet, View, Button} from "react-native";
import { useState} from "react";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import QuestionaireSearch from "../../components/questionaire-search";
import algData from './data.json';
import {router} from 'expo-router';
import {ExternalLink} from '@/components/ExternalLink';
import { algButton, AlgNode } from "./AlgInterface";
import BoxComponent from "@/components/BoxComponent";


const searchResults : string[] = algData["1"]["buttons"].map((item : algButton, i : number) => {
  return item.text;
});

export default function Questionaire() {
   const [symptom, setSymptom] = useState<null|string>(null);
   const [currId, setCurrId] = useState<string>("1");
   const [path, setPath] = useState<string[]>([]);

   const prevRid = () => {
      console.log(path);
      if (path.length === 0) {
        router.replace("/profile");
        setSymptom(null);
        setCurrId("1");
        setPath([]);
      } else {
         setCurrId(path[path.length-1]);
         setPath(path.splice(0, 1));
      }
   }

   const setSelectedSymptom = (value:string) => {
      setSymptom(value);
      for (const button of algData["1"]["buttons"]) {
         if (button.text === value) {
            setCurrId(button.rid);
         }
      }
   }

   const moveToNextRid = (new_rid: string) => {
      setPath([...path, currId]);
      setCurrId(new_rid);
   }
   
   if (algData[currId]['react-native-options'] === 'appointment:medme') {
      router.replace('/apptPharm');
   }

   if (symptom && algData[currId]['type'] !== 'Map') {
      return (
         
         <ThemedView style={{height: "100%"}}>
         <SafeAreaProvider>
         <SafeAreaView >
            <View style={styles.titleContainer}>
           <ThemedText type="subtitle" >Current symptom: {symptom} </ThemedText>
          
            <BoxComponent data={(algData[currId] as AlgNode)}
               onClick={moveToNextRid}
            ></BoxComponent>
             <Button title="Go Back" onPress={prevRid} />
            </View>
         </SafeAreaView>
         </SafeAreaProvider>
         </ThemedView>
       );
   } else if (symptom && algData[currId]['type'] === 'Map') {
      return (
         <ThemedView style={{height: "100%"}}>
         <SafeAreaProvider>
         <SafeAreaView >
            <View style={styles.titleContainer}>
         <ThemedText type="subtitle" style={{marginTop: 20, textAlign: "center"}} > {algData[currId].q}</ThemedText>
         <ExternalLink  href={algData[currId].map} linkText="Click here to view the emergency departments."></ExternalLink>
         <Button title="Go Back" onPress={prevRid} />
         </View>
         </SafeAreaView>
         </SafeAreaProvider>
         </ThemedView>
      );
   
   } else {
      return (
         <ThemedView style={{height: "100%"}}>
            <SafeAreaProvider>
            <SafeAreaView>
               <QuestionaireSearch setSelectedSymptom={setSelectedSymptom} searchResults={searchResults}></QuestionaireSearch>
            </SafeAreaView>
            </SafeAreaProvider>
         </ThemedView>
       );
   }
}

const styles = StyleSheet.create({
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     gap: 8,
   },
   prevRid: {
      backgroundColor: '#213923',
      borderRadius: 6,
   }
});