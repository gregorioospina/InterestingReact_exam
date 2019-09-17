import React from 'react';
import navio from 'navio';
import './Nav.css';


class Nav extends React.Component{
  constructor(props){
    super(props);

    this.props = props;
    this.nav = this.nav.bind(this);
  }

  componentDidUpdate(){
    this.nav();
  }

  componentDidMount(){
    this.nav();
  }

  
  nav(){
    const nv = new navio(this.divNavio, 600);

    nv.data(this.props.datos);
    nv.addAllAttribs();

    nv.updateCallback(select => {
      console.log("cosas estan pasando");
    });

  }

  render(){
    return(  
    <div id="navioDIV">    
      <div 
        ref={divNavio => this.divNavio = divNavio}> 
      
      </div>
    </div>
    );
  }
}

export default Nav;