import React, { Component } from 'react';
import './viewer.css';
import Navbar from '../Nav';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from  'three/examples/jsm/postprocessing/EffectComposer';
import DAppConnection from '../DAppConnection';
import loading from '../images/loading.gif';



class Background extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      background: '',
    };
  }

  render(){
    return(
      <div id="space">
      <div class="stars"></div>
      <div class="stars"></div>
      <div class="stars"></div>
      <div class="stars"></div>
      <div class="stars"></div>
    </div>
    )
  }

}




class ControlPanel extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'infoBtn',
      sliderValue: 1,
      craftingOpen: false,
      iconStyle: {
        position: 'absolute',
        width: '1.7vw',
        height: '1.7vw',
        marginLeft: '-0.65vw',
        marginTop: '-0.95vw',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        border: '#ffffff solid 2px',
        backgroundColor: 'rgb(31, 31, 31)',
        borderRadius: '100%',
        transition: 'all 0.3s ease-in-out',
        zIndex: '5',
        backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/4341/4341102.png')"
      },
      oreTotal: 0,
      minedOreData: {
  
      },
      owner: '0x0167be8632c8d2aa05ea9a5ada4b3bf616f3ee9d',

    }
    this.sliderRef = React.createRef();

  }

  checkIsOwner(){
    if(this.state.owner === this.props.address){
      return true;
    }
    else{
      return false;
    }
  }



  getTotalOre(){
    var total = 0;
    for(var i = 0; i < Object.keys(this.props.oreData).length; i++){
      total += this.props.oreData[Object.keys(this.props.oreData)[i]];
    }
    return total;
  }
  componentDidMount() {
    this.sliderRef.current.addEventListener('input', this.handleSliderChange)
    this.setState({oreTotal: this.getTotalOre()})

    

  }


  handleSliderChange = (event) => {
    this.setState({
      sliderValue: event.target.value
    })


  }

  changeTab = (event) => {
    this.setState({
      currentTab: event.target.id
    })
    if(event.target.id === 'infoBtn'){
      this.setState({
        iconStyle: {
          position: 'absolute',
          width: '1.7vw',
          height: '1.7vw',
          marginLeft: '-0.65vw',
          marginTop: '-0.95vw',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '#ffffff solid 2px',
          backgroundColor: 'rgb(31, 31, 31)',
          borderRadius: '100%',
          transition: 'all 0.3s ease-in-out',
          zIndex: '5',
          backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/4341/4341102.png')"
        }
      })
    }
    if(event.target.id === 'commandBtn'){
      this.setState({
        iconStyle: {
          position: 'absolute',
          width: '1.7vw',
          height: '1.7vw',
          marginLeft: '-0.65vw',
          marginTop: '-0.95vw',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '#ffffff solid 2px',
          backgroundColor: 'rgb(31, 31, 31)',
          borderRadius: '100%',
          transition: 'all 0.3s ease-in-out',
          zIndex: '5',
          backgroundImage: "url('https://cdn-icons.flaticon.com/png/512/2949/premium/2949059.png?token=exp=1641426184~hmac=fb8a4ef1c410f97efa77ac196f203045')"
        }
      })
    }
    if(event.target.id === 'tradeBtn'){
      this.setState({
        iconStyle: {
          position: 'absolute',
          width: '1.7vw',
          height: '1.7vw',
          marginLeft: '-0.65vw',
          marginTop: '-0.95vw',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '#ffffff solid 2px',
          backgroundColor: 'rgb(31, 31, 31)',
          borderRadius: '100%',
          transition: 'all 0.3s ease-in-out',
          zIndex: '5',
          backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/3309/3309991.png')"
        }
      })
    }
  }



  toggleCrafting = () => {
    this.setState({
      craftingOpen: !this.state.craftingOpen
    })
  }




  render(){
  

    return(
      <div id="control-panel">
       <CraftingMenu 
        open={this.state.craftingOpen}
        
       />

  <div id="tabs">
    <ul>
      <li id="infoBtn" onClick={this.changeTab}>Info</li>
      <li id="commandBtn" onClick={this.changeTab}>Command</li>
      <li id="tradeBtn" onClick={this.changeTab}>Trade</li>
    </ul>
    </div>
    <div
    id="control-panel-icon" 
    style={this.state.iconStyle}

    
    ></div>
    <div id="infoPanel"
    style={
      this.state.currentTab === 'infoBtn' ? {display: 'block'} : {display: 'none'}
    }
    >
      <h3>{this.props.planetName}</h3>
      <p>Type: {this.props.planetType}</p>
      <p>Number: {this.props.planetNumber}</p>
      <p>Diameter: {this.props.properties.diameter}</p>
      <p>Gravity: {this.props.properties.gravity}</p>
      <p>Liquid: {this.props.properties.liquid}</p>
      <p>Atmosphere: {this.props.properties.atmosphere}</p>
      <p>Temperature: {this.props.properties.temparature}</p>
      <p>Moons: {this.props.properties.moons}</p>
      <hr></hr>
      <p>Ores: {Object.keys(this.props.oreData).length}</p>
      <p>Total Ore: {this.state.oreTotal}</p>
      <p>Mined Ore: {this.state.minedOre}</p>
      <hr></hr>
      <p>Owner: {this.state.owner}</p>
      <p>Is Owner: {this.checkIsOwner()? "Yes": "No"}</p>
      {/* Create a button to view on OpenSea */}
      <button>View on OpenSea</button>

    </div>
    <div id="commandPanel"
    style={this.state.currentTab === 'commandBtn' ? {display: 'block'} : {display: 'none'}  }>
    <p style={
      {
        textAlign: 'center',
        padding: '0',
        margin: '0',
        fontSize: '1.5vw',
        marginTop: '-0.5vw',
      }
    }>Visuals</p>
      <div id="brightness_slider" ref={this.sliderRef}>
        <p>🔆</p>
        <input type="range" min="0" max="7" value={this.state.sliderValue} step="0.1" id="slider"/>
      </div>
      <hr></hr>
      <h2 style={
        {
          textAlign: 'center',
          padding: '0',
          margin: '0',
          fontSize: '1.5vw',
          marginTop: '-0.5vw',

        }
      }>Mining</h2>
      <p>Mining Beam Level: 1</p>
      <label> 
      <input className='MineToggle' type="checkbox"/>
      </label>
      <br></br>
      {/*Creats Toggles For Each Ore */}
      {Object.keys(this.props.oreData).map((ore, index) => {
        return(
          <div key={index} className='OreSwitch'>
            <p>{ore}</p>
            <label>
              <input className='OreCheck' type="checkbox" onChange={this.props.toggleOre} id={ore}/>
            </label>
          </div>
        )
      })}
      <br></br>

      <hr></hr>
      <p style={
        {
          textAlign: 'center',
          padding: '0',
          margin: '0',
          fontSize: '1.5vw',
          marginTop: '-0.5vw',

        }
      }>Inventory</p>
      <div id="inventory">
        {/* Creates a button for each ore in the inventory */}
        {Object.keys(this.props.oreData).map((ore, index) => {
          return(
            <p key={index} id={ore} className='MinedOre'> {ore}: 0🧱</p>
            //Ore count
          )
        })}
      </div>
      {/* Crafting & Upgrades Area */}
      <hr></hr>
      <p style={
        {
          textAlign: 'center',
          padding: '0',
          margin: '0',
          fontSize: '1.5vw',
          marginTop: '-0.5vw',
        }
      }>Crafting</p>
      <div id="crafting">
        {/* Creates a button for each recipe */}
        {/* Open Crafting Menu Button */}
        <button onClick={this.toggleCrafting}>Open Crafting Menu</button>
 
      </div>
    
    </div>

    <div id="tradePanel"
        style={this.state.currentTab === 'tradeBtn' ? {display: 'block'} : {display: 'none'}  }

    ></div>
  </div>
    )
  }
}
   
class CraftingMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      items: [],    
    }
  }
  componentDidMount(){
    this.props.open ? this.setState({open: true}) : this.setState({open: false})
  }
  toggleCrafting = () => {
    this.setState({
      open: !this.state.open
    })
  }


  render(){
    return(
      <div id="craftingMenu" style={
        this.state.open ? {display: 'block'} : {display: 'none'}
      } onClick={this.toggleCrafting}>
        <h2>Recipes</h2>
        <div id="recipes">
          {/* Creates a button for each recipe */}
          {/* Open Crafting Menu Button */}
          <button onClick={this.toggleCrafting}>Close</button>

        </div>
      </div>
    )
  }
}





class Viewer extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      properties: {},
      oreData: {},
      sceneData: {},
      aquired: false,   
      walletAddress: '',
      loading: true,
  }
}

//wait for data to load before rendering the viewer


  



   componentDidMount() {
    var query = new URLSearchParams(window.location.search);
    //SEND THE DATA IN THE QUERY STRING
    fetch('http://127.0.0.1:8000/getPlanet?name='+query.get('name'))
    .then(response => response.json())
    .then(data => {

        try {
          
        var type = data[0].planetType;
        var propers = data[0].properties;
        var oreD = data[0].oreData;
        var pNum = data[0].planetNumber;
        delete data[0].planetName;
        delete data[0].planetType;
        delete data[0].planetNumber;
        delete data[0].properties;
        delete data[0].oreData;

        this.setState({
          data: {
            planetName: query.get('name'),
            planetType: type,
            planetNumber: pNum,
          },
          properties: propers,
          oreData: oreD,
          sceneData: data[0],
          aquired: true,
          loading: false,
        })

        } catch (error) {
          
          this.setState({
            aquired: false,
            loading: false,
          })
          
          
        }

        
    })
    this.getAddress();
  }
  

  
  getAddress(){
    //get window.web3
    this.setState({
      walletAddress: window.ethereum.selectedProvider._addresses[0]
    })
    
  }
    
  
 


  render() {
    console.log(this.state.data)
    if(this.state.aquired === true ){
      
      return (
    <div className='Scaffold'>
        <Navbar />
        <DAppConnection />
        <Background />
            <div className='CraftIcon'>
              <p>Craft</p>
            </div>

            <div className="Viewer">
            <Card 
            planetName={this.state.data.planetName}
            planetNumber={this.state.data.planetNumber}
            planetType={this.state.data.planetType}
            properties={this.state.properties}
            sceneData={this.state.sceneData}
            oreData={this.state.oreData}
            />
            <div id="line-1">
            <div id="traveler-1"></div>
            </div>
            <div id="line-2">
            <div id="traveler-2"></div>
            </div>
            <ControlPanel 
            planetName={this.state.data.planetName}
            planetNumber={this.state.data.planetNumber}
            planetType={this.state.data.planetType}
            properties={this.state.properties}
            oreData={this.state.oreData} 
            address = {this.state.walletAddress}           
            />
            </div>
        
    </div>
      );
    }else{
      return (
        <div className='Scaffold'>
        <Navbar />
        <Background />
        <h1 style={
          {
          color: 'white',
          textAlign: 'center',
          fontSize: '5vw',
          }
        }>{this.state.loading == true? 'Searching':'Planet Does Not Exist'}</h1>
        <div style={
          this.state.loading == true? {
            width: '100%',
            height: '5vw',
            backgroundImage: "url(https://media4.giphy.com/media/an6kqFG9KeesWN6GSM/giphy.gif?cid=790b761156ae05379dc415381bacc81a24817ed2d4ead257&rid=giphy.gif&ct=s)",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          } 
          ://========== Loading Screen ==========
          {
            width: '100%',
            height: '25vw',
            backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/4270/4270639.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }
         
          
        }>

        </div>

        </div>
      );
    }

  }

}







