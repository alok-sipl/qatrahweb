import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spinner} from "../common";
import {getDevicesByDeviceIdForEditDevice,getDevicesByDeviceId,onDeviceIdChanged,onDeviceNameChanged,onTankNameChanged,onTankLocationChanged,onTankHeightChanged,onTankWidthChanged,onTankDepthChanged,updateDeviceDetails,onTankTypeChanged,onTankCityChanged,onTankAreaChanged,getCity,getArea,deleteDeviceDetails,onTankContryChanged,getCountry} from '../../actions';
import _ from 'lodash';
import {inputShadow} from '../../actions';
import {showToast} from '../../actions/types';

import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import firebase from 'firebase';
import Autocomplete from 'react-google-autocomplete';


import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

/* eslint-disable react/prop-types */
const renderSuggestion = ({ formattedSuggestion }) => (
  <div className="Demo__suggestion-item">
    <i className="fa fa-map-marker Demo__suggestion-icon" />
    <strong>{formattedSuggestion.mainText}</strong>{' '}
    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
  </div>
);
/* eslint-enable react/prop-types */

const renderFooter = () => (
  <div className="Demo__dropdown-footer">
    <div>
      <img
        className="Demo__dropdown-footer-image"
      />
    </div>
  </div>
);

const cssClasses = {
  autocompleteContainer: 'Demo__autocomplete-container',
};

const shouldFetchSuggestions = ({ value }) => value.length > 2;

const onError = (status, clearSuggestions) => {
  /* eslint-disable no-console */
  console.log(
    'Error happened while fetching suggestions from Google Maps API',
    status
  );
  /* eslint-enable no-console */
  clearSuggestions();
};



