import React, { Component } from 'react'
import Title from './components/Title'
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
    console.log("E", e.target.elements.country.value)
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
   // console.log('city', city)
   // console.log('city', country)
    // e.target.elements.city.value = ''
    // e.target.elements.country.value = ''
    //console.log(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
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
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-5 title-container">
                  <Title />
                </div>
                <div className="col-lg-6 col-md-6 form-container">
                  <Form getWeather={this.getWeather} />
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
    );
  }
}


export default App

