import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  padding: 0 30px ${Platform.OS === 'android' ? 100 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  /* font-family: 'RobotoSlab-Medium'; */
  margin: 64px 0 24px;
  font-weight: bold;
`;

export const BackToSign = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  border-top-width: 1px;
  border-color: #000;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignText = styled.Text`
  color: #1c1d29;
  font-size: 18px;
  /* font-family: 'RobotoSlab-Regular'; */
  margin-left: 16px;
`;

export const Buttons = styled.View`
  margin-top: 20px;
  width: 100%;
  height: 18%
  justify-content: space-between;
`;
