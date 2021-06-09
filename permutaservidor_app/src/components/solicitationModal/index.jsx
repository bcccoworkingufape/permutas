import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import {
  ModalView,
  ModalHeader,
  HeaderContent,
  ItemTitle,
  ItemText,
  TextCenter,
  Button,
  ButtonText,
  Icon,
  Separator,
  Buttons
} from './styles';


const SolicitationModal = ({
  item,
  isVisible,
  toggleModal,
  createSolicitation,
}) => {

  return (
    <Modal
      backdropOpacity={0.8}
      backdropColor='#1C1D29'
      onBackdropPress={toggleModal}
      isVisible={isVisible}
    >
      {item && item.governmentEmployee && item.institution ?
        <ModalView>
          <ModalHeader>
            <Icon name="user-circle" />
            <HeaderContent>
              <ItemTitle>{item.governmentEmployee.user.name}</ItemTitle>
              <ItemText>{item.institution.name}</ItemText>
              <ItemText>{item.governmentEmployee.position.name}</ItemText>
              <ItemText>{item.governmentEmployee.position.description}</ItemText>
            </HeaderContent>
          </ModalHeader>
          <TextCenter>
            De: {item.governmentEmployee.institutionAddress.city} - {item.governmentEmployee.institutionAddress.state}
          </TextCenter>
          <TextCenter>
            Para: {item.destinationAddress.city} - {item.destinationAddress.state}
          </TextCenter>
          <Separator />
          <TextCenter>Você deseja permutar com essa pessoa?</TextCenter>
          <Buttons>
            <Button
              style={{
                backgroundColor: 'red'
              }}
              onPress={() => toggleModal()}
            >
              <ButtonText>Não</ButtonText>
            </Button>
            <Button
              style={{
                backgroundColor: 'green'
              }}
              onPress={() => createSolicitation(item.id)}
            >
              <ButtonText>Sim</ButtonText>
            </Button>
          </Buttons>
        </ModalView>
        : <View></View>
      }
    </Modal>
  )
}

export default SolicitationModal;
