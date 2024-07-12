import React from 'react';
import { Modal, View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import LoginPopup from './LoginPopup';
import Registerpopup from './Registerpopup';
import Edit from 'react-native-vector-icons/AntDesign';


const ModalContent1 = ({ onClose, onCloseModal }) => {
  return (
    <View style={{ margin: 10 }}>

      <TouchableOpacity onPress={onCloseModal} style={styles.closeButton}>
        <Edit name="close" size={30} color={'white'} />
      </TouchableOpacity>
      <LoginPopup />
      <TouchableOpacity onPress={onClose}>
        <Text style={[styles.text, { paddingBottom: 30 }]}>New User? Create an account</Text>
      </TouchableOpacity>
    </View>
  );
};

const ModalContent2 = ({ onClose, onSwitchToLogin }) => {
  return (
    <View >
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Edit name="close" size={30} color={'white'} />
      </TouchableOpacity>
      <Registerpopup />
      <TouchableOpacity onPress={onSwitchToLogin} style={{ bottom: 50 }}>
        <Text style={[styles.text]}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const Popups = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setShowModal2(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} >
        <Edit name="edit" size={25} color={'#FFFFFF'} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal} >
        <View style={styles.modelChild}>
          <View style={styles.modelChildbox}>
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

export default Popups;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  closeButton: {
    alignItems: 'flex-end',
    paddingTop: 20,
    paddingRight: 20
  },
  Closetext: {
    backgroundColor: '#123032',
    color: '#509494',
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 20
  },
  modelChild: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  modelChildbox: {
    backgroundColor: '#123032',
    borderRadius: 10,
  },
})