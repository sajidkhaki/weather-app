import React from 'react'

const Form = props => {
    return (
        <form onSubmit={props.getWeather} className="my-Form">
            <div className="my-form-div">
                <input type="text" name="city"  placeholder="City..." />
                <input type="text" name="country"  placeholder="Country..." />
            </div>
            <div className="bottom-w3l">
                <div className="submit sub1">
                    <button className="my-button">Find</button>
                </div>
            </div>
       </form>
    )
}
export default Form