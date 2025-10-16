import React from "react";
import "react-native";
import {Alert, Image, TouchableOpacity, View} from "react-native"


interface frameProp{
    onpress : () => void
}


export default function Frame({ onpress} : frameProp){

    return(

        <View> 
            <TouchableOpacity onPress={onpress}>
                <Image source={require("@/assets/images/favicon.png")}/> 
            </TouchableOpacity>

        </View>
    );
}
