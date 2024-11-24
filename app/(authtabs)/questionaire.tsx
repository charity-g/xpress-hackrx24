import { StyleSheet} from "react-native";
import { useState} from "react";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import QuestionaireSearch from "../../components/questionaire-search";
import algData from './data.json';
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
   
   if (symptom && algData[currId]['type'] !== 'Map') {
      return (
         <SafeAreaProvider>
         <SafeAreaView style={{height: 100}}>
              
           <ThemedView style={styles.titleContainer}>
           <ThemedText type="title" >Questionaire symptom = {symptom} </ThemedText>
            <BoxComponent data={(algData[currId] as AlgNode)}
               onClick={moveToNextRid}
            ></BoxComponent>
           </ThemedView>
         </SafeAreaView>
         </SafeAreaProvider>
       );
   } else if (symptom && algData[currId]['type'] === 'Map') {
      return (
      <SafeAreaProvider>
      <SafeAreaView style={{height: 100}}>
      <ThemedView style={styles.titleContainer}>
         <ThemedText type="title" > {algData[currId].q}</ThemedText>
         <ExternalLink  href='https://www.edwaittimes.ca/welcome' linkText="Click here to view the emergency departments."></ExternalLink>
      </ThemedView>
      </SafeAreaView>
      </SafeAreaProvider>
      );
   
   } else {
      return (
         <SafeAreaProvider>
         <SafeAreaView style={{height: 100}}>
              <QuestionaireSearch setSelectedSymptom={setSelectedSymptom} searchResults={searchResults}></QuestionaireSearch>
         </SafeAreaView>
         </SafeAreaProvider>
       );
   }
}

const styles = StyleSheet.create({
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     gap: 8,
   }
});