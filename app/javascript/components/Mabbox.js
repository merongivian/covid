import React from "react";
import mapboxgl from "mapbox-gl";
import PatientForm from "./PatientForm";

mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJhbmFzY28iLCJhIjoiY2s5NTcweDF2MDE2bjNmcDd0aTM0Z2wxNSJ9.gA4RpRVwx7GIeOpg0EtTPQ';

class Mapbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: -77.9769,
            lat: -1.9269,
            zoom: 6,
            minZoom: 6,
            maxZoom: 8,
            bounds: [[-93.282,-8.438], // Southwest coordinates
            [-68.684,4.296] // Northeast coordinates
            ],
            provinceName: '',
            provinceId: 0,
            numberOfUsers: 0,
            numberOfTestedUsers: 0,
            numberOfConfirmedUsers: 0,
            usersJson: [
                {
                    id:101,
                    age: 12,
                    sex: "Male",
                    zip_code: "170403",
                    tested: true,
                    testResult: true,
                    contact_with_sick_person: true,
                    symptoms: ["Fever","Cough"],
                    with_severe_illness: true,
                    quarantined: true,
                    quarantined_status: "living",
                    smoking_habits: "2 cigarettes a week",
                    temperature: "38",
                    privacy_agreement: true,
                    coordinates: "-77.7442,-1.3251",
                    province_id: 772,
                    city_id: 1,
                    neighbourhood_id: 1
                },
                {
                    id:102,
                    age: 12,
                    sex: "Male",
                    zip_code: "170403",
                    tested: true,
                    testResult: true,
                    contact_with_sick_person: true,
                    symptoms: ["Fever","Cough"],
                    with_severe_illness: true,
                    quarantined: true,
                    quarantined_status: "living",
                    smoking_habits: "2 cigarettes a week",
                    temperature: "38",
                    privacy_agreement: true,
                    coordinates: "-77.7442,-1.3251",
                    province_id: 774,
                    city_id: 1,
                    neighbourhood_id: 1
                },
                {
                    id:103,
                    age: 12,
                    sex: "Male",
                    zip_code: "170403",
                    tested: true,
                    testResult: false,
                    contact_with_sick_person: true,
                    symptoms: ["Fever","Cough"],
                    with_severe_illness: true,
                    quarantined: true,
                    quarantined_status: "living",
                    smoking_habits: "2 cigarettes a week",
                    temperature: "38",
                    privacy_agreement: true,
                    coordinates: "-77.7442,-1.3251",
                    province_id: 774,
                    city_id: 1,
                    neighbourhood_id: 1
                },
                {
                    id:104,
                    age: 12,
                    sex: "Male",
                    zip_code: "170403",
                    tested: true,
                    testResult: true,
                    contact_with_sick_person: true,
                    symptoms: ["Fever","Cough"],
                    with_severe_illness: true,
                    quarantined: true,
                    quarantined_status: "living",
                    smoking_habits: "2 cigarettes a week",
                    temperature: "38",
                    privacy_agreement: true,
                    coordinates: "-77.7442,-1.3251",
                    province_id: 774,
                    city_id: 1,
                    neighbourhood_id: 1
                },
                {
                    id:105,
                    age: 12,
                    sex: "Male",
                    zip_code: "170403",
                    tested: true,
                    testResult: false,
                    contact_with_sick_person: true,
                    symptoms: ["Fever","Cough"],
                    with_severe_illness: true,
                    quarantined: true,
                    quarantined_status: "living",
                    smoking_habits: "2 cigarettes a week",
                    temperature: "38",
                    privacy_agreement: true,
                    coordinates: "-77.7442,-1.3251",
                    province_id: 775,
                    city_id: 1,
                    neighbourhood_id: 1
                }
            ]

        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/cesaranasco/ck9eyep6w1cp51imwjhchmy0s',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
            minZoom:  this.state.minZoom,
            maxZoom: this.state.maxZoom,
            maxBounds: this.state.bounds

        });

        var popup = new mapboxgl.Popup({
            closeButton: false
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });

        });
        map.on('load',  () => {
            map.addSource('states',{
                "type": "vector",
                "url": "mapbox://cesaranasco.2tiqxr7u"
            });
            map.addLayer({
                "id": "states",
                "type": "fill",
                "source": "states",
                "source-layer": "ne_10m_admin_1_states_provinc-09lyao",
                "paint": {
                    "fill-outline-color": "rgba(0,0,0,0.1)",
                    "fill-color": "rgba(0,0,0,0.1)"
                }
            });
            map.addLayer({
                "id": "states-highlighted",
                "type": "fill",
                "source": "states",
                "source-layer": "ne_10m_admin_1_states_provinc-09lyao",
                "paint": {
                    "fill-outline-color": "#484896",
                    "fill-color": "#6e599f",
                    "fill-opacity": 0.75
                },
                "filter": ["in", "name", ""]
            });
            map.setFilter('states', ['in', 'adm0_a3', 'ECU']);
            map.setFilter('states-highlighted', ['in', 'adm0_a3', 'ECU']);
            map.on('mousemove', (e) => {
                var features = map.queryRenderedFeatures(e.point, {
                    layers: ['states']



                });
                var feature = features[0];
                //console.log(feature);
                map.setFilter('states-highlighted', ['in', 'name', feature.properties.name]);
                popup
                    .setLngLat(e.lngLat)
                    .setText(feature.properties.name)
                    .addTo(map);

            });
            map.on('click', (e)=>{
                var features = map.queryRenderedFeatures(e.point, {
                    layers: ['states']
                });
                var feature = features[0];
                this.setState({
                    provinceName: feature.properties.name,
                    provinceId: feature.id,
                });
                this.getProvinceStatistics();
            });
        });
    }

    getProvinceStatistics() {
        const usersInProvince = this.state.usersJson.filter( user => {
            return user.province_id == this.state.provinceId
        })

        this.setState({
            numberOfUsers: usersInProvince.length,
            numberOfTestedUsers: usersInProvince.filter(user => {return user.tested == true}).length,
            numberOfConfirmedUsers: usersInProvince.filter(user => {return user.testResult == true}).length
        })

    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div className='column'>
                        <div ref={el => this.mapContainer = el} className='mapContainer' >
                            <div className='sidebarStyle'>
                                <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                            </div>

                        </div>
                    </div>
                    <div className='column'>
                        <div className='mapOverlay'>
                            <div>
                                <li>
                                    <ul>Province Name: {this.state.provinceName}</ul>
                                    <ul>Number of Users: {this.state.numberOfUsers}</ul>
                                    <ul>Number of Tested Users: {this.state.numberOfTestedUsers}</ul>
                                    <ul>Number of Confirmed Users: {this.state.numberOfConfirmedUsers}</ul>
                                </li>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mapbox
