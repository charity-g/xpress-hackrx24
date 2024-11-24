import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';

interface Props {
  items: string[];
  yesRID: string,
  noRID: string;
  onClick: (rid: string) => void;
}

const SelectAllThatApply: React.FC<Props> = ({ items, yesRID, noRID, onClick }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [submitButtonText, setSubmitButtonText] = useState<string>('None of the above apply');

  const toggleItem = (item: string) => {
    setSelectedItems((prevSelectedItems) =>{
      if (prevSelectedItems.includes(item)) {
        if (prevSelectedItems.length === 1) {
          setSubmitButtonText("None of the above apply");
        }
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        setSubmitButtonText("Submit");
        return [...prevSelectedItems, item];
      }
    }
    );
  };
  const handleSubmit = () => { 
    if(selectedItems.length === 0) {
      onClick(noRID);
    } else {
      onClick(yesRID);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}
        scrollEnabled={true}
        nestedScrollEnabled={true}
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleItem(item)}
            style={[
              styles.item,
              selectedItems.includes(item) && styles.selectedItem,
            ]}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button title={submitButtonText} onPress={handleSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginBottom: 20,
    flex:1,
    height: 100,
    zIndex: 1,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#d3d3d3',
  },
  itemText: {
    fontSize: 16,
  },
  rowContainer: {
     flexDirection: 'row', 
     backgroundColor: '#f0f0f0'
   },
});

export default SelectAllThatApply;
