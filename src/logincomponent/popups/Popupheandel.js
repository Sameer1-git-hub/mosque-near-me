import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity } from 'react-native';
import Popupform from './Popupform';
import Registerpopup from './Registerpopup';

const ModalContent1 = ({ onClose, onCloseModal }) => {
  return (
    <View>
      <Popupform />
      <TouchableOpacity onPress={onCloseModal}>
        <Text style={{
            backgroundColor: '#123032',
            color: '#509494',
            textAlign: 'center',
            paddingBottom: 10,
            fontSize: 20
        }}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose}>
        <Text style={{
            backgroundColor: '#123032',
            color: '#509494',
            textAlign: 'center',
            paddingBottom: 30,
            fontSize: 20
        }}>Switch to Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const ModalContent2 = ({ onClose, onSwitchToLogin }) => {
  return (
    <View>
      <Registerpopup />
      <TouchableOpacity onPress={onClose}>
        <Text style={{
            backgroundColor: '#123032',
            color: '#509494',
            textAlign: 'center',
            paddingBottom: 10,
            fontSize: 20
        }}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSwitchToLogin}>
        <Text style={{
            backgroundColor: '#123032',
            color: '#509494',
            textAlign: 'center',
            paddingTop: 10,
            fontSize: 20
        }}>Switch to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const YourComponent = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setShowModal2(false); // Reset to default state when switching modals
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      
      <TouchableOpacity onPress={toggleModal}>
<Text>poppups</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: '#123032', borderRadius: 10, }}>
            {showModal2 ? (
              <ModalContent2 onClose={toggleModal} onSwitchToLogin={() => setShowModal2(false)} />
            ) : (
              <ModalContent1 onClose={() => setShowModal2(true)} onCloseModal={toggleModal} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default YourComponent;
