import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';



export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #2d2d39;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #fff;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ddd;
    `}


  flex-direction: row;
  align-items: center;
`;



export const ButtonText = styled.Text`
  /* font-family: 'RobotoSlab-Medium'; */
  color: #ffffff;
  font-size: 18px;
`;
export const ButtonPlaceholder = styled.Text`
  /* font-family: 'RobotoSlab-Medium'; */
  color: #9EA0A4;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
  color: #ffffff;
`;
