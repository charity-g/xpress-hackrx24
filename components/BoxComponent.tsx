import { StyleSheet, View} from "react-native";
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AlgNode } from "../app/(tabs)/AlgInterface";
import AlgButtons from '@/components/AlgButtons';
import { ScreenButton } from "./ScreenButton";

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
      {props.data["react-native-options"] === 'deliver' &&
        (<View>
          <ScreenButton href='/deliver' text="Need this delivered" color='#6BF2E5'></ScreenButton>
          <ScreenButton href='/apptTelus' text="Not happy with this option?" color='#6BF2E5'></ScreenButton>
        </View>
        )
      }
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