import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/store/slice/Userslice';
import Closesquare from 'react-native-vector-icons/AntDesign';

export default function AddNumber({ visible, onClose }) {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://admin.meandmyteam.org/api/add-phone-number',
                { phone_number: phoneNumber },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch(setUser({ ...userData, phone_number: phoneNumber }));
            onClose();
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Please enter a valid phone number.");
        } finally {
            setLoading(false);
          }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                    <Closesquare name="close" size={30} color={'#fff'} />
                </TouchableOpacity>
                <View style={styles.modalContent}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter number"
                            placeholderTextColor={'#fff'}
                            color={'#fff'}
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            keyboardType="numeric"
                            maxLength={12}
                        />
                        {error && <Text style={styles.errorText}>{error}</Text>}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    {loading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Submit</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#123032',
    },
    modalContent: {
        width: "100%",
        height: 700,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 20
    },
    input: {
        height: 50,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        width: 350,
        paddingLeft: 10
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    iconButton: {
        alignSelf: 'flex-end',
        right: 20,
    },
    button: {
        backgroundColor: '#5F8575',
        padding: 10,
        alignItems: 'center',
        width: 200,
        marginTop: 35,
        borderRadius: 10

    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20
    },
});
