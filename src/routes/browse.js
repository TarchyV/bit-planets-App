import React, { Component } from 'react';
import './browse.css';
import Navbar from '../Nav';
import Footer from '../Footer';
import { Link } from 'react-router-dom';

class Browse extends Component {

constructor(props) {
  super(props);
  this.state = {
    planets: [],
    loading: true,
    planetName: '',
  };
}

setPlanetName(name) {
  this.setState({planetName: name});
}

goToPlanet() {
  function open(url) {
    const win = window.open(url, '_blank');
    if (win != null) {
      win.focus();
    }
  }
  this.props.history.push(`/planet/?${this.state.planetName}`);
}


render() {
  var children = []
  for(var i = 0; i < 8; i++) {
    children.push(<div className="Fplanet" key={i}> </div>)
  }
  return (
<div className='Scaffold'>
    <Navbar />
        <div className="Browse">
            <h1>Enter The Name Of The Planet</h1>
            <input type="text" onChange={
              (e) => this.setPlanetName(e.target.value)
            } />
            {(this.state.planetName.length > 0)?
           <Link to={`planet?name=${this.state.planetName}`}>
           <button className='SubmitButton'>Submit</button>
           </Link>:
            <button className='SubmitButton' disabled>Submit</button>
            }
           
        </div>

        <h2 className='featuredText'>Featured</h2>
        <div className='featuredPlanets'>
            {children}
        </div>
        <Footer />
</div>
  );
}
}

export default Browse;
