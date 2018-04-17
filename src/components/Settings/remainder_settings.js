import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Spinner} from "../common";
import {OnTitleChanged,addReminderSettings,getUserDetailsForSettings,OnFromDateChanged,OnToDateChanged,OnIntervalInMinutesChanged,OnRepeatChanged,OnRepeatDurationChanged,OnAlertLevelChanged,OnIntervalInMinutesChangedForMinutes,OnIntervalInMinutesChangedForHours} from '../../actions';
import _ from 'lodash';
import DatePicker from 'react-datepicker';
import {showToast,alerts,minutes,hours} from '../../actions/types';
import firebase from 'firebase';
import Header from '../templates/header';
import LedtNavigation from '../templates/left_navigation';
import moment from 'moment';

class ReminderSetting extends Component {
    state = {isLoading:true,menuActive: false,isSubmitted:false,interval_in_minutes_for_minutes:"",interval_in_minutes_for_hours:""};

    componentWillMount()
    {
        firebase.auth().onAuthStateChanged((user)=>
        {
            this.setState({isLoading:false})
            if(user)
            {
                if(user.emailVerified)
                {
                    if(this.props.match.params.device_id)
                    {
                        this.props.getUserDetailsForSettings(this.props.match.params.device_id);
                    }
                }
            }
        });
     
    }

    componentDidMount(){
       // alert(this.props.interval_in_minutes)
    }


    /*
@Method : validateFirstSpace
@Params :
@Returns : *
*/
    validateFirstSpace(text)
    {

        return text;
    }

    /*
 @Method : onButtonPress
 @Params :
 @Returns : *
 */
    onButtonPress() {
        this.setState({isSubmitted: true})
        const {title,from_date,to_date,repeat_duration,alert_level_change,repeat,uid,interval_in_minutes_for_hours,interval_in_minutes_for_minutes} = this.props;
        let device_id = this.props.match.params.device_id;
        let interval_in_minutes = ""
      if(this.props.interval_in_minutes_for_minutes == 0 && this.props.interval_in_minutes_for_hours == 0){
            showToast('danger',"Please select minutes or hours");

        }
        else
        {
            if((this.props.interval_in_minutes_for_hours !== "" && this.props.interval_in_minutes_for_minutes !== "") || (this.props.interval_in_minutes_for_hours !== "0" && this.props.interval_in_minutes_for_minutes !== "0")){
                interval_in_minutes = parseFloat(this.props.interval_in_minutes_for_hours)  * 60
                if(this.props.interval_in_minutes_for_minutes){

                    interval_in_minutes = parseFloat(this.props.interval_in_minutes_for_hours)  * 60 + parseFloat(this.props.interval_in_minutes_for_minutes);

                }

                    if(new Date(from_date) > new Date(to_date))
                    {
                        showToast('danger',"From-Date can not be greater than To-Date");
                    }
                    else
                    {
                        if (device_id && title && from_date && to_date && interval_in_minutes && repeat_duration && alert_level_change && uid) {
                            this.props.addReminderSettings({interval_in_minutes_for_hours,interval_in_minutes_for_minutes,device_id,title,from_date,to_date,interval_in_minutes,repeat_duration,alert_level_change,repeat,uid});
                        }
                    }
                

            }
            else
            {
                showToast('danger',"Please select minutes or hours");
            }

        }

    }

    /*
@Method : validateText
@Params :
@Returns : *
*/
    validateText(text) {
   

        return text;
    }


    /*
  @Method : OnTitleChanged
  @Params :
  @Returns : *
  */
    OnTitleChanged(text) {
        this.props.OnTitleChanged(this.validateText(text));
    }

  /*
@Method : OnFromDateChanged
@Params :
@Returns : *
*/
    OnFromDateChanged(text) {
        text =  moment(text).format('YYYY-MM-DD');
        this.props.OnFromDateChanged(text);
        this.props.OnToDateChanged(text);

    }


    /*
@Method : OnToDateChanged
@Params :
@Returns : *
*/
    OnToDateChanged(text) {
        this.props.OnToDateChanged(text);
    }

    /*
@Method : OnIntervalInMinutesChanged
@Params :
@Returns : *
*/
    OnIntervalInMinutesChanged(type,text) {
        if(type == "minutes")
        {
            this.props.OnIntervalInMinutesChangedForMinutes(text);
        }
        else
        {
            this.props.OnIntervalInMinutesChangedForHours(text);

        }

        // interval_in_minutes_for_hours
        // this.props.OnIntervalInMinutesChanged(this.validateNumber(text));
    }


    /*
@Method : OnRepeatChanged
@Params :
@Returns : *
*/
    OnRepeatChanged(text) {
        this.props.OnRepeatChanged(text);
    }

    /*
@Method : OnRepeatDurationChanged
@Params :
@Returns : *
*/
    OnRepeatDurationChanged(text) {
        this.props.OnRepeatDurationChanged(this.validateNumber(text));
    }

