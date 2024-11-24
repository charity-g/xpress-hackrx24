import { StyleSheet, Alert} from "react-native";
import { ThemedView } from '@/components/ThemedView';
import SelectAllThatApply from './SelectAllThatApply';
import { algButton, AlgNode, normalNode, yesNoNode } from "../app/(tabs)/AlgInterface";
import RidButton from "./RidButton";

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
               data.buttons.map((button : algButton) =>
                   <RidButton 
                        text={button.text} 
                        note={button.note}
                        warning={button.warning} 
                        rid={button.rid ? button.rid:'5'} 
                        onClick={props.onClick} 
                     />
               )
            }
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
});