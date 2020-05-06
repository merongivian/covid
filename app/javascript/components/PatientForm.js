import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from '@material-ui/core';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2VzYXJhbmFzY28iLCJhIjoiY2s5NTcweDF2MDE2bjNmcDd0aTM0Z2wxNSJ9.gA4RpRVwx7GIeOpg0EtTPQ';

class PatientForm extends React.Component {
  static propTypes = {
    getSymptomsPath: PropTypes.string.isRequired,
    getQuarantinedStatusPath: PropTypes.string.isRequired,
    getNotQuarantinedStatusPath: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      symptoms: [],
      quarantinedStatus: [],
      notQuarantinedStatus: [],
      provinces: [
        {
          id: 1,
          name: 'Pichincha',
          cities: [
            {
              id: 1,
              name: 'Quito',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'Chillogallo'
                },
                {
                  id: 2,
                  name: 'La tola'
                }
              ]
            },
            {
              id: 2,
              name: 'Machachi',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'Sunguyo'
                },
                {
                  id: 2,
                  name: 'La merced'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Guayas',
          cities: [
            {
              id: 1,
              name: 'Guayaquil',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'Sauces'
                },
                {
                  id: 2,
                  name: 'La tejedora'
                }
              ]
            },
            {
              id: 2,
              name: 'Salinas',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'Loro'
                },
                {
                  id: 2,
                  name: 'La malta'
                }
              ]
            }
          ]

        },
        {
          id: 3,
          name: 'Manabi',
          cities: [
            {
              id: 1,
              name: 'Chone',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'El guabal'
                },
                {
                  id: 2,
                  name: 'La reina'
                }
              ]
            },
            {
              id: 2,
              name: 'Manta',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'palta'
                },
                {
                  id: 2,
                  name: 'La cd'
                }
              ]
            }
          ]
        },
        {
          id: 4,
          name: 'Pastaza',
          cities: [
            {
              id: 1,
              name: 'Chillo',
              neighbourhoods: [
                {
                  id: 1,
                  name: 'merida'
                },
                {
                  id: 2,
                  name: 'La sasasas'
                }
              ]
            },
            {
              id: 2,
              name: 'Misah'
            }
            ]
        }
      ],
      cities :[],
      neighbourhoods: [],
      isProvinceSelected: false,
      isCitySelected: false,
      isUserInCuarentine: false,
    }
  }

  getCities(provinceId) {
    this.state.provinces.map(
        provinces => {
          if(provinces.id == provinceId){
            const cities = provinces.cities;
            this.setState({
              cities:cities,
              isProvinceSelected: true
            });
          }
        }
    )
  }

  getNeighbourhoods(citieId){
    this.state.cities.map(
        cities => {
          if(cities.id == citieId){
            const neighbourhoods = cities.neighbourhoods;
            this.setState({
              neighbourhoods:neighbourhoods,
              isCitySelected: true
            });
          }
        }
    )

  }

  renderProvinces() {
    return (
        <div>
        <ul>
          <label class="formLabel" htmlFor="formControlProvinces">Select a province:</label>
          <select name="provinces" className="form-control" id="formControlProvinces">
            {
              this.state.provinces.map(
                  province =>
                      <option
                          value={province.id}
                          onClick={() =>
                          {
                            this.getCities(province.id)
                          }}
                      >{province.name}</option>
              )
            }
          </select>
        </ul>
        <ul>
          <label class="formLabel" htmlFor="formControlCities">Select a city:</label>
          <select name="cities" className="form-control" id="formControlCities">

            {
              this.state.cities.map(
                  citie =>
                      <option
                          value={citie.id}
                          onClick={()=>
                          {this.getNeighbourhoods(citie.id)}}
                      >{citie.name}</option>
              )
            }
          </select>
        </ul>
        <ul>
          <label class="formLabel" htmlFor="formControlNeighbourhoods">Seleccione un barrio:</label>
            <select name="neighbourhoods" className="form-control" id="formControlNeighbourhoods">
              {
                this.state.neighbourhoods.map(
                    neighbourhood =>
                        <option
                            value={neighbourhood.id}
                        >{neighbourhood.name}</option>
                )
              }
            </select>

          </ul>
        </div>
    )
  }

  renderCuarentineStatus() {
    return (
        <div>
        <ul>
          <Checkbox
              value="checkedA"
              inputProps={{ 'aria-label': 'Checkbox A' }
             }
              onClick={() =>
              {
                this.setState({
                  isUserInCuarentine: !this.state.isUserInCuarentine
                })
              }}
          />
          <label class="formLabel" htmlFor="">Are you currently in quarentine?</label>


            {this.state.isUserInCuarentine === true ? (
                <ul>

                  <p>Select your quarentine status: </p>
                  {
                    this.state.quarantinedStatus.map(status =>
                        <div class="form-check">
                          <input class="form-check-input" type="radio"/>
                          <label class="form-check-label" > {status}</label>
                        </div>
                    )
                  }
                </ul>

            ) : (
                <ul>
                  <p>Select your status: </p>

                  {
                    this.state.notQuarantinedStatus.map(status =>
                        <div class="form-check">
                          <input class="form-check-input" type="radio"/>
                          <label class="form-check-label" > {status}</label>
                        </div>
                    )
                  }
                </ul>
            )}

        </ul>
        </div>
    )
  }

  renderMapbox() {
    return <Mabbox />;
  }

  render () {
    return (
      <div>
        <form>
          <div className="form-group">
            <ul>
              <label htmlFor="formAge" class="formLabel">Your age</label>
              <input type="number" className="form-control" id="formAge" placeholder="..."/>
            </ul>
            <ul>
              <label className="formLabel" htmlFor="">Gender</label>
              <div className="form-check">
                <input className="form-check-input" type="radio"/>
                <label className="form-check-label"> Male</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio"/>
                <label className="form-check-label"> Female</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio"/>
                <label className="form-check-label"> Other</label>
              </div>

            </ul>
            <ul>
              <label className="formLabel" htmlFor="">Postal Code / Zip Code</label>
              <input type="text" className="form-control" id="formPostalCode" placeholder="..."/>
            </ul>
            {this.renderProvinces()}
            {this.renderCuarentineStatus()}
            <ul>
              <Checkbox/>
              <label className="formLabel" htmlFor="">Have you been tested?</label>

            </ul>
            <ul>
              <Checkbox/>
              <label className="formLabel" htmlFor="">Have you been in contact with a person who tested positive?</label>

            </ul>
            <ul>
              <Checkbox/>
              <label className="formLabel" htmlFor="">Do you have any severe illnes?</label>

            </ul>
            <ul>
              <label class="formLabel" htmlFor="">Symptoms you have experienced</label>
              <p>Select only the symptoms you have experienced</p>
              <ul>
                {
                    this.state.symptoms.map(symptom =>
                        <div class="form-check">
                          <input type="checkbox" className="form-check-input" />
                          <label className="form-check-label"> {symptom}</label>
                        </div>
                    )
                }
              </ul>
            </ul>
            <ul>
              <label className="formLabel" htmlFor="">Do you have any smoking habits?</label>
              <input type="text" className="form-control" id="formSmokingHabits" placeholder="..."/>
            </ul>
            <ul>
              <label className="formLabel" htmlFor="">Temperature</label>
              <input type="number" className="form-control" id="formTemperature" placeholder="..."/>
            </ul>
            <ul>
              <Checkbox/>
              <label className="formLabel" htmlFor="">Privacy Agreement</label>

            </ul>
            <ul>
              <button type="submit" className="btn btn-primary">Submit</button>
            </ul>
          </div>
          
        </form>
        {this.renderMapbox()}
      </div>
    );
  }

  componentDidMount() {
    this.getSymptoms();
    this.getQuarantinedStatus();
    this.getNotQuarantinedStatus();
  }

  getSymptoms = () => {
    $.get(this.props.getSymptomsPath).then((symptoms) => {
      this.setState({symptoms})
    });
  }

  getQuarantinedStatus = () => {
    $.get(this.props.getQuarantinedStatusPath).then((quarantinedStatus) => {
      this.setState({quarantinedStatus})
    });
  }

  getNotQuarantinedStatus = () => {
    $.get(this.props.getNotQuarantinedStatusPath).then((notQuarantinedStatus) => {
      this.setState({notQuarantinedStatus})
    });
  }

}

class Mabbox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: -83.5560,
      lat: -1.9309,
      zoom: 6,
      minZoom: 6,
      southWest: (-91.0270,-0.3814),
      northEast: (-75.1247,-1.7402),
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
      minZoom:  this.state.minZoom
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
      map.on('mousemove', (e) => {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['states']
        });
        var feature = features[0];
        //console.log(feature.properties.name);
        map.setFilter('states-highlighted', ['in', 'name', feature.properties.name]);
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
          <div class='row'>
            <div class='column'>
              <div ref={el => this.mapContainer = el} className='mapContainer' >
                <div className='sidebarStyle'>
                  <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>

              </div>
            </div>
            <div class='column'>
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

export default PatientForm
