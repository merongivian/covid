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
          <p>Selecciona una provincia:</p>
          <select name="provinces">
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
          <p>Seleccione un ciudad:</p>
          <select name="cities">
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
          <p>Seleccione un barrio:</p>
            <select name="neighbourhoods">
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
          <p>Esta usted en Cuarentena?</p>
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

          <ul>
            {this.state.isUserInCuarentine === true ? (
                <ul>
                  <p>Estado de Cuarentena: </p>

                  {
                    this.state.quarantinedStatus.map(status =>
                        <li>{status}</li>
                    )
                  }
                </ul>
            ) : (
                <ul>
                  <p>Estado de No Cuarentena: </p>

                  {
                    this.state.notQuarantinedStatus.map(status =>
                        //console.log(status)
                        <li>{status}</li>
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

        {this.renderProvinces()}
        {this.renderCuarentineStatus()}
        <ul>
          <p>Sintomas: </p>

          {
            this.state.symptoms.map(symptom =>
              <li>{symptom}</li>
            )
          }
        </ul>
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
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

  }

  render() {
    return (
        <div>
          <div ref={el => this.mapContainer = el} className='mapContainer' >
            <div className='sidebarStyle'>
              <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
            </div>
          </div>
        </div>
    )
  }
}


export default PatientForm
