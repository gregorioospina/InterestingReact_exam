import React from 'react';
import './App.css';
import Nav from './Nav.js';

class App extends React.Component {
  constructor(props){
    super(props)

    this.getData = this.getData.bind(this);

    this.state = {
      datos: []
    }
  }

  render(){
    return (
      <>
      <div> Parcial 1 GREGORIO OSPINA.</div>
      <div>
        <input type="text"/>
        <button className="btn"> </button> 
      </div>
      <div id="grupoDeBotones"> 

      </div>
      <Nav datos={this.state.datos} />
      </>
    );
  }

  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(){
    this.getData();
  }

/*
  printNames(){
    console.log(this.props);
    return this.props.datos.map(dato => {
      if(dato.ano === "2010"){
        return(<p> {this.props.name} </p>);
      }
    })
  }
*/

  getData(){ 
    fetch("https://www.datos.gov.co/resource/ji8i-4anb.json")
    .then(res => res.json())
      .then(_datos => {
        console.log(_datos);
        this.setState(({datos: _datos}, function(){
          console.log("exito");
        }));
      })
  }
}

export default App;
