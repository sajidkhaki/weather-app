import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker, faSun, faMapPin, faPenAlt } from '@fortawesome/free-solid-svg-icons'
const Weather = props => {
    return (
        <div className="weather__info">
            {
                props.city && props.country && <p className="weather__key">
                    <FontAwesomeIcon icon={faMapPin} /> Location:
                    <span className="weather__value"> {props.city}, {props.country}</span>
                </p>
            }
            {
                props.temperature && <p className="weather__key">
                    <FontAwesomeIcon icon={faSun} />Temperature:
                    <span className="weather__value"> {props.temperature}	</span>
                </p>
            }
            {
                props.humidity && <p className="weather__key">
                    <FontAwesomeIcon icon={faMapMarker} />Humidity:
                    <span className="weather__value"> {props.humidity} </span>
                </p>
            }
            {
                props.description && <p className="weather__key">
                    <FontAwesomeIcon icon={faPenAlt} />Description:
                    <span className="weather__value"> {props.description} </span>
                </p>
            }
            {
                props.error && <p className="weather__error">{props.error}</p>
            }
        </div>
    )
}
export default Weather
