import React from 'react';
import {View,ActivityIndicator} from 'react-native-web';
const Spinner =({size})=>{

    return (
        <div style={styles.spinnerStyle}>
            <ActivityIndicator size={size ||'large'}/>
        </div>
    );
}
export {Spinner};
const styles ={
    spinnerStyle:{
         "flex":1,
        "justify-content":"center",
        "align-items":'center',
    }
};