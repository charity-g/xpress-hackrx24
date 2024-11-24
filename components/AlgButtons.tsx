import { StyleSheet, Image, View} from "react-native";
import { ThemedView } from '@/components/ThemedView';
import SelectAllThatApply from './SelectAllThatApply';
import { algButton, AlgNode, normalNode, yesNoNode } from "../app/(tabs)/AlgInterface";
import RidButton from "./RidButton";
import { ThemedText } from "./ThemedText";

interface AlgButtonsProps {
   data: AlgNode;
   onClick: (rid: string) => void;
}

export default function AlgButtons(props: AlgButtonsProps) {
   if (props.data.type === 'yesNoNode') {
      const data = props.data as yesNoNode;
      return (
         <ThemedView style={styles.titleContainer}>
         <SelectAllThatApply items={data.selections} 
            yesRID={data.yesRID} noRID={data.noRID}
            onClick={props.onClick}
         />
         
         </ThemedView>
      );
   } else {
      const data = props.data as normalNode;
      return (
         <ThemedView style={styles.titleContainer}>
            {
               data.buttons.map((button : algButton) => {
                  if (button.type === "ProductLeafButton") {
                     const img = require('@/assets/images/productPhoto/pepcid.jpg');
                     return (
                        <View style={styles.titleContainer}>
                        <Image
                           source={img}
                           style={styles.imageProd}
                        />
                        <ThemedText>{button.text}</ThemedText>
                        <ThemedText>{button.note}</ThemedText>
                        <ThemedText>{button.warning}</ThemedText>
                        </View>
                     );
                  } else {
                     return (<RidButton 
                        text={button.text} 
                        note={button.note}
                        warning={button.warning} 
                        rid={ button.rid? button.rid: '5' } 
                        onClick={props.onClick} 
                     />);
                  }
               }
               )
            }
         </ThemedView>
      );
   }
}

const styles = StyleSheet.create({
   titleContainer: {
     flexDirection: 'column',
     flex : 1,
     alignItems: 'center',
     gap: 8,
   },
   imageProd: { height: 100,width: 200,}
});