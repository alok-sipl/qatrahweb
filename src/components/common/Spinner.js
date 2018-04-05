import React from 'react';
const Spinner =({size})=>{

    if(size == "small"){
        return (
            <div style={styles.spinnerStyle}>
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
top: '50%',
left: '50%',
backgroundColor: "rgba(242, 242, 242, 0.4)",
zIndex: 2
    }
};