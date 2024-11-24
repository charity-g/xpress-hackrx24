import { StyleSheet, View} from "react-native";
import { useState, Dispatch, Fragment, SetStateAction } from "react";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import SearchableDropdown from 'react-native-searchable-dropdown';
import { SearchableDropdown } from "@/components/searchableDropdown";
import { ScreenButton } from "@/components/ScreenButton";

interface SearchProps {
  setSelectedSymptom: (value:string)=>void,
  searchResults: string[]
};

export default function QuestionaireSearch(props : SearchProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  return (
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title" >Questionaire</ThemedText>
      <Fragment>
      <SearchableDropdown
            onOptionSelected={(item : string) => {
              console.log(item);
              const items = selectedItems;
              items.push(item);
              setSelectedItems(items);
              props.setSelectedSymptom(item);
            }}
            options={props.searchResults}
        />
        </Fragment>
        
        <View>
          {selectedItems.map( () =>
              (<ScreenButton href='/questionaire' text="Continue with selected Symptom"></ScreenButton>)
          )
          }
        </View>
        
      </ThemedView>
  );
}

const styles = StyleSheet.create({
   titleContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     gap: 8,
   }
});