import React from 'react';
const Spinner =({size})=>{

    if(size == "small"){
        return (
            <div >
              <img src="../../../public/images/small-loader.gif" />
            </div>
        );

    }
    else{
        return (
            <div style={styles.spinnerStyle}>
                <img src="../../../public/images/loading.gif" />
            </div>
        );

    }


}
export {Spinner};
const styles ={
    spinnerStyle:{
        position: "fixed",
width: "100%",
height: "100%",
top: '30%',
backgroundColor: "transparent",
display: "block",
textAlign: "center",
margin: '0 auto',
zIndex: 2
    }
};