import React, {Component} from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase';
import {getSuppliers, likeSupplier, getSearchSupplier, getLocalSearchSupplierList} from '../../actions';
import Header from './../templates/header';
import LedtNavigation from './../templates/left_navigation';
import _ from 'lodash';
import {Spinner} from '../common';
import CircularProgressbar from 'react-circular-progressbar';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {showToast} from '../../actions/types';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Supplier extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            isFilterShow: false,
            isSearchClicked: false,
            isMapActive: false,
            isCheckedAll: true,
            latitude: 23.8859,
            longitude: 45.0792,
            isLoading: true,
            supplierFilterValue: [true, true, true, true],
            showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
        }
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });

      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    /*
@Method : componentWillMount
@Params :
@Returns : *
*/
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({isLoading: false})
            if (user) {
                //if ((this.props.tankCity != undefined && this.props.tankArea != undefined) && (this.props.tankCity && this.props.tankArea)) {
                this.props.getSearchSupplier([true, true, true, true], '-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
                //}
            }
        });

    }


    /*
@Method : filter
@Params :
@Returns : *
*/
    filter(text) {
        let filteredDevices = this.props.suppliersTemp.filter(supplier => {
            if (!(supplier.company_name == undefined)) {
                return ((supplier.company_name.indexOf(text) > -1) || ((supplier.company_name.toLowerCase().indexOf(text) > -1)));
            }
            else {
                return {};
            }
        });
        this.props.getLocalSearchSupplierList({"search": filteredDevices});


    }

    /*
@Method : removeInvalidChars
@Params :
@Returns : *
*/
    removeInvalidChars(text) {
        let newText = '';
        let numbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
        }

        return newText;
    }

    /*
@Method : onChangeSearch
@Params :
@Returns : *
*/
    onChangeSearch(text) {
        if (text) {
          text = text.target.value;
            this.setState({searchText: this.removeInvalidChars(text)});
            this.filter(this.removeInvalidChars(text));
        }
        else {
            this.setState({searchText: ""});
            this.props.getSearchSupplier([true, true, true, true], '-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
        }
    }

    /*
@Method : setSupplierFilterValue
@Params :
@Returns : *
*/

    setSupplierFilterValue(index) {
        let tempSupplierFilter = this.state.supplierFilterValue;
        tempSupplierFilter[index] = !(tempSupplierFilter[index]);
        if (tempSupplierFilter[0] && tempSupplierFilter[1] && tempSupplierFilter[2] && tempSupplierFilter[3]) {
            this.setState({isCheckedAll: true});
        }
        else {
            this.setState({isCheckedAll: false});
        }
        this.setState({supplierFilterValue: tempSupplierFilter})
    }

    /*
@Method : setSupplierFilterValueWithCheckAll
@Params :
@Returns : *
*/

    setSupplierFilterValueWithCheckAll() {
        let tempSupplierFilter = [true, true, true, true];
        let isCheckedAll = !(this.state.isCheckedAll);
        if (isCheckedAll == false) {
            tempSupplierFilter = [false, false, false, false];
        }
        this.setState({supplierFilterValue: tempSupplierFilter})
        this.setState({isCheckedAll: isCheckedAll});
    }

    /*
    @Method : renderMarkers
    @Params :
    @Returns : *
    */
    renderMarkers() {
      if (this.props.loading || this.state.isLoading) {
          return (
              <Spinner size="large"/>
          )
      }else{
        return (
          <div className="mpa-container" style={{height: '450px'}}>
            <div id="map" className="tabcontent text-center" style={{display: 'block'}}>
            <Map initialCenter={{
          lat: this.props.latitude,
          lng: this.props.longitude
        }} google={this.props.google} zoom={6} style={{width: '1130px'}}>
            {this.props.suppliers.map((supplier, i) =>
                <Marker onClick={this.onMarkerClick} key={i}  name={supplier.name + " " + supplier.area_name + ", " + supplier.city_name} position={{lat: parseFloat(supplier.latitude), lng: parseFloat(supplier.longitude)}}/>
            )}
            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
          </InfoWindow>
              </Map>
              </div>
            </div>
        )
      }
    }



    renderLikeButton(supplier, uid) {
        if (supplier.is_fav) {
            return (
                <span className="favourite" onClick={() => {
                    this.props.likeSupplier(supplier.supplier_id, supplier.email, false, uid, () => {
                        if (this.state.supplierFilterValue.length > 0) {
                            this.props.getSearchSupplier([true, true, true, true], '-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
                        }
                    })
                }}><i className="fa fa-heart" aria-hidden="true"></i></span>

            )
        }
        else {
            return (
                <span className="favourite" onClick={() => {
                    this.props.likeSupplier(supplier.supplier_id, supplier.email, true, uid, () => {
                        if (this.state.supplierFilterValue.length > 0) {
                            this.props.getSearchSupplier([true, true, true, true], '-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
                        }
                    })
                }}><i className="fa fa-heart-o" aria-hidden="true"></i></span>
            )

        }

    }

    /*
    @Method : renderMapOrListData
    @Params :
    @Returns : *
    */
    renderMapOrListData() {
        if (this.props.loading) {
            return (
                <Spinner size="large"/>
            )
        }
        else {
            if (this.state.isMapActive) {
                return (
                    <div>
                        {this.renderMarkers()}
                    </div>
                )
            }
            else {
                if (this.props.loading) {
                    return (
                        <Spinner size="large"/>
                    )
                }
                else {
                    if (this.props.suppliers.length > 0) {

                        return (
                            <div>
                                {this.renderListItem()}
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <span>No Record Found</span>
                            </div>

                        )
                    }
                }

            }
        }
    }

    /*
      @Method : onRegionChange
      @Params :
      @Returns : *
      */
    onRegionChange(region) {
        this.setState({region});
    }

    /*
    @Method : renderTab
    @Params :
    @Returns : *
    */
    renderTab() {
        if (!this.state.isMapActive) {
            return (
                <div className="tab">
                    <button className="tablinks" onClick={() => {
                        this.setState({isMapActive:true})
                    }}>List View
                    </button>
                    <button className="tablinks active" onClick={() => {
                        this.setState({isMapActive:true})
                    }}>Map View
                    </button>
                </div>
            )
        } else {
            return (
                <div className="tab">
                    <button className="tablinks active" onClick={() => {
                        this.setState({isMapActive:true})
                    }}>List View
                    </button>
                    <button className="tablinks" onClick={() => {
                        this.setState({isMapActive:true})
                    }}>Map View
                    </button>
                </div>
            )
        }
    }


    /*
    @Method : render
    @Params :
    @Returns : *
    */
    SupplierItem(props) {
        if (this.props.loading || this.state.isLoading) {
            return (
                <Spinner size="large"/>
            )
        } else if (this.props.suppliers.length > 0) {
            return (
                <li>
                    <h4>Ace water</h4>
                    <p className="information m-t20"><span className="details"><i className="fa fa-map-marker"
                                                                                  aria-hidden="true"></i></span>Rancho
                        Cucamonga, CA, United States <span className="favourite"><i className="fa fa-heart"
                                                                                    aria-hidden="true"></i></span></p>
                    <p className="information"><span className="details"><i className="fa fa-envelope"
                                                                            aria-hidden="true"></i></span>ranchocucamonga@gmail.com
                    </p>
                    <p className="information"><span className="details"><i className="fa fa-phone"
                                                                            aria-hidden="true"></i></span>+1
                        909-989-1978 </p>
                </li>
            )
        } else {
            return (
                <li>There has no alert message</li>
            )
        }
    }

    /*
     @Method : renderContent
     @Params :
     @Returns : *
     */
    renderNavigatorButtons() {
        if (this.state.isMapActive) {
            return (
                <div className="tab">
                    <button style={{color: '#2eb9f9'}} className="tablinks" onClick={() => {
                        this.setState({isMapActive: false})
                    }}><span>List View</span></button>
                    <button style={{color: '#949eaa'}} className="tablinks active" onClick={() => {
                        this.setState({isMapActive: true})
                    }}><span>Map View</span></button>
                </div>
            );
        }
        else {
            return (
                <div className="tab">
                    <button style={{color: '#2eb9f9'}} className="tablinks active"  onClick={() => {
                        this.setState({isMapActive: false})
                    }}><span>List View</span></button>
                    <button style={{color: '#949eaa'}} className="tablinks" onClick={() => {
                        this.setState({isMapActive: true})
                    }}><span>Map View</span></button>
                </div>
            );
        }

    }


    /*
       @Method : renderListItem
       @Params :
       @Returns : *
       */
    renderListItem() {
        return (
            <ul className="list-items">
                {this.props.suppliers.map((supplier, i) =>
                    <li key={i}><h4>{supplier.name}</h4>
                        <p className="information m-t20"><span className="details"><i
                            className="fa fa-map-marker"
                            aria-hidden="true"></i></span>{supplier.city_name}, {supplier.country_name}
                            {this.renderLikeButton(supplier, firebase.auth().currentUser)}</p>
                        <p className="information"><span className="details"><i
                            className="fa fa-envelope"
                            aria-hidden="true"></i></span>{supplier.email} </p>
                        <p className="information"><span className="details"><i
                            className="fa fa-phone"
                            aria-hidden="true"></i></span>{supplier.mobile_number} </p></li>
                )}
            </ul>
        )
    }


    /*
@Method : renderSearch
@Params :
@Returns : *
*/

    renderSearch() {
        if (this.props.suppliers.length > 0) {
            return (
                <div className="fr" onClick={() => {
                    this.setState({isSearchClicked: true})
                }}>
                    <i className="fa fa-search p-l10 gray" aria-hidden="true"></i>
                </div>
            )
        }

    }

setSupplierFilterCheckBox(){
  if (this.state.isFilterShow) {
    let tempValue = this.state.supplierFilterValue;
                if(tempValue[0] == false && tempValue[1] == false && tempValue[2] == false && tempValue[3] == false)
                {
                    showToast('denger','Please Select Tank Capacity')

                }
                else
                {
                    this.props.getSearchSupplier(this.state.supplierFilterValue,'-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
                    this.setState({isFilterShow:false});
                }
  }
}


cancelSupplierFilterCheckBox(){
    this.setState({isFilterShow:false});
}
    /*
    @Method : renderHeader
    @Params :
    @Returns : *
    */
    renderHeader() {
        if (this.state.isSearchClicked) {
            return (<div>
                    <div className="row">
                        <div className="columns medium-12">
                            <h1 className="page-title">Search Suppliers</h1>
                            <div className="supplier-search-box">
                              <input type="text"
                              className="supplier-search"
                                     name="searchText"
                                     value={this.props.searchText}
                                     onChange={(e) => this.onChangeSearch(e)}
                                     placeholder="Search"
                              />
                              <a href="#"><i onClick={() => {
                                  this.setState({isSearchClicked: false})
                                  this.props.getSearchSupplier([true, true, true, true], '-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
                              }} className="fa fa-times" aria-hidden="true"></i></a>
                              </div>
                        </div>
                    </div>
                </div>
            )
        }else if (this.state.isFilterShow) {
            return (
              <div className="row">
                    <div className="columns medium-12">
                          <h1 className="page-title">Search Suppliers
                              <div className="fr">
                                    <i className="fa fa-search p-l10 gray" aria-hidden="true"></i>
                              </div>
                              <div className="fr filter" onClick={()=>{
                                          this.setState({isFilterShow:true})
                                      }}>
                                      <i className="fa fa-filter gray" aria-hidden="true"></i>
                              </div>
                        </h1>
              <div className="filter-box">
              <h3 className="popup-heading">Tank Capacity(m3)</h3>
                  <ul  className="tank-list">
                      <li className="tank-item">
                      <label className="checkbox-wrapper">All
                      <input
                          type="checkbox"
                          onChange={() => {
                              this.setSupplierFilterValueWithCheckAll()
                          }}
                          checked={this.state.isCheckedAll}
                      />
                      <span className="checkmark"></span>
                      </label>
                      </li>
                      <li className="tank-item">
                      <label className="checkbox-wrapper">5(m3)
                          <input
                              onChange={() => {
                                  this.setSupplierFilterValue(0)
                              }}
                              checked={this.state.supplierFilterValue[0]}
                              type="checkbox"
                          />
                          <span className="checkmark"></span>
                          </label>
                      </li>
                      <li className="tank-item">
                      <label className="checkbox-wrapper">12(m3)
                      <input
                          type="checkbox"
                          onChange={() => {
                              this.setSupplierFilterValue(1)
                          }}
                          checked={this.state.supplierFilterValue[1]}
                      />
                      <span className="checkmark"></span>
                      </label>
                      </li>
                      <li className="tank-item">
                      <label className="checkbox-wrapper">18(m3)
                      <input
                          type="checkbox"
                          onChange={() => {
                              this.setSupplierFilterValue(2)
                          }}
                          checked={this.state.supplierFilterValue[2]}
                      />
                      <span className="checkmark"></span>
                      </label>
                      </li>
                      <li className="tank-item">
                      <label className="checkbox-wrapper">11(m3)
                      <input
                          type="checkbox"
                          onChange={() => {
                              this.setSupplierFilterValue(3)
                          }}
                          checked={this.state.supplierFilterValue[3]}
                      />
                      <span className="checkmark"></span>
                      </label>
                      </li>
                  </ul>
                  <div className="columns medium-12 m-t30">
                  <button className="btn act"  onClick={() => {
                      this.setSupplierFilterCheckBox()
                  }}>APPLY</button>
                  <button className="btn act fr" onClick={() => {
                      this.cancelSupplierFilterCheckBox()
                  }}>CANCEL</button>
                  </div>
              </div>
              </div>
              </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Search Suppliers
                            {this.renderSearch()}
                            <div className="fr filter" onClick={() => {
                                this.setState({isFilterShow: true})
                            }}>
                                <i className="fa fa-filter gray" aria-hidden="true"></i>
                            </div>
                        </h1>
                    </div>
                </div>
            )
        }
    }

    renderContentData(){
      if (this.props.loading || this.state.isLoading) {
          return (
              <Spinner size="large"/>
          )
      }
      else{
        return (
          <div className="card-panel">
              {this.renderNavigatorButtons()}
              {this.renderMapOrListData()}
          </div>
        )
      }

    }

    render() {
        return (
            <div>
                <Header/>
                {this.renderHeader()}
                <div className="row">
                    <div className="columns medium-12">
                    {this.renderContentData()}

                    </div>
                </div>
                <LedtNavigation/>
            </div>
        );
    }
    ;


}


const
    mapStateToProps = ({utility}) => {
        let latitude = 0;
        let longitude = 0;

        if (utility.suppliersTemp.length > 0) {
            latitude = parseFloat(utility.suppliersTemp[0].latitude);
            longitude = parseFloat(utility.suppliersTemp[0].longitude);

        }
        const {loading, suppliers, suppliersTemp} = utility;
        return {loading, suppliers, suppliersTemp, latitude, longitude};
    };


export default connect(mapStateToProps,
    {getSuppliers,
    likeSupplier,
    getLocalSearchSupplierList,
    getSearchSupplier}
)(GoogleApiWrapper({
    apiKey: ('AIzaSyBgl1GwebuB9n6gz7k2wbWpZ4xDca4NDq0')
})(Supplier));
