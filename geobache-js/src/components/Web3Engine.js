import { Component } from "react";
import GeoBache from "../contracts/GeoBache.json";
import getWeb3 from "../getWeb3.js";

class Web3Engine extends Component {

  constructor(props) {
    super(props)
    this.state ={
      contract: {},
      web3: {},
      loc: {},
      accounts: []
    }
  }

  componentDidMount = async () => {
    try {
      this.submitLoc = this.submitLoc.bind(this);
      this.register = this.register.bind(this);
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log(web3)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log(accounts)

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GeoBache.networks[networkId];
      console.log(networkId)

      const instance = new web3.eth.Contract(
        GeoBache.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance)

      var cacheEvent = instance.events.Cache([],(err, res) => {
        console.log(res);
        alert("Your Cache ID is: " + res.returnValues.index);
      });
      // cacheEvent.watch((err, res) => {
      //   alert("Heck yah!");
      // })

      navigator.geolocation.getCurrentPosition((res) => { this.setState({ loc: res }); });
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
          web3,
          accounts,
          contract: instance
        });
        console.log(this.state)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  async submitLoc() {
    let { contract, loc } = this.state;
    let id = document.getElementById("zooper").value;
    console.log(id)
    let test = await contract.methods.checkLocation( id, Math.trunc(loc.coords.latitude), Math.trunc(loc.coords.latitude)).call()
    if(test) {
      alert('You visited cache ' + id + '!');
    } else {
      alert('You don\'t appear to be near cache ' + id);
    }
  }

  async register() {
    let { contract, accounts, loc } = this.state;
    let info = contract.methods.register( Math.trunc(loc.coords.latitude), Math.trunc(loc.coords.latitude)).send({ from: accounts[0] })
      .then((resp) => {
        console.log(resp);
      })
    console.log(info);
  }

  render = () => {
    if(this.state.web3) {
    return (
      <div>
        {this.props.children}
        <button onClick={ this.register.bind(this) }>ZOOP</button>
        Check: <input id="zooper"></input>
        <button onClick={ this.submitLoc.bind(this) }>Zoop</button>
      </div>
      )
    }
    return(
      <div>
        Failed to load web3.
      </div>
    )
  }
}

export default Web3Engine