//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
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({ 
	iosClientId:"301845123581-tb15he6490voa2chhhmm39hhv13i1a9n.apps.googleusercontent.com",
	webClienteId:"301845123581-fa6s540vlcbptle4eq3rr3j7qnt39q5k.apps.googleusercontent.com",
  });

  React.useEffect(()=>{
  	IngresoGoogle();
  },[response])

  async function IngresoGoogle(){ 
  	const user = await AsyncStorage.getItem("@user");
  	if(!user){
  		if(response?.type === "success")
  		await getUserInfo(response.authentication.accessToken);
  	}else{
  		setUserInfo(JSON.parse(user));
  	}
  }

  const getUserInfo = async (token) => {
  	if(!token) return;
  	try{
  		const response = await fetch(
  			"https://www.googleapis.com/userinfo/v2/me",
  			{
  				headers: { Authorization: `Bearer ${token}` },
  			}
  		);

  	const user await response.json();
  	await AsyncStorage.setItem("@user",JSON.stringify(user));
  	setUserInfo(user);	
  	}catch(error){
  	}
  };

  return (
    <View style={styles.container}>
    	{!userinfo(
    		<Button title="Ingrese a su cuenta de Google" disabled={!request} onPress={() => promptAsync(); }}/>
	) : (
	    <View style={styles.card}>
	     	{userInfo?.picture && (<Image source={{uri: userInfo?.picture}} style={styles.image}/>)}
	     	<Text> UNIVERSIDAD DON BOSCO </Text>
	      	<Text> Desafio 3 - DSP </Text>
	     	<Text style={styles.text}> Correo: {userInfo.email} </Text>
	     	<Text style={styles.text}> Verificado: {userInfo.verified_email ? "yes" : "no"} </Text>
	     	<Text style={styles.text}> Nombre: {userInfo.name} </Text>
	        {/* <Text {JSON.stringify(userinfo,null,2)}/> */}
	    </View>
    	)}
    <Button title="Eliminar caché" onPress={async() => await AsyncStorage.removeItem("@user")}/>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
  		flex: 1,
  		backgroundColor: "#fff",
  		aligItems: "center",
  		justifyContent: "center",
  	},
    text: {
  		fontSize: 20,
  		fontWeight: "bold",
	},
    card: {
  		borderWidth: 1,
  		borderRadius: 15,
  		padding: 15,
	},
	image: {
  		width: 100,
  		height: 100,
  		borderRadius: 50,
	},
});