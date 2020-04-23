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
              name: 'Quito'
            },
            {
              id: 2,
              name: 'Machachi'
            }
          ]
        },
        {
          id: 2,
          name: 'Guayas',
          cities: [
            {
              id: 1,
              name: 'Guayaquil'
            },
            {
              id: 2,
              name: 'Salinas'
            }
          ]

        },
        {
          id: 3,
          name: 'Manabi'
        },
        {
          id: 4,
          name: 'Pastaza'
        }

      ],
      cities: []

    }
  }

  getCities(provinceId) {
    const provinces = this.state.provinces.map();
    provinces.map(
        provinces => {
          if(provinces.id == provinceId){
            const cities = provinces.cities;
            console.log(cities);
            return (cities)
          }
          return null;
        }
    )
  }
  // CUARENTENN UN RADIO BUTTON
    //POSITIVO - SALEN CASOS DE CUARENTENA
    //NEGATIVO - SALEN COSAS DE CUARTENTE

  renderProvinces() {
    return (
        <ul>
          <p>Selecciona una provincia:</p>
          <select name="province">
            {
              this.state.provinces.map(
                  province =>
                      <option value={province.id}>{province.name}</option>
              )
            }
          </select>
        </ul>
    )
  }

  render () {

    return (
      <div>
        {this.renderProvinces()}
        <ul>
          <p>Selecciona una ciudad</p>
          {
            //const cities = getCities(1,this.state.provinces)
              //console.log(cities)
          }

        </ul>
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
