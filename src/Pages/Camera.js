import React from 'react'
import { View } from 'react-native'
import { Text, Container, Left, Right, Button, Icon, Footer } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import Data from '../component/Data'
import User from '../component/User'
import firebase from 'firebase'

import { firebaseConfig } from '../../Config'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class Cameras extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: [],
            photos: [],
            uid: User.uid,
            car: this.props.numcar
        };
    }
    state = {
        hasPermission: null,
        type: Camera.Constants.Type.back,
    }


    handleCameraType = () => {
        const { cameraType } = this.state

        this.setState({
            cameraType:
                cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
        })
    }


    /*storePicture(photo) {
        if (this.state.photos) {
            var url = 'https://taxi-cab-eb6f9.firebaseio.com'
            fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': User.uid
                    },
                    body: JSON.stringify({
                        'equipment_image': {
                            'image_encoded': `${photo}`
                        }
                    })
                })
                .then((responseData) => {
                    console.log(responseData);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }*/

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const photo = await this.camera.takePictureAsync(options);

            this.setState({
                photo: photo.uri,
                photos: photo,
                uri: photo.uri.substring(7)
            })
            
            /*const storeRef = firebase.storage().ref()
            const imageRef = storeRef.child('images')
            const storeIamgeRef = storeRef.child('images/camera')

            imageRef.name === storeIamgeRef.name
            imageRef.fullPath === storeIamgeRef.fullPath

            storeIamgeRef.putString(photo).then(function(snapshot) {
                console.log('Uploaded a blob or file!');
                console.log('Snapshot ',snapshot)
              });*/

            Data.photo = this.state.photos
            console.log(this.state.uri)
            /*firebase.storage().ref().child('image').put(photo.uri).then(data=>{
                console.log('Data',data)
            })*/

        }
        firebase.database().ref('user/' + User.uid + '/car/' + this.state.car).set(
            {
                photo: this.state.photo
            }
        ).then(() => {

            console.log('Page Camera Insert !');
            console.log('Page Camera This uid after insert :', this.state.uid);
        }).catch((error) => {
            console.log(error);
        });
        /*firebase.storage().ref(`Image/${this.state.photo}.png`)
        .put(this.state.photos)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => this.setState({ upload: false, imageSource: { uri: url } }))
        .catch((error)=>{
          console.log(error)
          Alert.alert('ผิดพลาด')
        })*/
        //--------Get Data---------//
        Actions.Home({ flag: 1, photo: this.state.photo })

    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasPermission: status === 'granted' });
    }
    render() {
        const { hasPermission } = this.state
        if (hasPermission === null) {
            return <View />;
        } else if (hasPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Container>

                    <View style={{ flex: 1 }}>
                        <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref; }}>
                            <Button transparent onPress={() => Actions.reset('drawer')}><Icon name='arrow-back'></Icon></Button>
                        </Camera>
                        <Footer style={{ flexDirection: 'row', backgroundColor: 'black' }}>
                            <Left>
                                <Button transparent light onPress={() => this.handleCameraType()}>
                                    <Icon name='switch' />
                                </Button>
                            </Left>
                            <Button transparent light style={{ alignSelf: 'center' }} onPress={() => this.takePicture()}>
                                <Icon name='camera' />
                            </Button>
                            <Right />
                        </Footer>
                    </View>
                </Container>
            );
        }
    }
}
export default Cameras;