    /*
@Method : OnAlertLevelChanged
@Params :
@Returns : *
*/
    OnAlertLevelChanged(text) {
        this.props.OnAlertLevelChanged(text);
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
               <input type="button"  onClick={this.onButtonPress.bind(this)} className="btn-blue-block btn" value="save" title="Submit" />

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
@Method : validateNumber
@Params :
@Returns : *
*/

validateNumber(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
        if ( numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
    }

    return newText;
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
@Method : renderAreaData
@Params :
@Returns : *
*/
    renderIntervalInHours() {
        return (
                    <select 
                            placeholder="Select Hours"
                            selected={this.props.interval_in_minutes_for_hours}
                           
                            onChange={(event) => {
                                if(event.target.value){
                                   this.OnIntervalInMinutesChanged("hours",event.target.value)
       
                                }
                           }}
                            value={this.props.interval_in_minutes_for_hours} >

                        {
                            _.map(hours, (val, i) => {
                                return (
                                    <option key={val} value={val} label={`${val}`}/>
                                )
                            })
                        }

                    </select>
    
        );
    }



    /*
@Method : renderAreaData
@Params :
@Returns : *
*/
    renderIntervalInMinutes() {
        return (
                    <select 
                            placeholder="Select Minutes"
                            selected={this.props.interval_in_minutes_for_minutes}
                        
                            onChange={(event) => {
                                if(event.target.value){
                                   this.OnIntervalInMinutesChanged("minutes",event.target.value)        
                                }
                           }}
                            value={this.props.interval_in_minutes_for_minutes} >

                        {
                            _.map(minutes, (val, i) => {
                                return (
                                    <option key={val} value={val} label={`${val}`}/>
                                )
                            })
                        }

                    </select>
        
        );
    }


    /*
@Method : renderAreaData
@Params :
@Returns : *
*/
    renderAlertLevel() {
        return (
                <select 
                        placeholder="Select Alert Level"
                        selected={this.props.alert_level_change}
                        onChange={(event) => {
                            if(event.target.value){
                               this.OnAlertLevelChanged(event.target.value)        
                            }
                       }}
                        value={this.props.alert_level_change} >

                    {
                        _.map(alerts, (val, i) => {
                            return (
                                <option key={val} value={val} label={`${val} %`}/>
                            )
                        })
                    }

                </select>
        );
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
                            <Input placeholder="Title" label="Title" iconName="ios-paper" onChangeText={this.OnTitleChanged.bind(this)} value={this.props.title} isSubmitted={this.state.isSubmitted}/>
                        </View>

                        <View style={formStyle.formInputs}>
                            <Grid>
                                <Col style={{paddingTop:10}} size={30}>
                                    <Text>From Date</Text>
                                </Col>
                                <Col style={{paddingRight:5}} size={70}>
                                    <DatePickerInput minDate={new Date()} placeholder="From Date" label="From Date" iconName="calendar"
                                                     onDateChange={this.OnFromDateChanged.bind(this)} value={this.props.from_date}
                                                     isSubmitted={this.state.isSubmitted} style={{color:"#949dac"}}/>
                                </Col>
                            </Grid>

                        </View>
                        <View style={formStyle.formInputs}>

                            <Grid>
                                <Col style={{paddingTop:10}} size={30}>
                                    <Text>Alert Level</Text>
                                </Col>
                                <Col style={{paddingLeft:5}} size={70}>
                                    {this.renderAlertLevel()}

                                </Col>
                            </Grid>
                        </View>
                        <View style={formStyle.formInputs}>
                            <Grid>
                                <Col style={{paddingTop:10}} size={30}>
                                    <Text>Hours</Text>
                                </Col>
                                <Col style={{paddingLeft:5}}  size={70}>
                                    {this.renderIntervalInHours()}

                                </Col>
                            </Grid>

                        </View>
                        <View style={formStyle.formInputs}>
                            <Grid>
                                <Col style={{paddingTop:10}} size={30}>
                                    <Text>Minutes</Text>
                                </Col>
                                <Col style={{paddingLeft:5}} size={70}>
                                    {this.renderIntervalInMinutes()}

                                </Col>
                            </Grid>

                        </View>

                        <View style={formStyle.formInputs}>
                            <Content>
                                <Item style={{borderBottomWidth:0,paddingTop:5,paddingBottom:5}}>
                                    <Text>
                                        Repeat
                                    </Text>
                                    <Right>
                                        <Switch onValueChange={this.OnRepeatChanged.bind(this)} value={this.props.repeat} />
                                    </Right>
                                </Item>
                            </Content>
                        </View>
                        <View style={formStyle.formInputs}>
                            <Number  placeholder="Repeat Duration" label="Repeat Duration" iconName="md-repeat"
                                    onChangeText={this.OnRepeatDurationChanged.bind(this)} maxLength={3} value={this.props.repeat_duration}
                                    isSubmitted={this.state.isSubmitted}/>
                        </View>
                        <View>
                            {this.renderAction()}
                        </View>
                    </Form>
                
        );
    }


      /*
     @Method : renderErrorTitle
     @Params :
     @Returns : *
     */
renderErrorTitle = (isSubmitted,value)=>
{
    if(isSubmitted && (value == ''))
    {
        return (
            <div style={{flex:1}}>
                <div style={{color:'red'}}>Title is required</div>
            </div>
        )
    }

}

      /*
     @Method : renderErrorRepeat
     @Params :
     @Returns : *
     */
    renderErrorRepeat = (isSubmitted,value)=>
    {
        if(isSubmitted && (value == ''))
        {
            return (
                <div style={{flex:1}}>
                    <div style={{color:'red'}}>Repeat Duration is required</div>
                </div>
            )
        }
    
    }


  /*
     @Method : renderContentData
     @Params :
     @Returns : *
     */

    renderContentData(){
        return ( 
                 <div className="row">
                        <div className="columns medium-12">
                            <div className="card-panel">
                                <div className="form-comman">
                                    <form>
                                        <div className="form-group">
                                            <label><i className="fa fa-bars" aria-hidden="true"></i></label>
                                            <input type="text"
                                                maxLength={100}
                                                placeholder="Title"
                                                       name="title"
                                                       onChange={(event)=>{
                                                           this.OnTitleChanged(event.target.value)

                                                       }} value={this.props.title}
                                                />
                                          {this.renderErrorTitle(this.state.isSubmitted,this.props.title)}

                                        </div>
            
                                        <div className="form-group">
                                        <label><i className="fa fa-calendar-o" aria-hidden="true"></i></label>
                                        <DatePicker   minDate={new Date()} selected={moment(this.props.from_date)}  onChange={(dateValue) => {
                                         if(dateValue){
                                            this.OnFromDateChanged(dateValue)        
                                         }
                                      }} />
                                   
                                        </div>
                                    
                                        <div className="repeat"><span className="txt">Repeat</span>
                                            <label className="switch">
                                                <input type="checkbox" checked={this.props.repeat}
                                                 onChange={(event) => {
                                                    this.OnRepeatChanged(event.target.checked)
                                                }}
                                                 value={this.props.repeat}/>
                                                
                                                    <span className="slider round"></span>
                                            </label>
                                        </div>
                
                                        <ul className="medium-block-grid-2 small-block-grid-1">
                                        <li className="p-b0"> <div className="form-group">
                                            <label><i className="fa fa-retweet" aria-hidden="true"></i></label>
                                            {this.renderIntervalInHours()}
                                        </div></li>
                                        <li className="p-b0"><div className="form-group">
                                            <label><i className="fa fa-retweet" aria-hidden="true"></i></label>
                                            {this.renderIntervalInMinutes()}
                                        </div></li>
                                    </ul>

                                       <div className="form-group">
                                            <label><i className="fa fa-clock-o" aria-hidden="true"></i></label>
                                            <input type="text" placeholder="Repeat Duration" name="RepeatDuration" 
                                      onChange={(event)=>{
                                        this.OnRepeatDurationChanged(event.target.value)

                                    }}
                                    maxLength={3} value={this.props.repeat_duration}
                                    />
                                   {this.renderErrorRepeat(this.state.isSubmitted,this.props.repeat_duration)}

                                        </div>
    
                                        <div className="form-group">
                                            <label><i className="fa fa-bell" aria-hidden="true"></i></label>
                                            {this.renderAlertLevel()}
                                        </div>
    
                                        <div className="form-group text-center">
                                        {this.renderAction()}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                </div>
            
        );

    }
    /*
@Method : render
@Params :
@Returns : *
*/
render() {
    return (
        <div>
            <div className="row">
                <div className="columns medium-12">
                <Header />
                <h1 className="page-title">Reminder Settings</h1>
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
    }
}
const mapStateToProps = ({setting}) => {
    const {title,from_date,to_date,interval_in_minutes,repeat_duration,error,alert_level_change,repeat,loading,uid,interval_in_minutes_for_hours,interval_in_minutes_for_minutes} = setting;
    // let from_date = moment(new Date()).format('YYYY-MM-DD');
    //  if(setting.from_date){
    //     from_date = moment(new Date(setting.from_date)).format('YYYY-MM-DD'); 
    //  }
    return {title,from_date,to_date,interval_in_minutes,repeat_duration,error,alert_level_change,repeat,loading,uid,interval_in_minutes_for_hours,interval_in_minutes_for_minutes};

};

export default connect(mapStateToProps, {addReminderSettings,getUserDetailsForSettings,OnTitleChanged,OnFromDateChanged,OnToDateChanged,OnIntervalInMinutesChanged,OnRepeatChanged,OnRepeatDurationChanged,OnAlertLevelChanged,OnIntervalInMinutesChangedForMinutes,OnIntervalInMinutesChangedForHours})(ReminderSetting);