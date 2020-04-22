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
      notQuarantinedStatus: []
    }
  }

  render () {
    return (
      <div>
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

        <ul>
          <p>Estado de No Cuarentena: </p>

          {
            this.state.notQuarantinedStatus.map(status =>
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
