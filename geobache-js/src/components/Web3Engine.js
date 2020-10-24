import { Component } from "react";
import GeoBache from "../contracts/GeoBache.json";
import getWeb3 from "../getWeb3.js";

class Web3Engine extends Component {

  constructor(props) {
    super(props)
    this.state ={
      web3: {},
      contract: {},
      accounts: [],
      loc: {}
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
      const networkId = 1603546840646
      const deployedNetwork = GeoBache.networks[networkId];
      console.log(networkId)

      const instance = new web3.eth.Contract(
        GeoBache.abi,
        deployedNetwork && deployedNetwork.address,
      );

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
    let { contract, accounts, loc } = this.state;
    console.log(contract,accounts,loc)
    let test = await contract.methods.checkLocation(1, Math.trunc(loc.coords.latitude), Math.trunc(loc.coords.latitude)).call()
    console.log(test)
    // console.log(this.state);
  }

  register() {
    let { contract, accounts, loc } = this.state;
    let geo
    navigator.geolocation.getCurrentPosition((res) => { geo = res })
    console.log(contract,accounts,loc)
    contract.methods.register( Math.trunc(loc.coords.latitude), Math.trunc(loc.coords.latitude)).send({ from: accounts[0] })
    // console.log(this.state);
  }

  render = () => {
    if(this.state.web3) {
    return (
      <div>
        {this.props.children}
        <button onClick={ this.register.bind(this) }>ZOOP</button>
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