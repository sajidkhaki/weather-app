import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
var unirest = require('unirest');


class FormInputs extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: [],
            city: [],
            state: [],
            token: '',
        }
    }
    componentDidMount() {
        console.log("Developed By Sajidkhaki")
        this.refreshList()
    }
    refreshList() {
        let checkCountry = []
        let req = unirest("GET", "https://www.universal-tutorial.com/api/getaccesstoken");
        req.headers({
            "Accept": "application/json",
            "api-token": "hz0bOK6sBfc_dxrG3aj0VKOI96oS4JVewoqD2InLhtQPIAEcAr_yTl3f5FkQWICzoKE",
            "user-email": "sajid@eresolute.com"
        })
            .end((result) => {
                //console.log('Token', result.body.auth_token);
                this.setState({
                    token: result.body.auth_token
                })
                var request2 = unirest("GET", "https://www.universal-tutorial.com/api/countries/");
                request2.headers({
                    "Authorization": `Bearer ${this.state.token}`,
                    "Accept": "application/json"
                })
                    .end((data) => {
                        checkCountry = data.body
                        //console.log('check', checkCountry)
                        this.setState({
                            country: checkCountry
                        })
                    })
            });
    }
    onDropdownCountry = (e) => {
        //console.log("THE VAL", e.target.value);
        let state = e.target.value
        let stateCheck = []
        let request3 = unirest("GET", `https://www.universal-tutorial.com/api/states/${state}`)
        request3.headers({
            "Authorization": `Bearer ${this.state.token}`,
            "Accept": "application/json"
        })
            .end((dataValues) => {
               // console.log('reStoo', dataValues.body)
                stateCheck = dataValues.body
                this.setState({
                    state: stateCheck
                })
            })
    }
    onDropdownCity = (e) => {
        //console.log("THE VAL", e.target.value);
        let city = e.target.value
        let cityCheck = []
        let request4 = unirest("GET", `https://www.universal-tutorial.com/api/cities/${city}`)
        request4.headers({
            "Authorization": `Bearer ${this.state.token}`,
        })
            .end((dataValues) => {
                //console.log('reStoo', dataValues.body)
                cityCheck = dataValues.body
                this.setState({
                    city: cityCheck
                })
            })
    }
    render() {
        const { country, city, state } = this.state
        return (
            <Form onSubmit={this.props.getWeather}>
                <FormGroup>
                    <Label for="select" sm={2} style={{ color: "yellow" }}>Country</Label>
                    <Col sm={10}>
                        <Input type="select" defaultValue={'DEFAULT'} name='country' onChange={this.onDropdownCountry} >
                            <option value="DEFAULT" disabled>Select Country</option>
                            {country.map((data) => {
                                return (
                                    <option key={data.country_short_name}
                                        value={data.country_name}>
                                        {data.country_name}</option>
                                )
                            })
                            }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="select" sm={2} style={{ color: "yellow" }}>State</Label>
                    <Col sm={10}>
                        <Input type="select" defaultValue={'DEFAULT'} name='state' onChange={this.onDropdownCity}>
                            <option value="DEFAULT" disabled>Select State</option>
                            {state.map((data) => {
                                return (
                                    <option key={data.state_name}
                                        value={data.state_name}>
                                        {data.state_name}</option>
                                )
                            })
                            }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="select" sm={2} style={{ color: "yellow" }}>City</Label>
                    <Col sm={10}>
                        <Input type="select" defaultValue={'DEFAULT'} name='city' >
                            <option value="DEFAULT" disabled>Select City</option>
                            {city.map((data) => {
                                return (
                                    <option key={data.city_name}
                                        value={data.city_name}>
                                        {data.city_name}</option>
                                )
                            })
                            }
                        </Input>
                    </Col>
                </FormGroup>
                <Button>Get Weather</Button>
            </Form >
        )
    }
}

export default FormInputs