import React from "react";
import "react-native";
import {Image, View} from "react-native"



export default function Frame(){

    return(

        <View> 
            Teste
            <Image 
                source={require("@/assets/images/icon.png")}
            />
        </View>
        
    );
}
