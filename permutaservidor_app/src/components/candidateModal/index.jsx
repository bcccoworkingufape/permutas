import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import {
  Button,
  Buttons,
  ButtonText,
  HeaderContent,
  Icon,
  IconSmall,
  InfoUser,
  ItemTitle,
  ItemText,
  ModalView,
  ModalHeader,
  Separator,
  TextCenter,
} from './styles';


const CandidateModal = ({
  item,
  isVisible,
  toggleModal,
  confirmSolicitation,
  declineSolicitation,
}) => {

  return (
    <Modal
      backdropOpacity={0.8}
      backdropColor='#1C1D29'
      onBackdropPress={toggleModal}
      isVisible={isVisible}
    >
      {item && item.user && item.institution && item.position
        ? <ModalView>
          <ModalHeader>
            <IconSmall name="arrowleft" onPress={toggleModal} />
            <InfoUser>
              <Icon name="user-circle" />
              <HeaderContent>
                <ItemTitle>{item.user.name}</ItemTitle>
                <ItemText>{item.institution.name}</ItemText>
                <ItemText>{item.position.name}</ItemText>
                <ItemText>{item.position.description}</ItemText>
              </HeaderContent>
            </InfoUser>
          </ModalHeader>
          <TextCenter>
            De: {item.institutionAddress.city}/{item.institutionAddress.state}
          </TextCenter>
          <Separator />
          <TextCenter>Você deseja permutar com essa pessoa?</TextCenter>
          <Buttons>
            <Button
              style={{
                backgroundColor: 'red'
              }}
              onPress={() => declineSolicitation(item.id)}
            >
              <ButtonText>Recusar</ButtonText>
            </Button>
            <Button
              style={{
                backgroundColor: 'green'
              }}
              onPress={() => confirmSolicitation(item.id)}
            >
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </Buttons>
        </ModalView>
        : <View />}
    </Modal>
  )
}

export default CandidateModal;
