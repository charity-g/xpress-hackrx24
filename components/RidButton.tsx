import {Button} from "react-native";


interface RidButtonProps {
   text: string,
   rid: string,
   onClick: (rid : string) => void,
   note?: string,
   warning?: string,
}

const RidButton = (props:RidButtonProps) => {

  return (
      <Button
          title={props.text}
          color="#f194ff"
          onPress={() => props.onClick(props.rid)}
      />
  );
};


export default RidButton;
