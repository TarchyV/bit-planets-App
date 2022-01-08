import metaMask from './metamask.svg';
import './App.css';
import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Navbar from './Nav';
import DAppConnection from './DAppConnection';
import NeedMask from './routes/need_mask';
import Footer from './Footer';
class MintCounter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mintCount: 0};
  }
  componentDidMount() {
    this.interval = setInterval(() => this.increaseMintCount(), 1000);
  }
   increaseMintCount(){
    this.setState({mintCount: this.state.mintCount + 1});
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
    <div className="MintCounter">
      <h2>Planets Minted:</h2>
      <p>{this.state.mintCount}</p>
    </div>
  )
}
}




function Title(props) {
  return (
  
  <div className = "Title">
  <h1>{props.title}</h1>
  <Description description="A decentralized planet mining RPG with 
    a growing collection of procedurally generated, low-res styled, 
    3D Planets placed inside animated trading cards. Built on the ethereum block chain, generated from over 200+ different variables and traits.
    Each planet is unique and carries ores, minerals, and other resources for you to collect. Use these 
    resources to craft upgrades, mint rare items, or trade with other players."
     />
  <Button variant="outlined" className="snackBtn" id="mintBtn" >Mint Now</Button>
  <Button variant="outlined" className="snackBtn" id="learnBtn">Learn More</Button>

  </div>
  
  );
}
function Description(props) {
  return (
    <p className = "Description">{props.description}</p>
  );
}




function InfoPanel(props) {
  return (
    <div className="InfoPanel">
      <img src={props.url}  alt="IMG" />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  ) 

}

function  MintForm(props) {
  return (
    <div className="MintForm">
      
      <h1>Mint A Planet</h1>


      <div className='mintImage'> </div>

    <br></br>
      <p className='gas-disclaimer'>
      Ethereum's gas is an essential regulator that prevents 
      anyone from spamming the network. All computation over Ethereum stretches a measure meant 
      to maintain security in place. Gas limits, paid for by each computational execution, 
      help make sure that malicious individuals can't use unsorted loads of computation power 
      to become de-facto coders on the Ethereum network and hijack the future they helped build together
      </p>
      <button variant="contained" className="snackBtn" id="mintBtn" >Mint Now!</button>
      <br></br>
      <p className='mintCount'>{props.mintCount}/10000 left!</p>
    </div>

  )
}






function App() {


  //f The DAppConnection class throws no errors else shoe needmask
  var widget = <NeedMask />;
  try {
    widget = <DAppConnection />;
    
  } catch (error) {
    console.log(error);
    
  }


  return (
    <div className="App">
      <Navbar />
      <MintCounter />
     {widget}
      <div className="Splash">
        <Title title="BIT PLANETS"/>
        <div className='planet_preview'>
          <div className='planet'></div>
        </div>
      </div>
      <div className="Info">
        <InfoPanel title="Generation"
        url = "https://i.ibb.co/mtQ0wxh/GenPic.png"
        description="
          Planets are generated procedurally based on a variety of variables.
          These varibles control the shape of the planet, the composition of the planet, the type of planet, and the rarity of the planet.
          Randomness is used to generate the planet's traits and the planet's rarity. Each planet is unique and has a unique rarity level.
          Rarities include Water, Mountains, Rivers, Craters, Moons, Clouds, Atmospheric Denisty, A Planetary Ring, ores and more.
          "/>
        <InfoPanel title="Gameplay"
        url = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/27209929/1b85bbe274670f2e11932b6802796555a18837e1.gif"
         description=" 
          Each planet has a set of resources that can be collected. These resources are used to craft upgrades, mint rare items, or trade with other players.
          To mine these resources, you command your ship to mine the planet. Mining is a slow process and requires a lot of energy but with crafting,
          you can craft ship upgrades to increase your mining speed and energy capacity.
          If you mine all the ores and resources on your planet your planet will be converted into a baron type planet. This planet will have a higher rarity.
          "/>
        <InfoPanel title="Resource Trading" 
        url = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/clans/27209929/1b85bbe274670f2e11932b6802796555a18837e1.gif"
        description=" 
        Trading is a great way to earn more resources and upgrades. You can trade with other players to earn resources and upgrades.
        Some planets don't have the resources needed to craft upgrades, so you can trade with other players to get the resources needed to craft upgrades.
        You can also trade with other players to get rare items. Rare items can be used to craft rare upgrades. 
        "/>
      </div>
      <div className='Mint'>
        <MintForm mintCount={10000} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
