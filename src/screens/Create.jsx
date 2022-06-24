import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../App';
import Input from '../components/Input/Input';
import Text from '../components/Text/Text';
import { colors } from '../theme/colors';
import { spacings } from '../theme/spacings';


const notesColorOptions = ['red', 'blue', 'green'];

export default function Create({ navigation, user }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [noteColor, setNoteColor] = useState("#fff");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigation()

    const onPressCreate = async () => {
        setLoading(true)
        try {
            await addDoc(collection(db, "notes"), {
                title,
                description,
                color: noteColor,
                uid: user.uid
            })
            setLoading(false)
            showMessage({
                message: 'Successfully create note',
                type: 'success'
            })
            navigation.goBack()
        }
        catch (err) {
            console.log(err.message)
            setLoading(false)
        }
    }

    return (
        <SafeAreaView>
            <View style={{ position: 'relative' }}>
                <Image
                    source={require('../../assets/createNote.png')}
                    style={{ alignSelf: 'center', width: '100%', height: 280 }}
                />
                <TouchableOpacity
                    onPress={() => navigate.goBack()}
                    style={[styles.backBtn, { paddingHorizontal: spacings[4] }]}
                >
                    <AntDesign name="arrowleft" size={25} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: spacings[4] }}>
                <Input
                    placeholder='Title'
                    onChangeText={(text) => setTitle(text)}
                />
                <Input
                    placeholder='Description'
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                />


                <View style={{ marginTop: spacings[5] }}>
                    <Text preset='small' style={{ marginBottom: spacings[2] }}>Select your note color?</Text>
                    {
                        notesColorOptions.map(option => {
                            const selected = noteColor === option;
                            return (
                                <Pressable
                                    onPress={() => setNoteColor(option)}
                                    key={option}
                                    style={styles.radioContainer}
                                >
                                    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                        <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}></View>
                                    </View>
                                    <Text preset='small'>{option.toUpperCase()}</Text>
                                </Pressable>
                            )
                        })
                    }
                </View>
                {
                    loading ? (
                        <ActivityIndicator />
                    ) : (
                        <TouchableOpacity
                            onPress={onPressCreate}
                            style={styles.button}
                        >
                            <Text preset='small'>Create Note</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: 15
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: spacings[2]
    },
    outerCircle: {
        width: 20,
        height: 20,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacings[2]
    },
    innerCircle: {
        width: 11,
        height: 11,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.grey,
    },
    selectedOuterCircle: {
        borderColor: colors.red
    },
    selectedInnerCircle: {
        backgroundColor: colors.red,
        borderColor: colors.red
    },
    button: {
        borderRadius: 30,
        width: '100%',
        height: 45,
        backgroundColor: colors.yellow,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: spacings[13]
    },
})