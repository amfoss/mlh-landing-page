import React from 'react'
import dataFetch from "../../../utils/dataFetch"
import photo from "../images/hacktober-amfoss.jpg"

const query=`
  mutation submitApplication($name: String!, $email: String!, $phone: String!, $formData: JSONString!){
  submitApplication(
    name: $name, 
    email: $email,
    phone: $phone,
    formID: 1,
    formData: $formData
  )
  {
    id
  }
}
`;

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      gender: '',
      roll: '',
      errorText: '',
      successText: '',
      loading: false,
      agreed: false,
      verified: true //change it to false when captcha is enabled
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleRollChange = this.handleRollChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePhoneChange(event) {
    this.setState({ phone: event.target.value });
  }
  handleGenderChange(event) {
    this.setState({ gender: event.target.value });
  }
  handleRollChange(event) {
    this.setState({ roll: event.target.value });
  }
  handleCheckboxChange(event) {
    const prev = this.state.agreed
    this.setState( { agreed: !prev});
  }

  register = async() => {
    const { name, email, phone, gender, roll, agreed, verified } = this.state;
    const emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const phoneRegex = /^\d{10}$/;
    const rollRegex = /^AM[.]EN[.]U4(CSE|CAI|ECE|EOC|EIC|EEE)[1][6-9][\d][\d][\d]$/;
    if (name === '' || roll === '' || phone === '' || email === '' || gender === '') {
      this.setState({ loading: false, errorText: "Please Fill All the Fields" })
    } else if (emailRegex.test(email) === false) {
      this.setState({ loading: false, errorText: "Enter Proper Email" })
    } else if (phoneRegex.test(phone) === false) {
      this.setState({ loading: false, errorText: "Enter Proper Phone" })
    } else if (rollRegex.test(roll.toUpperCase()) === false) {
      this.setState({ loading: false, errorText: "Enter Amrita Roll Number in proper format - AM.EN.U4XXX00000" })
    } else if (!agreed) {
      this.setState({ loading: false, errorText: "Please agree to COC & Privacy Policy." })
    } else if (!verified){
      this.setState({ loading: false, errorText: "Please complete the ReCaptcha. This helps us to fight spams." })
    } else {
      const json = { 'gender': gender, "rollNo": roll }
      const variables = { name, email, phone, formData: JSON.stringify(json) }
      const response = await dataFetch({ query, variables });
      console.log(response);
      if (Object.prototype.hasOwnProperty.call(response, 'errors')) {
        this.setState({ loading: false, errorText: response.errors[0].message});
      } else {
        this.setState({ successText: response.data.id, errorText: '' })
      }
    }
  }

  render() {
    return (
      <section id="registration-form">
        <div className="row m-0">
          <div
            style={{
              backgroundImage: `url(${photo})`,
              backgroundPosition: 'bottom',
              objectFit: 'fill'
            }}
            className="col-md-6"
          />
          <div className="col-md-6 p-4 d-flex align-items-center">
            { !this.state.loading ?
              (
                <div>
                <h2 className="my-4 text-light">Register <span>Now</span></h2>
                  <p className="text-light">
                    Sign up for the meet-up for free by filling up the form below,
                    and make sure you do that fast as we have limited seats to fit you
                    all in! Also, don't forget to bring in your friends as well :)
                  </p>
                <form
                  className="form-group"
                  onSubmit={e => {
                    this.setState({loading: true});
                    this.register();
                    e.preventDefault();
                }}>
                  <div className="row">
                    <div className="col-12 p-0">
                      <div className="m-2">
                        <input type="text" placeholder="Enter Full Name" name="name" className="form-control" onChange={this.handleNameChange} />
                      </div>
                    </div>
                    <div className="col-sm-6 p-0">
                      <div className="m-2">
                        <input type="text" placeholder="Enter Roll Number" name="Roll No" className="form-control" onChange={this.handleRollChange} />
                      </div>
                    </div>
                    <div className="col-sm-6 p-0">
                      <div className="m-2">
                        <input type="text" placeholder="Enter Email" name="email" className="form-control" onChange={this.handleEmailChange} />
                      </div>
                    </div>
                    <div className="col-sm-6 p-0">
                      <div className="m-2">
                        <input type="text" placeholder="Enter Phone" name="phoneno" className="form-control" onChange={this.handlePhoneChange} />
                      </div>
                    </div>
                    <div className="col-sm-6 p-0">
                      <div className="m-2">
                        <select className="form-control text-light" onChange={this.handleGenderChange}>
                          <option value="" hidden disabled selected>Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 p-0">
                      <div className="m-2" />
                    </div>
                    <div className="col-12 form-check">
                      <div className="m-2 text-light d-flex justify-content-center">
                        <div className="row m-0">
                          <div className="col-sm-1 col-2 d-flex justify-content-center align-items-center">
                            <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="undertaking"
                                  onChange={() => this.handleCheckboxChange}
                            />
                          </div>
                          <div className="col">
                            <label className="form-check-label" htmlFor="undertaking">
                              By submitting this application, I agree to the <a href="#">Code of Conduct</a> & <a href="#">Privacy Policy</a> of the organizers.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      this.state.errorText !== '' ?
                        <div className="w-100 w-100 text-center m-2 alert alert-danger" role="alert">
                          {this.state.errorText}
                        </div> : null
                    }
                    <div className="col-12 p-0 text-center text-md-right">
                      <div className="m-2">
                        <button
                          type="submit"
                          className="button btn-block px-4"
                        >
                          REGISTER
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                </div>) : this.state.successText !== '' ? (<div className="alert alert-success">
                Thank You! You have successfully signed up for the event.
                See you at event, dont forget to bring your friends as well!
                </div>) :
                <div className="alert alert-warning">Submitting. Please Wait</div>
              }
          </div>
        </div>
      </section>
    )
  }
}
export default Registration
