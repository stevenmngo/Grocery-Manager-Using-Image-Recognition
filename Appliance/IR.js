import React from 'react';
import { StyleSheet, TextInput, Text, View, Alert, TouchableOpacity, Modal } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import * as tf from '@tensorflow/tfjs'
import { fetch } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as jpeg from 'jpeg-js'
import Buttons from './dummyComponents/Buttons'
import Loader from './Loader';


export default  class IR extends React.Component {
    state = {
        hasCameraPermission: null,
        isTfReady: false,
        isModelReady: false,
        loading: true,
        predictions: null,
        image: null,
        modalVisible: false,
        signIn: true,
      
    

    };

    removeItem() {
        fetch(`http://${global._ipAddress}:3000/item/removeItem`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: global._email, item: this.state.predictions[0].className }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    Alert.alert('Error occurred')
                    return
                }
                else if (responseJson.res === "Yes") {
                    Alert.alert('Add Succeed')
                    this.setState({ predictions: null, image: null, modalVisible: false })
                    
                }else if (responseJson.res === "No") {
                        Alert.alert('Cannot remove')
                        this.setState({ predictions: null, image: null, modalVisible: false })
                        
                    
                } else {
                    Alert.alert('Error occurred')
                    return
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    closeModal() {
        this.setState({ predictions: null, image: null, modalVisible: false })
    }

    async componentDidMount() {
        

        await tf.ready()
        this.setState({
            isTfReady: true
        })
        this.model = await mobilenet.load()
        this.setState({ isModelReady: true })
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
        this.setState({ loading: false })
    }
    imageToTensor(rawImageData) {
        console.log("totensor")
        const TO_UINT8ARRAY = true
        const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
        // Drop the alpha channel info for mobilenet
        const buffer = new Uint8Array(width * height * 3)
        let offset = 0 // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset]
            buffer[i + 1] = data[offset + 1]
            buffer[i + 2] = data[offset + 2]

            offset += 4
        }
        console.log("totensor-----1")
        return tf.tensor3d(buffer, [height, width, 3])
    }

    classifyImage = async () => {
        try {
            console.log("fetch")
            const response = await fetch(this.state.image.uri, {}, { isBinary: true })
            console.log("fetch----1")
            const rawImageData = await response.arrayBuffer()
            const imageTensor = this.imageToTensor(rawImageData)
            console.log("classs")
            const predictions = await this.model.classify(imageTensor)
            console.log("classs--------1")
            this.setState({ predictions })
            this.setState({ loading: false })
            this.setState({ modalVisible: true })
            console.log(predictions)
        } catch (error) {
            console.log(error)
        }
    }
    async snapPhoto() {
        try {
            console.log('Button Pressed');
            if (this.camera) {
                console.log('Taking photo');
                const options = {
                    quality: 0.6, fixOrientation: true, base64: true

                };
                await this.camera.takePictureAsync(options).then(photo => {
                    this.setState({ image: photo })
                    this.setState({ loading: true })
                    this.classifyImage()
                });
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {

        if (!this.state.signIn) {
            return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Buttons title="Sign In to Continue" onPress={() => { this.props.navigation.navigate('auth') }} />
            </View>;
        }
        else if (this.state.hasCameraPermission === null) {
            return <View style={styles.container}>
                <Loader
                    loading={this.state.loading}
                    title="Loading TF Model" />
            </View>;
        } else if (this.state.hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <Loader
                        loading={this.state.loading}
                        title="Processing Image" />

                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.innerContainer}>

                                {this.state.modalVisible ? <Text style={styles.item}> {this.state.predictions[0].className} </Text> : <Text />}

                                <Buttons
                                    onPress={() => this.removeItem()}
                                    title="Remove item "
                                >
                                </Buttons>
                                <Buttons
                                    onPress={() => this.closeModal()}
                                    title="Close modal"
                                >
                                </Buttons>
                            </View>
                        </View>
                    </Modal>

                    <Camera style={{ flex: 1 }} ref={(ref) => { this.camera = ref }} >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity style={{
                                flex: 1,
                                alignSelf: 'flex-end',
                                backgroundColor: '#DDDDDD'

                            }} onPress={this.snapPhoto.bind(this)}>
                                <Text style={{ textAlign: 'center', fontSize: 18, marginBottom: 10, fontWeight: 'bold', color: 'black' }}> Take </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    item: {
        padding: 10,
        fontSize: 25,
        height: 44,
    },
    innerContainer: {
        alignItems: 'center',
    },
});


