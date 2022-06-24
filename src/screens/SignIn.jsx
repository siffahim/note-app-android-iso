import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { auth } from '../../App'
import Input from '../components/Input/Input'
import Text from '../components/Text/Text'
import { colors } from '../theme/colors'
import { spacings } from '../theme/spacings'


export default function SignIn({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const singin = async () => {

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            const user = await result.user;

            console.log("result >-----", user)
        }
        catch (err) {
            showMessage({
                type: 'warning',
                message: err.message
            })
        }

    }


    return (
        <View style={{ flex: 1 }}>
            <Image
                source={require('../../assets/login.png')}
                style={{ alignSelf: 'center', width: '100%', height: 300 }}
            />
            <Text preset='h3' style={{ textAlign: 'center' }}>Never forget your notes</Text>

            <View style={{ paddingHorizontal: spacings[4], paddingVertical: spacings[5] }}>
                <Input
                    placeholder='Email Address'
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    style={styles.input}
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={singin}
                >
                    <Text preset='small'>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.signUpView}>
                <Pressable
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text preset='small'>Don't have an account? <Text preset='h4' style={{ color: colors.blue }}>Sign Up</Text></Text>
                </Pressable>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginBottom: spacings[5]
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
    signUpView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: spacings[5]
    }
})