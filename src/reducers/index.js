import {combineReducers} from 'redux';
import AuthReducer from './Auth/AuthReducer';
import  DeviceReducer from './Device/DeviceReducer';
import  SettingReducer from './Setting/SettingReducers';
import UtilityReducers from './Utility/UtilityReducers';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
auth:AuthReducer,
device:DeviceReducer,
setting:SettingReducer,
utility:UtilityReducers,
toastr: toastrReducer

});