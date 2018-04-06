import React from 'react';

const Number =({label,iconName,value,onChangeText,placeholder,secureTextEntry,maxLength,isSubmitted=false,isDisabled=false})=>
{


    return(
            <div  style={{elevation: 2,marginBottom:3,marginTop:1,shadowOpacity: 0.3,backgroundColor:'#fff'}} rounded  error={(value == '' && isSubmitted == true)}
                  success={(!(value == '') && isSubmitted == true)} >
                <Icon  name={iconName}   style={{color:"#2eb9f9",marginLeft:5}}  />
                <input  disabled={isDisabled}  blurOnSubmit={false} placeholder={label} secureTextEntry={secureTextEntry}  autoCorrect={false}  value={value} onChangeText={onChangeText} maxLength={maxLength} keyboardType="numeric"  placeholderTextColor="#949dac" style={{color:"#949dac"}} />
            </div>

            );

}

export {Number};
