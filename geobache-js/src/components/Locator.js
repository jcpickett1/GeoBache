import { Component } from "react"

class Locator extends Component {

    click() {
        navigator.geolocation.getCurrentPosition((res) => { document.getElementById('sample').innerHTML= "N: " + res.coords.latitude + " W: " + res.coords.longitude })
    }

    render() {
        return(
            <div>
                <div id="sample">test</div>
                <button onClick={this.click}>zoop</button>
            </div>
        )
    }
}

export default Locator