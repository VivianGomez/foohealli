import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identificacion: '',
      clave: '',
      error: [],
      rol: 'Patient'
    };

    this.correoInput = React.createRef();
    this.claveInput = React.createRef();
    this.rolInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.rol === 'Patient') {
      //Deberian validar que el correo y la clave sigan un formato. y avisar al usuario antes de enviar el formulario
      Meteor.call(
        'patients.validarPaciente',
        {
          correo: this.correoInput.current.value,
          clave: this.claveInput.current.value
        },
        (err, res) => {
          if (err) {
            alert(err.error);
          } else {
            localStorage.setItem('foohealliStuff', res);
            this.props.history.push('/Patient/dashboard');
            window.location.reload();
          }
        }
      );
    } else if (this.state.rol === 'Doctor') {
      Meteor.call(
        'doctors.validarDoctor',
        {
          correo: this.correoInput.current.value,
          clave: this.claveInput.current.value
        },
        (err, res) => {
          if (err) {
            alert(err.error);
          } else {
            localStorage.setItem('foohealliStuff', res);
            this.props.history.push('/doctor/dashboard');
            window.location.reload();
          }
        }
      );
    } else if (this.state.rol === 'Nutritionist') {
      Meteor.call(
        'nutritionists.validarNutricionista',
        {
          correo: this.correoInput.current.value,
          clave: this.claveInput.current.value
        },
        (err, res) => {
          if (err) {
            alert(err.error);
          } else {
            localStorage.setItem('foohealliStuff', res);
            this.props.history.push('/nutritionist/dashboard');
            window.location.reload();
          }
        }
      );
    }
  }

  cargarBotonRol() {
    if (this.state.rol === 'Patient') {
      return (
        <div
          className="btn-group"
          role="group"
          aria-label="Login buttons options"
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.cambiarRolIngreso('Doctor')}
          >
            <i className="fas fa-user-md" />
            &nbsp;Doctor
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => this.cambiarRolIngreso('Nutritionist')}
          >
            <i className="fas fa-diagnoses" />
            &nbsp;Nutritionist
          </button>
        </div>
      );
    } else if (this.state.rol === 'Doctor') {
      return (
        <div
          className="btn-group"
          role="group"
          aria-label="Login buttons options"
        >
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.cambiarRolIngreso('Patient')}
          >
            <i className="fas fa-user" />
            &nbsp;Patient
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={() => this.cambiarRolIngreso('Nutritionist')}
          >
            <i className="fas fa-diagnoses" />
            &nbsp;Nutritionist
          </button>
        </div>
      );
    } else if (this.state.rol === 'Nutritionist') {
      return (
        <div
          className="btn-group"
          role="group"
          aria-label="Login buttons options"
        >
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.cambiarRolIngreso('Patient')}
          >
            <i className="fas fa-user" />
            &nbsp;Patient
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.cambiarRolIngreso('Doctor')}
          >
            <i className="fas fa-user-md" />
            &nbsp;Doctor
          </button>
        </div>
      );
    }
  }

  cambiarRolIngreso(rol) {
    this.setState({
      rol: rol
    });
  }

  irARegistro() {
    document.getElementById('botonParaIniciarSesion').click();
    this.props.history.push('/register');
  }

  render() {
    return (
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-foohealli text-light">
              <h5 className="modal-title" id="exampleModalLabel">
                Welcome back!
              </h5>
              <button
                type="button"
                id="cerrarLoginModal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-light" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <h5 className="text-center">{this.state.rol}</h5>
              <hr />
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label htmlFor="loginInputCorreo">
                    <b>Email</b>
                  </label>
                  <input
                    type="mail"
                    className="form-control"
                    id="loginInputCorreo"
                    ref={this.correoInput}
                    minLength="4"
                    maxLength="35"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginInputClave">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginInputClave"
                    ref={this.claveInput}
                    minLength="8"
                    maxLength="35"
                    autoComplete="foo"
                    required
                  />
                </div>
                <center>
                  <button type="submit" className="btn btn-foohealli">
                    Login
                  </button>
                </center>
              </form>
              <hr />
              <p className="text-center">
                Don't have an account?
                <br />
                <span
                  className="foohealli-text font-weight-bold pointer"
                  onClick={this.irARegistro.bind(this)}
                >
                  Register
                </span>
              </p>
              <hr />
              <h6 className="text-center">Change role</h6>
              <div className="text-center">{this.cargarBotonRol()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
