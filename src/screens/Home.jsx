import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../../App';
import Text from '../components/Text/Text';
import { colors } from '../theme/colors';
import { spacings } from '../theme/spacings';

export default function Home({ navigation, route, user }) {
    const [notes, setNotes] = useState([]);
    const onPressCreate = () => {
        navigation.navigate('Create')
    }

    useEffect(() => {
        const q = query(collection(db, 'notes'), where("uid", "==", user.uid));
        const noteListenerSubscription = onSnapshot(q, (querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setNotes(list)
        })
        return noteListenerSubscription;
    }, [])

    const renderItem = ({ item }) => {
        const { title, color, description } = item
        return (
            <View
                style={[styles.itemDesign, { backgroundColor: color }]}
            >

                <View>
                    <Text preset='h5' style={{ color: colors.white }}>{title}</Text>
                    <Text preset='small' style={{ color: colors.white }}>{description.slice(0, 30)}...</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <Pressable
                        style={styles.btnAction}
                        onPress={() => {
                            navigation.navigate('Edit', { item })
                        }}
                    >
                        <FontAwesome name="edit" size={20} color={colors.green} />
                    </Pressable>
                    <Pressable
                        style={styles.btnAction}
                        onPress={() => {
                            deleteDoc(doc(db, 'notes', item.id))
                            showMessage({
                                message: 'Successfully Deleted',
                                type: 'danger'
                            })
                        }}
                    >
                        <AntDesign name="delete" size={20} color={colors.red} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ paddingTop: spacings[0], paddingHorizontal: spacings[4] }}>
            <View style={styles.noteTitle}>
                <Text preset='h3'>My Notes</Text>

                <Pressable
                    onPress={onPressCreate}
                >
                    <AntDesign name="pluscircleo" size={24} color="black" />
                </Pressable>
            </View>

            <ScrollView>
                <FlatList
                    data={notes}
                    renderItem={renderItem}
                    keyExtractor={item => item.title}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    noteTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacings[6]
    },
    itemDesign: {
        padding: spacings[4],
        borderRadius: 10,
        marginBottom: spacings[2],
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnAction: {
        backgroundColor: colors.white,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginRight: spacings[0]
    }
})