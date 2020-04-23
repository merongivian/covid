import React from "react"
import PropTypes from "prop-types"

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
      //-------------PRIMERO------------------
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
      isCitySelected: false
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

  render () {
    return (
      <div>
        {this.renderProvinces()}
        <ul>
          <p>Estado de No Cuarentena: </p>

          {
            this.state.notQuarantinedStatus.map(status =>
                //console.log(status)
                <li>{status}</li>
            )
          }
        </ul>
        <ul>
          <p>Sintomas: </p>

          {
            this.state.symptoms.map(symptom =>
              <li>{symptom}</li>
            )
          }
        </ul>
        <ul>
          <p>Estado de Cuarentena: </p>

          {
            this.state.quarantinedStatus.map(status =>
              <li>{status}</li>
            )
          }
        </ul>
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
