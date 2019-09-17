import React from 'react';
import navio from 'navio';


class Nav extends React.Component{
  constructor(props){
    super(props);

    this.props = props;
    this.nav = this.nav.bind(this);
  }

  componentDidUpdate(){
  }

  componentDidMount(){
    this.nav();
  }

  
  nav(){
    const nv = new navio(this.divNavio, 600);

      console.log(this.props);
      nv.data(this.props.datos);

      nv.updateCallback(select => {
        console.log("cosas estan pasando");
      });
  }

  render(){
    return(  
      <>    
    <div>Hola</div>
    <div 
      ref={divNavio => this.divNavio = divNavio}> 
    
    </div>
    </>
    );
  }
}

export default Nav;