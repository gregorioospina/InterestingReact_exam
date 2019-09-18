import React from 'react';
import './App.css';
import Nav from './Nav.js';

class App extends React.Component {
  constructor(props){
    super(props)

    this.getData = this.getData.bind(this);
    this.renderNav = this.renderNav.bind(this);
    this.dataReady = this.dataReady.bind(this);
    this.changeUrlValue = this.changeUrlValue.bind(this);

    
    this.state = {
      datos: [],
      datos_2: [],
      datos_3: [],
      readyFreddy: false,
      pre_url: "",
      hay_vieja_1: false,
      hay_vieja_2: false,
      hay_vieja_3: false
    }
  }

  render(){
    return (
      <>
      <div id="maindiv">
        <div>
          <h1>DATAGOV-VISUALIZER</h1>
          <p> Gregorio Ospina - 201631760</p>
        </div>
        <input type="text" id="inputtext" onChange={this.changeUrlValue} placeholder="Ingrese la URL" />
        <button id="btnorange" className="btn btn-primary btn-sm" onClick={this.dataReady}> Search </button> 
      </div>
      <div id="grupoDeBotones"> 

      </div>
      <div className="row">
        <div className="col-4">
          {this.renderNav("1")}
        </div>
        <div className="col-4">
          {this.renderNav("2")}
        </div>
        <div className="col-4">
          {this.renderNav("3")}
        </div>
      </div>
      
      </>
    );
  }

  changeUrlValue(e){
    e.persist();
    this.setState({pre_url: e.target.value});
    console.log(this.state.pre_url);
  }

  dataReady(){
    let url = this.state.pre_url;
    this.getData(url);
  }

  componentDidUpdate()
  {
  }

  componentDidMount()
  {
    this.getData();
  }

  renderNav(val){
    let dats;
    if(val === "1"){
      console.log(this.state);
      dats = this.state.datos;
    }
    else if(val === "2"){
      dats = this.state.datos_2.length === 0 ? "none" : this.state.datos_2;
    }
    else if(val === "3"){
      dats = this.state.datos_3;
      dats = this.state.datos_3.length === 0 ? "none" : this.state.datos_3;
    }
    console.log(this.state.readyFreddy);
    if(this.state.readyFreddy === true && dats.length !== 0  && dats !== "none"){
      console.log(dats);
      return (
      <>
      <div>{this.historial(val)}</div>
      <Nav datos={dats} />
      </>
      );
    }
    else if(dats === "none"){
      return (<div className="historial">  </div>);
    }
    else{
      return (<div id="introduction"> 
          <h1>BIENVENIDO A DATOSGOV-VIS! </h1>
            <p>
            El componente creativo es la funcionalidad de
            el historial. Muestra las ultimas dos busquedas
            realizadas por el usuario. No vuelve a hacer las
            peticiones rest, estas se hacen una unica vez para no
            hacer muy cargada la funcionalidad
            </p>
          </div>);
    }
  }

  historial(val){
    return val === "1"? "Actual" : val === "2" ? "Historial 2" : "Historial 3"
  }


/** BONO */
getAllData(url){
  let offset = 0;
  let limit = 1116;
  let fin = false;
  console.log(url);
  while(fin === false){
    console.log("hola");
    fetch(`${url}?$limit=${limit}&$offset=${offset}`)
      .then(res => res.json())
        .then(_datos =>{
          console.log(offset);
          let copy = {...this.state.datos};
          copy.concat(_datos);
          this.setState({datos: copy});
          offset += limit;
          if(_datos.length < limit){
            fin = true;
          }

        })
        .catch(err =>{
          fin = true;
        });
  }

}

  getData(url){ 
    console.log("hola");
    fetch(url)
      .then(res => res.json())
      .then(_datos =>
        {
        console.log(_datos);
        if(this.state.datos_2.length === 0){
          let copy = this.state.datos;
          this.setState({datos_2: copy});
          this.setState({datos: _datos}, ()=>{
            this.setState({readyFreddy: true});
          });
        } else if(this.state.datos_2.length !== 0){
          let copy = this.state.datos;
          let copy2 = this.state.datos_2;
          this.setState({datos_3: copy2});
          this.setState({datos_2: copy});
          this.setState({datos: _datos}, ()=>{
            this.setState({readyFreddy: true});
          });
        }
        this.setState({datos: _datos}, ()=>{
          this.setState({readyFreddy: true});
        });
      })
  }
}

export default App;