class EditDeviceComponent extends Component {
    state = {isLoading:true,menuActive: false,isSubmitted:false,location:"",is_location_active:false};
    constructor(props) {
        super(props);
        this.state = {
          address: '',
          geocodeResults: null
        };
    
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    componentWillMount()
    {
        firebase.auth().onAuthStateChanged((user)=>
        {
            this.setState({isLoading:false})
            this.props.getCountry();

            if(user)
            {
                if(user.emailVerified)
                {
                    this.props.getDevicesByDeviceIdForEditDevice(this.props.match.params.device_id,(data)=>{

                        if(data.device_id)
                        {
                            this.props.getDevicesByDeviceId(data.device_id);
                        }
                        if(data.tank_city)
                        {
                
                            this.props.getArea(data.tank_city);
                        }
                        if(data.tank_country)
                        {
                            this.props.getCity(data.tank_country);
                        }
                        if(data.tank_location){
                            this.setState({address:data.tank_location})
                        }
                    })
                   
                }
            }
        });

    }



    /*
@Method : validateFirstSpace
@Params :
@Returns : *
*/
    validateFirstSpace(text)
    {
        let myString = text;

        let spacesAtStart = myString.length - myString.trimLeft().length

        return spacesAtStart;
    }





    /*
 @Method : onButtonPress
 @Params :
 @Returns : *
 */
    onButtonPress() {
        this.setState({isSubmitted: true})
        const {tank_country,uid,device_id, device_name,tank_name,tank_location,tank_height,tank_width,tank_depth,tank_type,tank_city,tank_area} = this.props;
        if(!(device_name))
        {
            showToast('danger',"Device Name is not valid");


        }
        else if(!(tank_country))
        {
            showToast('danger',"Please select Country");

        }
        else if(!(tank_location))
        {
            showToast('danger',"Please add tank location");

        }
        else
        {
            if (tank_country && device_id && device_name && tank_name && tank_location && tank_height && tank_width && tank_city && tank_area && tank_city && tank_area) {
                    this.props.updateDeviceDetails({tank_country,uid,device_id, device_name,tank_name,tank_location,tank_height,tank_width,tank_depth:"",tank_type,tank_city,tank_area});
                }

        }

    }

    /*
@Method : onDeviceIdChanged
@Params :
@Returns : *
*/
    onDeviceIdChanged(text) {
        this.props.onDeviceIdChanged(text);
    }


    /*
@Method : onDeviceNameChanged
@Params :
@Returns : *
*/
    onDeviceNameChanged(text) {
        this.props.onDeviceNameChanged(this.validateText(text));
        this.props.onTankNameChanged(text);
    }

    /*
@Method : validateNumber
@Params :
@Returns : *
*/
    validateText(text) {


        return text;
    }


    /*
@Method : renderAreaData
@Params :
@Returns : *
*/
    renderAreaData() {
        return (
                <select className="p-l20"  placeholder="Select Area" selected={this.props.tank_area}
                    onChange={(event) => {
                    if(event.target.value){
                       this.onTankAreaChanged(event.target.value)

                    }
               }}
                  value={this.props.tank_area}
                 >

                    {
                        _.map(this.props.area, (val, i) => {
                            return (
                                <option  key={val.id} value={val.id} label={val.name}/>
                            )
                        })
                    }
                </select>
        );

    }

    /*
@Method : renderDropDownIcon
@Params :
@Returns : *
*/
    renderDropDownIcon() {
        if (Platform.OS === 'ios') {
            return (
                <Icon  style={{color:"#b3c7f9",position:"absolute",top:10,right:0,zIndex:-1}} name='md-arrow-dropdown'/>

            )
        }
    }


    /*
@Method : renderCountryData
@Params :
@Returns : *
*/
    renderCountryData() {
        return (
                <select placeholder="Select Country" className="p-l20" selected={this.props.tank_country}
                        onChange={(event) => {
                            if(event.target.value){
                               this.onTankContryChanged(event.target.value)
   
                            }
                       }}
                        value={this.props.tank_country}
                        >

                    {
                        _.map(this.props.country, (val, i) => {
                            return (
                                <option  key={val.id} value={val.id} label={val.name}/>
                            )
                        })
                    }
                </select>
        );

    }

    /*
@Method : renderCityData
@Params :
@Returns : *
*/
    renderCityData() {
        return (
                <select className="p-l20" placeholder="Select City" selected={this.props.tank_city}
                        onChange={(event) => {
                            if(event.target.value){
                               this.onTankCityChanged(event.target.value)
   
                            }
                       }}
                        value={this.props.tank_city}
                        >

                    {
                        _.map(this.props.city, (val, i) => {
                            return (
                                <option key={val.id} value={val.id} label={val.name}/>
                            )
                        })
                    }
                </select>
        );

    }

    /*
@Method : validateAddress
@Params :
@Returns : *
*/
    validateAddress(text) {
      
        return text;
    }

    /*
  @Method : validateNumber
  @Params :
  @Returns : *
  */
    validateNumber(text) {
        let newText = '';
        let numbers = '0123456789.';

        for (var i = 0; i < text.length; i++) {
            if ( numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }

        return newText;
    }
    /*
@Method : onTankLocationChanged
@Params :
@Returns : *
*/
    onTankLocationChanged(text) {
        this.props.onTankLocationChanged(this.validateAddress(text));
    }

    /*
@Method : onTankHeightChanged
@Params :
@Returns : *
*/
    onTankHeightChanged(text) {
        this.props.onTankHeightChanged(this.validateNumber(text));
    }

    /*
@Method : onTankWidthChanged
@Params :
@Returns : *
*/
    onTankWidthChanged(text) {
        this.props.onTankWidthChanged(this.validateNumber(text));
    }

    /*
@Method : onTankDepthChanged
@Params :
@Returns : *
*/
    onTankDepthChanged(text) {
        this.props.onTankDepthChanged(this.validateNumber(text));
    }

    /*
@Method : onTankTypeChanged
@Params :
@Returns : *
*/
    onTankTypeChanged(text) {
        this.props.onTankTypeChanged(text);
    }

    /*
@Method : onTankCityChanged
@Params :
@Returns : *
*/
    onTankCityChanged(id) {
        this.props.onTankCityChanged(id);
        this.props.getArea(id);
    }

    /*
@Method : onTankContryChanged
@Params :
@Returns : *
*/
    onTankContryChanged(id) {
        this.props.onTankContryChanged(id);
        this.props.getCity(id);
    }


    /*
@Method : onTankAreaChanged
@Params :
@Returns : *
*/
    onTankAreaChanged(id) {
        this.props.onTankAreaChanged(id);
    }


    /*
@Method : renderDepth
@Params :
@Returns : *
*/
    renderDepth()
    {
        if(this.props.tank_type == 'horizontal_capsule')
        {
            return (
                <Col style={{paddingLeft:7}}>
                        <Number placeholder="Depth(Mtr)" label="Depth(Mtr)"
                                onChangeText={this.onTankDepthChanged.bind(this)} value={this.props.tank_width}
                                isSubmitted={this.state.isSubmitted}/>
                </Col>
            );
        }
    }

    /*
    @Method : renderAction
    @Params :
    @Returns : *
    */
    renderAction() {

        if (this.props.loading) {
            return (
                <Spinner size="small"/>
            )
        }
        else {
            return (
                <input type="button" onClick={this.onButtonPress.bind(this)} className="btn-blue-block btn" value="Save" title="Submit" />
            );
        }
    }

    /*
@Method : renderActionDelete
@Params :
@Returns : *
*/
    renderActionDelete() {

        if (this.props.loading) {
            return (
                <Spinner size="small"/>
            )
        }
        else {
            return (
                <input type="button" onClick={this.onButtonPressDelete.bind(this)} className="btn-red-block btn" value="Delete" title="Submit" />
            );
        }

    }


    /*
@Method : onButtonPressDelete
@Params :
@Returns : *
*/
    onButtonPressDelete() {
        const {uid,master_id} = this.props;
        if((master_id) || (master_id != undefined))
        {

          let  confirmDelete = confirm("Are you sure,you want to delete this device ?");
           if (confirmDelete == true) {
           this.props.deleteDeviceDetails({uid,master_id});

          }

        }
        else
        {
          let  confirmDelete = confirm("Are you sure,you want to delete this device ?");
           if (confirmDelete == true) {
               this.props.deleteDeviceDetails({uid,master_id:""});
            }

        }


    }

        /*
@Method : renderTankImage
@Params :
@Returns : *
*/

    renderTankImage(){
        if(this.props.tank_type == 'vertical')
        {
            return (
                <img src={'/public/images/water_level_app-2_april/tank_image/centre_align/tank_opt1.png'}  />
            );
        }
        else{
            return (
                <img src={'/public/images/water_level_app-2_april/tank_image/centre_align/tank_opt2.png'}  />
            );

        }

    }

    /*
@Method : onSideMenuChange
@Params :
@Returns : *
*/
    onSideMenuChange() {
        this.setState({menuActive: true});
    }
    /*
@Method : renderBackButton
@Params :
@Returns : *
*/
    renderBackButton(){
        if (Platform.OS === 'ios') {
            return (
                <Icon  style={{color:"#fff"}} name='ios-arrow-back'/>
            )
        }

    }
    /*
     @Method : renderContent
     @Params :
     @Returns : *
     */
    renderContent() {
        return (

                <Form style={formStyle}>
                    <View style={formStyle.formInputs}>
                        <Input isShadow={true} isDisabled={true}  placeholder="Device Id" label="Device Id" iconName="md-tablet-portrait"
                                onChangeText={this.onDeviceIdChanged.bind(this)} value={this.props.device_id}
                                isSubmitted={this.state.isSubmitted}/>
                    </View>
                    <View style={formStyle.formInputs}>
                    
                        <Input placeholder="Device Name" label="Device Name" iconName="md-pint"
                               onChangeText={this.onDeviceNameChanged.bind(this)} value={this.props.device_name}
                               isSubmitted={this.state.isSubmitted}/>
                    </View>
                    <View style={formStyle.formInputs}>
                        <CardSection value={this.props.tank_country} isSubmitted={this.state.isSubmitted}>
                            {this.renderCountryData()}
                        </CardSection>
                    </View>
                    <View style={formStyle.formInputs}>
                        <CardSection value={this.props.tank_city} isSubmitted={this.state.isSubmitted}>
                            {this.renderCityData()}
                        </CardSection>
                    </View>
                    <View style={formStyle.formInputs}>
                        <CardSection value={this.props.tank_area} isSubmitted={this.state.isSubmitted}>
                                {this.renderAreaData()}
                        </CardSection>
                    </View>
                    <View style={formStyle.formInputs}>
                        <GooglePlacesAutocomplete
                            placeholder='Search Location'
                            minLength={2}
                            autoFocus={false}
                            returnKeyType={'search'}
                            listViewDisplayed='false'    // true/false/undefined

                            fetchDetails={true}
                            renderDescription={row => row.description}
                            onPress={(data, details = null) => {
                                this.onTankLocationChanged(data.description)
                            }}
                            getDefaultValue={() => this.props.tank_location}

                            query={{
                                key: 'AIzaSyAiTCtvTSA9JGq0f6oPWVCtsocDi91bu6o',
                                language: 'en'
                            }}

                            styles={{
                                textInputContainer: {
                                    borderWidth:0,
                                    backgroundColor:'#fff',
                                    borderRadius:100,
                                    justifyContent:'flex-start',
                                    flexDirection:'row',
                                    borderColor:'#ddd',
                                    elevation: 3,
                                    marginBottom:3,
                                    shadowOpacity: 0.3,
                                    borderBottomWidth:0.3,
                                    borderTopWidth:0.3,
                                    height:50
                                },
                                textInput: {
                                    color: '#949dac',
                                    fontSize: 14,
                                    height:30
                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#949dac'
                                }
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch'
                            GoogleReverseGeocodingQuery={{
                            }}
                            GooglePlacesSearchQuery={{

                            }}
                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                            debounce={200}

                        />
                    </View>

                    <View style={formStyle.formInputs}>
                        <CardSection value={this.props.tank_type} isSubmitted={this.state.isSubmitted}>
                                <Item rounded style={{borderColor:"#fff"}}>
                                    <Picker   headerBackButtonTextStyle={{ paddingTop:10 }} headerBackButtonText={this.renderBackButton()}   selectedValue={this.props.tank_type} onValueChange={this.onTankTypeChanged.bind(this)} value={this.props.tank_type}
                                       mode="dropdown" style={dropdownPickerForDevice}>
                                        <Picker.Item value="" label="Select Tank Type"/>
                                        <Picker.Item value="vertical" label="Vertical Cylinder"/>
                                        <Picker.Item value="horizontal" label="Horizontal Cylinder"/>
                                        <Picker.Item value="horizontal_capsule" label="Horizontal Capsule Cylinder"/>
                                    </Picker>
                                    {this.renderDropDownIcon()}
                                </Item>
                        </CardSection>
                    </View>
                    <View style={formStyle.formInputs}>
                        {this.renderTankImage()}
                    </View>
                    <View style={formStyle.formInputs}>
                        <Grid>
                            <Col style={{paddingRight:7}}>
                                    <Number placeholder="Height(Mtr)" label="Height(Mtr)"
                                            onChangeText={this.onTankHeightChanged.bind(this)} value={this.props.tank_height}
                                            isSubmitted={this.state.isSubmitted}/>
                            </Col>
                            <Col style={{paddingLeft:7}}>
                                    <Number placeholder="Width(Mtr)" label="Width(Mtr)"
                                            onChangeText={this.onTankWidthChanged.bind(this)} value={this.props.tank_width}
                                            isSubmitted={this.state.isSubmitted}/>

                            </Col>
                        </Grid>
                    </View>
                    <View>
                        {this.renderAction()}
                    </View>
                    <View style={{paddingTop:10}}>
                        {this.renderActionDelete()}
                    </View>

                </Form>

        );
    }

                /*
@Method : renderErrorDeviceName
@Params :
@Returns : *
*/



  renderErrorDeviceName = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Device Name is required</div>
                </div>
            )
        }
    }


                 /*
@Method : renderErrorDeviceName
@Params :
@Returns : *
*/


  renderErrorDeviceName = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Device Name is required</div>
                </div>
            )
        }
    }

 /*
@Method : renderErrorDeviceWidth
@Params :
@Returns : *
*/

    renderErrorDeviceWidth = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Device Width is required</div>
                </div>
            )
        }
    }


 /*
@Method : renderErrorDeviceHeight
@Params :
@Returns : *
*/
    renderErrorDeviceHeight = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Device Height is required</div>
                </div>
            )
        }
    }



  handleSelect(address) {
    this.setState({
      address
        });

   this.onTankLocationChanged(address);


    // geocodeByAddress(address)
    //   .then(results => getLatLng(results[0]))
    //   .then(({ lat, lng }) => {
    //     console.log('Geocode Success', { lat, lng }); // eslint-disable-line no-console
    //     this.setState({
    //       geocodeResults: this.renderGeocodeSuccess(lat, lng),
    //       loading: false,
    //     });
    //   })
    //   .catch(error => {
    //     console.log('Geocode Error', error); // eslint-disable-line no-console
    //     this.setState({
    //       geocodeResults: this.renderGeocodeFailure(error),
    //       loading: false,
    //     });
    //   });
  }

  

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    );
}


