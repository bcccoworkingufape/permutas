import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

import { FontAwesome } from '@expo/vector-icons';

export const ModalView = styled.View`
  border-width: 0.5px;
  border-color: #acacac;
  border-radius: 25px;
  background-color: #2D2D39;
  padding: 40px 20px;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 10px;
  align-items: center;
`;

export const HeaderContent = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ItemTitle = styled.Text`
  color: #fff;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export const ItemText = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${RFValue(14)}px;
`

export const TextCenter = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${RFValue(16)}px;
  text-align: center;
`

export const Button = styled.TouchableOpacity`
  height: ${RFValue(45)}px;
  width: 45%;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: ${RFValue(16)}px;
  font-weight: bold;
`;

export const Icon = styled(FontAwesome)`
  font-size: ${RFValue(80)}px;
  color: #ffffff;
  margin-right: 20px;
`;

export const Separator = styled.View`
  width: 100%;
  margin: 15px 0;
  border-bottom-color: #acacac;
  border-bottom-width: 1px;
`;

export const Buttons = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-top: 25px;
`;