class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
    planetCardStyle: {
    
    },
    planetCardInfoStyle: {

    },
    planetCardTitleStyle: {

    },
    typeIconStyle: {

    },
    cardBackgroundStyle: {

    },
    
    }
  }


  componentDidMount() {
      if(this.props.planetType.includes("Toxic")){

        this.setState({
          planetCardStyle: {
            border: '5px solid #12a220',
            boxShadow: '-1px -1px 5px 1px lime, 1px 1px 5px 1px yellowgreen',
          },
          planetCardInfoStyle: {
            borderColor: '#ffffff',
            color: '#98D023',
            textShadow: '0px 0px 10px #f9ff00',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#98D023',
            textShadow: '0px 0px 10px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/biohazard.png')",
            filter: 'invert(67%) sepia(39%) saturate(5600%) hue-rotate(65deg) brightness(111%) contrast(122%)',
          },
          cardBackgroundStyle: {
            backgroundColor: '#4ede00',
            backgroundImage: "url(../images/clouds.svg)",
            backgroundSize: '56px 28px',
            backgroundRepeat: "repeat",
            fill: "#98D023",
            fillOpacity: "0.75",
            fillRule: "evenodd",
          },

        })
       }
      else if(this.props.planetType.includes("Magma")){

        this.setState({
          planetCardStyle: {
            border: '5px solid #f12711',
            boxShadow: '-1px -1px 5px 1px #f12711, 1px 1px 5px 1px #f5af19',
          },
          planetCardInfoStyle: {
            borderColor: '#ffffff',
            color: '#f5af19',
            textShadow: '3px 3px 10px #f12711',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#f5af19',
            textShadow: '0px 0px 10px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/volcano.png')",
            filter: 'invert(65%) sepia(96%) saturate(803%) hue-rotate(349deg) brightness(103%) contrast(92%)',
            borderRadius: '50%',
          },
          cardBackgroundStyle: {
            backgroundColor: '#f12711',
            backgroundImage: "url(../images/melt.svg)",
            backgroundSize: '24px 20px',
            backgroundRepeat: "repeat",
            fill: "#98D023",
            fillOpacity: "0.75",
            fillRule: "evenodd",
          },
        })
      }
      else if(this.props.planetType.includes("Icy")){

      
        this.setState({
          planetCardStyle: {
            border: '5px solid #FFFDE4',
            boxShadow: '-1px -1px 5px 1px #4ecbf5, 1px 1px 5px 1px #4ecbf5',
          },
          planetCardInfoStyle: {
            borderColor: '#FFFDE4',
            color: '#FFFDE4',
            textShadow: '5px 5px 10px #0575E6',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#FFFDE4',
            textShadow: '0px 0px 10px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/ice.png')",

            filter: 'invert(96%) sepia(31%) saturate(873%) hue-rotate(307deg) brightness(120%) contrast(101%)',
          },
          cardBackgroundStyle: {
            background: "repeating-linear-gradient( 45deg, #FFFDE4, #FFFDE4 3.5px, #4ecbf5 3.5px, #4ecbf5 17.5px )",
            backgroundSize: "2.5vw",
            backgroundRepeat: "repeat",
          },
        })

      }
      else if(this.props.planetType.includes("Strange")){


        this.setState({
          planetCardStyle: {
            border: '5px solid #ff00ff',
            boxShadow: '-1px -1px 5px 1px #ff00ff, 1px 1px 5px 1px #ff00ff',
          },
          planetCardInfoStyle: {
            borderColor: '#ffffff',
            color: '#ff00ff',
            textShadow: '0px 0px 10px #ff00ff',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#ffffff',
            textShadow: '0px 0px 10px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/strange.png')",
            filter: 'invert(19%) sepia(89%) saturate(3375%) hue-rotate(294deg) brightness(115%) contrast(132%)',
          },
          cardBackgroundStyle: {
            backgroundImage: "url(../images/bevel.svg)",
            backgroundColor: '#000000',
            backgroundSize: '38px 38px',
            backgroundRepeat: "repeat",
            fill: "#98D023",
            fillOpacity: "0.75",
            fillRule: "evenodd",
          },
        })
      }
      else if(this.props.planetType.includes("Swamp")){

        
        this.setState({
          planetCardStyle: {
            border: '7px solid #677b44',
            boxShadow: '-1px -1px 5px 1px #bdda57, 1px 1px 5px 1px #bdda57',
          },
          planetCardInfoStyle: {
            borderColor: '#677b44',
            color: '#bdda57',
            textShadow: '0px 0px 10px #677b44',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#bdda57',
            textShadow: '0px 0px 10px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/swamp.png')",
            filter: 'invert(100%) sepia(62%) saturate(1699%) hue-rotate(14deg) brightness(89%) contrast(93%)',
          },
          cardBackgroundStyle: {
            backgroundImage: "url('../images/waves.svg')",
            backgroundColor: '#000000',
            backgroundSize: '100px 18px',
            backgroundRepeat: "repeat",
            fill: "#98D023",
            fillOpacity: "0.75",
            fillRule: "evenodd",
          },
        })
      }
      else if(this.props.planetType.includes("Dune")){


        this.setState({
          planetCardStyle: {
            border: '5px solid #d6ae7b',
            boxShadow: '-1px -1px 5px 1px #eacda3, 1px 1px 5px 1px #eacda3',
          },
          planetCardInfoStyle: {
            borderColor: '#d6ae7b',
            color: '#eacda3',
            textShadow: '0px 0px 10px #eacda3',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#eacda3',
            textShadow: '0px 0px 10px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/dune.png')",
            filter: 'invert(94%) sepia(6%) saturate(2515%) hue-rotate(326deg) brightness(96%) contrast(92%)',
          },
          cardBackgroundStyle: {
            backgroundImage: "repeating-radial-gradient( circle at 0 0, transparent 0, #eacda3 12px ), repeating-linear-gradient( #deca5d55, #deca5d )",
            backgroundSize: '500px 950px',
          },
        })
  
      }else if(this.props.planetType.includes("Scorched")){

        this.setState({
          planetCardStyle: {
            border: '5px solid #1F1C18',
            boxShadow: '-1px -1px 5px 1px #fd1d1d, 1px 1px 5px 1px #fcb045',
          },
          planetCardInfoStyle: {
            borderColor: '#1F1C18',
            color: '#fcb045',
            textShadow: '3px 3px 10px #fd1d1d',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#fcb045',
            textShadow: '3px 3px 6px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/scorched.png')",
            filter: 'invert(37%) sepia(74%) saturate(7441%) hue-rotate(349deg) brightness(104%) contrast(108%)',
          },
          cardBackgroundStyle: {
            backgroundColor: '#000000',
            backgroundImage: "url(../images/rain.svg)",
            backgroundSize: '20px 32px',
            backgroundRepeat: "repeat",
            fill: "#0050f9",
            fillOpacity: "0.5",
          },
        })
      }
      else if(this.props.planetType.includes("Terra")){

        this.setState({
          planetCardStyle: {
            border: '7px solid #6DD5FA',
            boxShadow: '-1px -1px 5px 1px #92fe9d, 1px 1px 5px 1px #4ede00',
          },
          planetCardInfoStyle: {
            borderColor: '#6DD5FA',
            color: '#4ede00',
            textShadow: '3px 3px 5px #000000',
          },
          planetCardTitleStyle: {
            fontWeight: 'italic',
            color: '#00c9ff',
            textShadow: '3px 3px 5px #00000',
          },
          typeIconStyle: {
            backgroundImage: "url('../images/terra.png')",
            filter: 'invert(55%) sepia(99%) saturate(1337%) hue-rotate(153deg) brightness(100%) contrast(107%)',
          },
          cardBackgroundStyle: {
            backgroundColor: '#4ede00',
            backgroundImage: "url(../images/topography.svg)",
            backgroundSize: '600px 600px',
            backgroundRepeat: "repeat",
            fill: "#0050f9",
            fillOpacity: "0.5",
          },
        })
      }
    
    this.generateScene()
  }

 

  
  
  generateScene() {
    var loader = new THREE.ObjectLoader();
    var scene;
    var width = this.mount.clientWidth;
    var height = this.mount.clientHeight;
    const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 4000 );
    const renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
    this.mount.appendChild( renderer.domElement );


    try {
      scene = loader.parse(this.props.sceneData);
    } catch (error) {
      console.log(error);
      console.log("Could not create scene");
      scene = new THREE.Scene();
    }

    const composer = new EffectComposer(renderer);
    composer.setSize(360, 360);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.2, // strength
    0.4, // kernel size
    0.85// sigma 
    );
    bloomPass.threshold = 0.5;
    bloomPass.strength = 0.45;
    bloomPass.radius = 0.46;
    composer.addPass(bloomPass);
    //add a film pass
    // const filmPass = new FilmPass(0.55, 0.75, 2048, false);
    // filmPass.renderToScreen = true;
    // composer.addPass(filmPass);
    renderer.setSize( width, height );
  


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();



    //add a ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);




    //add a directional light
    const light = new THREE.SpotLight(0xdeddc8, 1.5);
    light.position.set(5, 100,  505);
    scene.add(light);




    var planet = scene.children[0];

    console.log(scene)


    var ring;

    var moons = [];

    camera.position.z = 650;

    const animate = function () {
    requestAnimationFrame( animate );



      planet.rotation.y += 0.001;
      planet.rotation.x += 0.0001;
      planet.rotation.z += 0.001;

    
    composer.render();

    };

    animate();

    }

  render() {
    
    console.log(this.props)
    return (
      <div id="card_area">
      <div id="planet-card" style={this.state.planetCardStyle}>
        <div id="card-background" style={this.state.cardBackgroundStyle}></div>
        <div id="card-slider"></div>
        <div id="planet-card-title" style={this.state.planetCardTitleStyle}>
          <div id="planet_number">{this.props.planetNumber}</div>
          <h1 id="planet_name">{this.props.planetName}</h1>
          <div id="type-icon" style={this.state.typeIconStyle}></div>
        
        </div>
        
          <div id="planet-viewer">
        
          <div id='spacePort' style={{
             width: '23vw',
              height: '43vh',
               zIndex:'0',
               borderTop: '#fff solid 3px',
               borderBottom: '#fff solid 3px',
               marginTop: '5%',
               borderRadius: '1.2vw',
               boxShadow: '0 0 10px #060707',
               overflow: 'hidden',
         
               
               }} ref={(mount) => { this.mount = mount }}></div>
          </div>
        <div id="planet-card-info" style={this.state.planetCardInfoStyle}>
          <div id="info-card-icon"></div>
          <table>
            <tbody> 
              <tr id="type">
                <td className="property" >Type: </td>
                <td id="planet_type" className="value">{this.props.planetType}</td>
              </tr>
              <tr>
                <td className="property">Diameter:  </td>
                <td id="planet_size"className="value">{this.props.properties.diameter}</td>
              </tr>
              <tr>
                <td className="property">Liquid State:</td>
                <td id="planet_water"className="value">{this.props.properties.liquid}</td>
              </tr>
              <tr>
                <td className="property">Temperature:</td>
                <td id="planet_tempature"className="value">{this.props.properties.temparature}</td>
              </tr>
              <tr>
                <td className="property">Atmosphere:</td>
                <td id="planet_atmosphere"className="value">{this.props.properties.atmosphere}</td>
              </tr>
              <tr>
                <td className="property">Mass: </td>
                <td id="planet_mass"className="value">TBD</td>
              </tr>
        
              <tr>
                <td className="property">Gravity: </td>
                <td id="planet_gravity"className="value">{this.props.properties.gravity}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="planet-ore-info">
          <table>
          <div id="mining-icon"></div>
        
            <tbody id="oreContent">
              <tr id="topRow">
                <td id="ore-1"className="ore">
                  {
                  Object.keys(this.props.oreData)[0] !== undefined ?
                  Object.keys(this.props.oreData)[0] + ':': ''}
                  </td>
                <td id="ore-content-1"className="ore-content">
                  {
                  Object.keys(this.props.oreData)[0] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[0]] + '🧱'
                  : ''
                  }
                </td>
                <td id="ore-2"className="ore">
                  {
                  Object.keys(this.props.oreData)[1] !== undefined ?
                  Object.keys(this.props.oreData)[1] + ':':
                  ''
                }
                </td>
                <td id="ore-content-2"className="ore-content">
                  {
                  Object.keys(this.props.oreData)[1] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[1]] + '🧱'
                  : ''}
                </td>
                <td id="ore-3"className="ore">
                  {
                  Object.keys(this.props.oreData)[2] !== undefined ?
                  Object.keys(this.props.oreData)[2] + ':'
                  : ''}
                </td>
                <td id="ore-content-3"className="ore-content">
                  {
                  
                  Object.keys(this.props.oreData)[2] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[2]] + '🧱'
                  : ''}
                </td>
              </tr>
              <tr id="middleRow">
                <td id="ore-4"className="ore">
                  {
                  Object.keys(this.props.oreData)[3] !== undefined ?
                  Object.keys(this.props.oreData)[3] + ':'
                  : ''}
                </td>
                <td id="ore-content-4"className="ore-content">
                  {
                  Object.keys(this.props.oreData)[3] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[3]] + '🧱'
                  : ''}
                </td>
                <td id="ore-5"className="ore">
                  {
                  Object.keys(this.props.oreData)[4] !== undefined ?
                  Object.keys(this.props.oreData)[4] + ':'
                  : ''}
                </td>
                <td id="ore-content-5"className="ore-content">
                  {
                  Object.keys(this.props.oreData)[4] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[4]] + '🧱'
                  : ''}
                </td>
                <td id="ore-6"className="ore">
                  {
                  Object.keys(this.props.oreData)[5] !== undefined ?
                  Object.keys(this.props.oreData)[5] + ':'
                  : ''}
                </td>
                <td id="ore-content-6"className="ore-content">
                  {
                  Object.keys(this.props.oreData)[5] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[5]] + '🧱'
                  : ''}
                </td>
              </tr>
              <tr id="bottomRow">
                <td id="ore-7" className="ore">
                  {
                  Object.keys(this.props.oreData)[6] !== undefined ?
                  Object.keys(this.props.oreData)[6] + ':'
                  : ''}
                </td>
                <td id="ore-content-7" className="ore-content">
                  {
                  Object.keys(this.props.oreData)[6] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[6]] + '🧱'
                  : ''}
                </td>
                <td id="ore-8"className="ore">
                  {
                  Object.keys(this.props.oreData)[7] !== undefined ?
                  Object.keys(this.props.oreData)[7] + ':'
                  : ''}
                </td>
                <td id="ore-content-8"className="ore-content">
                  {
                  Object.keys(this.props.oreData)[7] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[7]] + '🧱'
                  : ''}
                </td>
                <td id="ore-9"className="ore">
                  {
                  Object.keys(this.props.oreData)[8] !== undefined ?
                  Object.keys(this.props.oreData)[8] + ':'
                  : ''}
                </td>
                <td id="ore-content-9"className="ore-content">
                  {
                 Object.keys(this.props.oreData)[8] !== undefined ?
                  this.props.oreData[Object.keys(this.props.oreData)[8]] + '🧱'
                  : ''}
                </td>
              </tr>
        
              </tbody> 
        
          </table>
        </div>
      </div>
    </div>
    );
  }
}


export default Viewer;
