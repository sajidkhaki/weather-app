import React, { Component } from 'react'
import Title from './components/Title'
import SubTitle from './components/SubTitle'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = "5f5925f309b48c91b86caa5960fda964"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }
  getWeather = async (e) => {
    console.log("E", e.target.elements.city.value)
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    // e.target.elements.city.value = ''
    // e.target.elements.country.value = ''
    try {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await api_call.json();
      if (data) {
        if (city && country) {
          if (data.cod != "404") {
            this.setState({
              temperature: data.main.temp,
              city: data.name,
              country: data.sys.country,
              humidity: data.main.humidity,
              description: data.weather[0].description,
              error: ""
            });
          } else {
            this.setState({
              temperature: undefined,
              city: undefined,
              country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Data not available for particular city"
            })
          }
        } else {
          this.setState({
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: "Please enter the values."
          })
        }
      } else {
        console.log("cannot fetch")
      }
    } catch (error) {
      console.log('Error', error)
      this.setState({
        error: "Please try again later"
      })
    }
  }
  render() {
    return (
      <div className="head agile">
          <div className="logo">
              <div className="logo-top wel">
                <Title />
              </div>
              <div className="logo-bottom w3layouts">
                <div className="sky-form">									
                  <SubTitle />
                  <label className="radio hide-radio">
                      Find out temperature, humidity and more...
                  </label>
                  <label className="radio hide-radio">
                       Find out temperature, humidity and more...
                  </label>
                </div>
              </div>
          </div>
          <div className="login w3">
              <div className="sap_tabs">
                <div id="horizontalTab">
                    <ul className="resp-tabs-list">
                      <li className="resp-tab-item" ><span>Fill Details</span></li>
                    </ul>
                    <div className="resp-tabs-container">
                      <div className="tab-1 resp-tab-content" >
                          <div className="login-top agileits">
                            <Form getWeather={this.getWeather} />
                          </div>
                          <div className="weather-div">
                          <Weather
                              temperature={this.state.temperature}
                              humidity={this.state.humidity}
                              city={this.state.city}
                              country={this.state.country}
                              description={this.state.description}
                              error={this.state.error}
                            />
                          </div>
                      </div>
                    </div>
                </div>
              </div>
          </div>
          <div className="clear"></div>
        </div>
    );
  }
}


export default App