handleChange(address) {
    this.setState({
      address,
      geocodeResults: null,
    });
  }
            /*
@Method : renderLocation
@Params :
@Returns : *
*/
    renderLocation() {

        const inputProps = {
            type: 'text',
            value: this.state.address,
            onChange: this.handleChange,
            onBlur: () => {
              console.log('Blur event!'); // eslint-disable-line no-console
            },
            onFocus: () => {
              console.log('Focused!'); // eslint-disable-line no-console
            },
            autoFocus: true,
            placeholder: 'Search Places',
            name: 'Demo__input',
            id: 'my-input-id',
          };

        return (
            <div>
              <PlacesAutocomplete
                renderSuggestion={renderSuggestion}
                renderFooter={renderFooter}
                inputProps={inputProps}
                classNames={cssClasses}
                onSelect={this.handleSelect}
                onEnterKeyDown={this.handleSelect}
            
              />
            </div>
          );
    //    return (
    //     <Autocomplete
    //     placeholder='Search Location'
    //     onPlaceSelected={(place) => {
    //       this.onTankLocationChanged(place.formatted_address);
    //     }}

    //     placeholder='Search Location'
    //     />
    //    );
      }

            /*
@Method : renderContentData
@Params :
@Returns : *
*/
   renderContentData(){
    if(this.props.loading || this.state.isLoading)
    {
        return (
            <Spinner size="large"/>
        )
    }
    else{
        return (
            <div className="row">
            <div className="columns medium-12">
                <div className="card-panel">
                    <div className="form-comman">
                        <form>
                            <div className="form-group">
                                <label><i className="fa fa-mobile" aria-hidden="true"></i></label>
                                <input maxLength={80} type="text" placeholder="Device Id" name="DeviceId" disabled="true"
                                value={this.props.device_id}   />
                            </div>

                              <div className="form-group">
                                <label><i className="fa fa-flask" aria-hidden="true"></i></label>
                                <input maxLength={80} type="text" placeholder="Device Name"  onChange={(event)=>{
                                                           this.onDeviceNameChanged(event.target.value)

                                                       }} name="DeviceName"  
                                value={this.props.device_name}   />
                               {this.renderErrorDeviceName(this.state.isSubmitted,this.props.device_name)}

                            </div>

                             <div className="form-group">
                                {this.renderCountryData()}
                            </div>


                             <div className="form-group">
                                
                                {this.renderCityData()}
                            </div>

                               <div className="form-group">
                                
                                {this.renderAreaData()}
                            </div>

                               <div className="form-group">
                               
                                 {this.renderLocation()}
                            </div>

                            

    
                            <div className="form-group">
                               
                                <select className="p-l20" selected={this.props.tank_type}
                                  onChange={(event)=>{
                                    this.onTankTypeChanged(event.target.value)

                                }}
                                 value={this.props.tank_type}>
                                        <option value="vertical" label="Vertical Cylinder"/>
                                        <option value="horizontal" label="Horizontal Cylinder"/>
                                        <option value="horizontal_capsule" label="Horizontal Capsule Cylinder"/>
                               </select>
                            </div>

                             <div className="form-group text-center">
                               {this.renderTankImage()}
                              </div>
                              
                            <div className="form-group">
                                <ul className="medium-block-grid-2 small-block-grid-2">
                                    <li>
                                      <input maxLength={3} type="text" placeholder="Height(Mtr)"  onChange={(event)=>{
                                                           this.onTankHeightChanged(event.target.value)

                                                       }} name="Height(Mtr)"  
                                value={this.props.tank_height}  className="text-center"  />
                                     {this.renderErrorDeviceHeight(this.state.isSubmitted,this.props.tank_height)}
                                     
                                      </li>
                                    <li>
                                    <input maxLength={3}  type="text" placeholder="Width(Mtr)"  onChange={(event)=>{
                                                           this.onTankWidthChanged(event.target.value)

                                                       }} name="Width(Mtr)"  
                                value={this.props.tank_width}  className="text-center"  />
                                 {this.renderErrorDeviceWidth(this.state.isSubmitted,this.props.tank_width)}

                                     </li>
                                </ul>
                            </div>
                            <p className="text-center p-18x">Tank Capacity: (Computed by system in ltr)</p>


                             <div className="form-group text-center">
                                <ul className="medium-block-grid-2 small-block-grid-2">
                                    <li>
                                      {this.renderAction()}


                                      </li>
                                    <li>
                                    {this.renderActionDelete()}

                                     </li>
                                </ul>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }

    }
        /*
@Method : render
@Params :
@Returns : *
*/
render() {
    return (
        <div>
            <Header />
            <div className="row">
                <div className="columns medium-12">
                    <h1 className="page-title">Edit Details</h1>
                </div>
            </div>
            {this.renderContentData()}
            <LedtNavigation />
        </div>
    )
}
}


const styles = {
    containerBackgroundColor:{
        backgroundColor: '#fbfbfe'
    },
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordButtonCardItemStyle:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        fontWeight:'bold'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    
}
const mapStateToProps = ({device}) => {
    const {master_id,tank_city,tank_area,city,area,uid,device_id, device_name,tank_name,tank_location,loading,tank_height,tank_width,tank_depth,tank_type,country,tank_country} = device;

    return {master_id,tank_city,tank_area,city,area,uid,device_id, device_name,tank_name,tank_location,loading,tank_height,tank_width,tank_depth,tank_type,country,tank_country};
};

export default connect(mapStateToProps, {getDevicesByDeviceIdForEditDevice,getDevicesByDeviceId,onDeviceIdChanged,onDeviceNameChanged,onTankNameChanged,onTankLocationChanged,onTankHeightChanged,onTankWidthChanged,onTankDepthChanged,updateDeviceDetails,onTankTypeChanged,onTankCityChanged,onTankAreaChanged,getCity,getArea,deleteDeviceDetails,onTankContryChanged,getCountry})(EditDeviceComponent);