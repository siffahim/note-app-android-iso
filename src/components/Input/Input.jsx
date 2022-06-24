import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../../theme/colors'
import { spacings } from '../../theme/spacings'

export default function Input({
    placeholder,
    secureTextEntry = false,
    onChangeText,
    autoCapitalize,
    multiline,
    value
}) {
    return (
        <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry} s
            style={styles.input}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 48,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginBottom: spacings[5]
    },
})