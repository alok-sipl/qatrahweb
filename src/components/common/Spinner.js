import React from 'react';
const Spinner =({size})=>{

    return (
        <div style={styles.spinnerStyle}>
            loading ...
        </div>
    );
}
export {Spinner};
const styles ={
    spinnerStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
};