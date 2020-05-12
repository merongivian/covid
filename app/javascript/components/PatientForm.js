import React from "react"
import PropTypes from "prop-types"
import { Checkbox } from '@material-ui/core';
import mapboxgl from 'mapbox-gl';

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
          <label className="formLabel" htmlFor="formControlProvinces">Select a province:</label>
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
          <label className="formLabel" htmlFor="formControlCities">Select a city:</label>
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
          <label className="formLabel" htmlFor="formControlNeighbourhoods">Seleccione un barrio:</label>
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
          <label className="formLabel" htmlFor="">Are you currently in quarentine?</label>


            {this.state.isUserInCuarentine === true ? (
                <ul>

                  <p>Select your quarentine status: </p>
                  {
                    this.state.quarantinedStatus.map(status =>
                        <div className="form-check">
                          <input className="form-check-input" type="radio"/>
                          <label className="form-check-label" > {status}</label>
                        </div>
                    )
                  }
                </ul>

            ) : (
                <ul>
                  <p>Select your status: </p>

                  {
                    this.state.notQuarantinedStatus.map(status =>
                        <div className="form-check">
                          <input className="form-check-input" type="radio"/>
                          <label className="form-check-label" > {status}</label>
                        </div>
                    )
                  }
                </ul>
            )}

        </ul>
        </div>
    )
  }

  render () {
    return (

      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">  Report your health condition </h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
        <form className="form" id="userRegisterForm">
          <div className="form-group">
            <ul>
              <label htmlFor="formAge" className="formLabel">Your age</label>
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
              <label className="formLabel" htmlFor="">Symptoms you have experienced</label>
              <p>Select only the symptoms you have experienced</p>
              <ul>
                {
                    this.state.symptoms.map(symptom =>
                        <div className="form-check">
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
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
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

export default PatientForm
