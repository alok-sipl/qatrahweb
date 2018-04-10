import React, {Component} from 'react';
import {connect} from 'react-redux'
import firebase from 'firebase';
import {getSuppliers, likeSupplier, getSearchSupplier, getLocalSearchSupplierList} from '../../actions';
import Header from './../templates/header';
import LedtNavigation from './../templates/left_navigation';
import _ from 'lodash';
import {Spinner} from '../common';
import CircularProgressbar from 'react-circular-progressbar';

class Supplier extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        menuActive: false,
        searchText: "",
        isFilterShow: false,
        isSearchClicked: false,
        isMapActive: false,
        isCheckedAll: true,
        latitude: 0,
        longitude: 0,
        supplierFilterValue: [true, true, true, true],
        refreshing: false
    }

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
    @Method : openCity
    @Params :
    @Returns : *
    */
    openCity(cityName) {
        if (cityName == 'map') {
            this.setState({isMapActive: true, isCheckedAll: false})
        } else {
            this.setState({isMapActive: false, isCheckedAll: true})
        }
    }

    /*
@Method : openFilter
@Params :
@Returns : *
*/
    openFilter() {
        this.setState({isFilterShow: false})
    }

    /*
@Method : openSearch
@Params :
@Returns : *
*/
    openSearch() {
        this.setState({isSearchClicked: true})
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
            this.setState({searchText: this.removeInvalidChars(text)});
            this.filter(this.removeInvalidChars(text));
        }
        else {
            this.setState({searchText: ""});
            this.props.getSearchSupplier([true, true, true, true], this.props.tankCity, this.props.tankArea);
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
        return _.map(this.props.suppliers, (marker, i) => {
            let latitude = parseFloat(marker.latitude);
            let longitude = parseFloat(marker.longitude);
            return (
                <MapView.Marker
                    coordinate={{latitude: latitude, longitude: longitude}}
                    title={marker.company_name}
                    description={`${marker.area_name} , ${marker.city_name}`}
                />
            )
        });
    }

    renderLikeButton(supplier, uid) {
        if (supplier.is_fav) {
            return (
                <span className="favourite" onClick={()=>{
                    this.props.likeSupplier(supplier.supplier_id,supplier.email,false,uid,()=>{
                        if(this.state.supplierFilterValue.length > 0)
                        {
                            this.props.getSearchSupplier([true, true, true, true], '-L82T1vm2EaoP8-bssF0', '-L8XdAiPQ3e-mUfjp2P6');
                        }
                    })
                }}><i className="fa fa-heart" aria-hidden="true"></i></span>

            )
        }
        else {
            return (
                <span className="favourite" onClick={()=>{
                    this.props.likeSupplier(supplier.supplier_id,supplier.email,true,uid,()=>{
                        if(this.state.supplierFilterValue.length > 0)
                        {
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
                    <View style={{
                        flex: 1,
                        position: 'absolute',
                        bottom: 0,
                        height: Dimensions.get('window').height - 110
                    }}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: this.props.latitude,
                                longitude: this.props.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            }}
                        >
                            {this.renderMarkers()}
                        </MapView>
                    </View>
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
                            <Content refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }>
                                <View>
                                    {this.renderListItem()}
                                </View>
                            </Content>
                        )
                    }
                    else {
                        return (
                            <Content>
                                <Text>No Record Found</Text>
                            </Content>

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
    @Method : renderHeader
    @Params :
    @Returns : *
    */
    renderHeader() {
        if (this.state.isSearchClicked) {
            return (
                <div className="row">
                    <div className="columns medium-12">
                        <p className="information m-t20" style={{"textAlign": "center",position: "relative"}}>
                            <input type="text" onClick={this.onChangeSearch.bind(this)} placeholder="Search"/>
                            <i className="fa fa-times" style={{position: "absolute",top: "17",right: "24"}} aria-hidden="true"></i>
                        </p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="row">
                    <div className="columns medium-12">
                        <h1 className="page-title">Search Suppliers
                            <a href="#" className="fr" onClick={() => this.openSearch()}>
                                <i className="fa fa-search p-l10 gray" aria-hidden="true"></i>
                            </a>
                            <a href="#" className="fr filter" onClick={() => this.openFilter()}>
                                <i className="fa fa-filter gray" aria-hidden="true"></i>
                            </a>
                        </h1>
                        <div className="filter-box">
                            <ul>
                                <li><input type="checkbox"
                                           value="1"
                                />5(m3)
                                </li>
                                <li><input type="checkbox"
                                           value="1"
                                />12(m3)
                                </li>
                                <li><input type="checkbox"
                                           value="1"
                                />18(m3)
                                </li>
                                <li><input type="checkbox"
                                           value="1"
                                />32(m3)
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }

    }

    /*
    @Method : renderTab
    @Params :
    @Returns : *
    */
    renderTab() {
        if (this.state.isMapActive) {
            return (
                <div className="tab">
                    <button className="tablinks" onClick={(event) => {
                        this.openCity(event, 'map')
                    }}>Map View
                    </button>
                    <button className="tablinks" onClick={(event) => {
                        this.openCity(event.target.value, 'list')
                    }}>List View
                    </button>
                </div>
            )
        } else {
            return (
                <div className="tab">
                    <button className="tablinks" onClick={(event) => {
                        this.openCity(event, 'map')
                    }}>Map View
                    </button>
                    <button className="tablinks" onClick={(event) => {
                        this.openCity(event.target.value, 'list')
                    }}>List View
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
        if(this.props.loading || this.state.isLoading)
        {
            return(
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
    @Method : render
    @Params :
    @Returns : *
    */
    render() {
        if (this.props.loading || this.state.isLoading) {
            return (
                <div>
                    <Spinner size="large"/>
                </div>
            )
        } else if (this.state.isMapActive) {
            return (
                <div>
                    <Header/>
                    {this.renderHeader()}
                    <div className="row">
                        <div className="columns medium-12">
                            <div className="card-panel">
                                {this.renderTab()}
                                <div id="map" className="tabcontent text-center" style={{display: "block"}}>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.9347225924394!2d-104.61148568466835!3d38.25781997967432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8713a31fa0b6bf4b%3A0x82d3881a6684aa9e!2sClark+Spring+Water+Co!5e0!3m2!1sen!2sin!4v1521636106302"
                                        width="100%" height="400" style={{border: "0"}}></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LedtNavigation/>
                </div>
            )
        } else {
            return (
                <div>
                    <Header/>
                    {this.renderHeader()}
                    <div className="row">
                        <div className="columns medium-12">
                            <div className="card-panel">
                                {this.renderTab()}
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
                            </div>
                        </div>
                    </div>
                    <LedtNavigation/>
                </div>
            )
        }
    }
}


const mapStateToProps = ({utility}) => {
    let latitude = 0;
    let longitude = 0;

    if (utility.suppliersTemp.length > 0) {
        latitude = parseFloat(utility.suppliersTemp[0].latitude);
        longitude = parseFloat(utility.suppliersTemp[0].longitude);

    }
    const {loading, suppliers, suppliersTemp} = utility;
    return {loading, suppliers, suppliersTemp, latitude, longitude};
};


export default connect(mapStateToProps, {
    getSuppliers,
    likeSupplier,
    getLocalSearchSupplierList,
    getSearchSupplier
})(Supplier);
