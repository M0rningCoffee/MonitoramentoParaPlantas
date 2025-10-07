import { Slot, Tabs } from "expo-router";
import React from "react"
import { Ionicons } from "@expo/vector-icons"; 


export default function Layout() {
  return(
    <Tabs screenOptions={{tabBarActiveTintColor: 'green'}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({color, size}) => <Ionicons name="leaf-outline" size={size} color={color}></Ionicons>
        }}
      />
    </Tabs>
    
    
  );
}