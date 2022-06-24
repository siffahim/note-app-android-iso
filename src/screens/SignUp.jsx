import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from "firebase/firestore"
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { auth, db } from '../../App'
import Input from '../components/Input/Input'
import Text from '../components/Text/Text'
import { colors } from '../theme/colors'
import { spacings } from '../theme/spacings'


const genderOptions = ['Male', 'Female'];

export default function SignUp({ navigation }) {
    const [loading, setLoaidng] = useState(false);
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const signup = async () => {
        setLoaidng(true)
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)
            const user = await result.user;

            //add user to database
            await addDoc(collection(db, "users"), {
                name,
                email,
                password,
                age,
                gender,
                uid: user.uid
            })
            setLoaidng(false)
        }
        catch (err) {
            showMessage({
                message: 'This account alrady exits!!',
                type: 'warning'
            })
            setLoaidng(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: spacings[4], paddingVertical: spacings[5] }}>
                <Input
                    onChangeText={text => setEmail(text)}
                    placeholder='Email Address'
                    autoCapitalize={'none'}
                />
                <Input
                    onChangeText={text => setPassword(text)}
                    placeholder='Password'
                    secureTextEntry
                />
                <Input
                    onChangeText={text => setName(text)}
                    placeholder='Full Name'
                    autoCapitalize={'words'}
                />
                <Input
                    onChangeText={text => setAge(text)}
                    placeholder='Age'
                />


                <View style={{ marginVertical: spacings[4] }}>
                    <Text preset='h4'>Select Gender?</Text>
                </View>
                {
                    genderOptions.map(option => {
                        const selected = gender === option;
                        return (
                            <Pressable
                                onPress={() => setGender(option)}
                                key={option}
                                style={styles.radioContainer}
                            >
                                <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]}>
                                    <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}></View>
                                </View>
                                <Text preset='small'>{option}</Text>
                            </Pressable>
                        )
                    })
                }
                {
                    loading ? (
                        <ActivityIndicator />
                    ) : (
                        <TouchableOpacity
                            onPress={signup}
                            style={styles.button}
                        >
                            <Text preset='small'>Sign Up</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <View style={styles.signUpView}>
                <Pressable
                    onPress={() => navigation.navigate('Signin')}
                >
                    <Text preset='small'>Alrady have an account? <Text preset='h4' style={{ color: colors.blue }}>Sign In</Text></Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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
    signUpView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: spacings[4],
        padding: spacings[2]
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
    }
})