import { StyleSheet} from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AlgNode } from "../app/(tabs)/AlgInterface";
import AlgButtons from '@/components/AlgButtons';

interface BoxComponentProps {
   data: AlgNode;
   onClick: (rid: string) => void;
}

export default function BoxComponent(props:BoxComponentProps) {
  return (
      <ThemedView style={styles.titleContainer}>
      <ThemedText type="title" > {props.data.q}</ThemedText>
      <AlgButtons data={props.data}
         onClick={props.onClick}
      ></AlgButtons>
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