import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import FlashMessage from "react-native-flash-message";
import Create from './src/screens/Create';
import Edit from './src/screens/Edit';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import { colors } from './src/theme/colors';


const firebaseConfig = {
  apiKey: "AIzaSyBiMnWOvVx4aaE29sRt6JAM_qouSqXBVmo",
  authDomain: "the-note-app-dafef.firebaseapp.com",
  projectId: "the-note-app-dafef",
  storageBucket: "the-note-app-dafef.appspot.com",
  messagingSenderId: "838925558345",
  appId: "1:838925558345:web:657e7ef9b9ecde39f49598"
};


//fireabse initialize;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)



const Stack = createNativeStackNavigator()


export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  //font loaded----------
  const [loaded] = useFonts({
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf')
  })

  // if (!loaded) {
  //   return <Text>Text fonts Loading...</Text>
  // }

  // React.useEffect(() => {
  //   signOut(auth)
  // })

  //user track-----------
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      }
      else {
        setUser(null)
      }
      setLoading(false)
    })
    return unsubscribe;
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color='orange' size='large' />
      </View>
    )
  }

  //theme change------------
  const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.white
    }
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {
          user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>

              <Stack.Screen name="Create" options={{ headerShown: false }}>
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>

              <Stack.Screen name="Edit" options={{ headerShown: false }}>
                {(props) => <Edit {...props} user={user} />}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Signin" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="Signup" component={SignUp} />
            </>
          )
        }
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
