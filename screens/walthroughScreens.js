import react from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Images from '../images';
import { useState } from 'react';
import Swiper from 'react-native-swiper';
export default function WalkThrough({navigation}) {

    const walkthroughList = [
        {key:1, title: "Welcome to Drones Wala", image: Images.drone1},
        {key:2, title: "Searching for Jobs?", image: Images.drone2},
        {key:3, title: "Need a Drone Pilot for your job?", image: Images.drone3}
    ];
    const [isLast, setIsLast] = useState(false);
    function checkLast(index) {
        if(index == 2) setIsLast(true);
        else setIsLast(false);
    }
    return (
        <View style={{flex:1, backgroundColor:'white'}}>
            <Swiper 
                paginationStyle={{
                    position:'absolute',
                    bottom:"25%",
                }}
                loop = {false}
                activeDotColor="#ed7117"
                activeDotStyle={{width:20, height:8}}
                onIndexChanged = {(index) => checkLast(index)}
            >
                {walkthroughList.map((i) => {
                    return (
                        <View key={i.key} style={styles.container}>
                            
                            <Image source={i.image} style={styles.image}/>
                            <Text style={styles.title}>{i.title}</Text>
                            
                        </View>
                    );
                })}
            </Swiper> 
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
                { !isLast ?
                <TouchableOpacity>
                    <Text style={{fontSize:18, color:'grey'}}>Skip</Text>
                </TouchableOpacity> : <></>
                }
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width:'90%',
        height:'70%',
        margin:15,
        resizeMode:'contain'
    },
    container: {
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontSize:22,
        color:'grey',
        fontWeight:'bold',
        textAlign:'center'
    },
    buttonContainer: {
        position: 'absolute',
        bottom:'8%',
        left:0,
        right:0,
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        backgroundColor:'#ed7117',
        paddingHorizontal: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:18,
        borderRadius:20,
        marginBottom:20
    },
    buttonText: {
        fontWeight:'bold',
        color:'white',
        fontSize:17
    }
});