import React from 'react'
import {Text,View,StyleSheet} from 'react-native'
import Card from './Card'
import  Colors from '../constants/colors'

const NumberContainer=props=>{
    return(
        <Card style={styles.numberContainer}>
            <Text style={styles.number}>{props.children}</Text>
        </Card>
    )
}

const styles=StyleSheet.create({
    numberContainer:{
        borderColor:Colors.accent,
        borderRadius:10,
        borderWidth:2,
        alignItems:"center",
        justifyContent:'center',
        marginVertical:10,
        padding:10
    },
    number:{
        fontSize:22,
        color:Colors.accent
    }
})
export default NumberContainer