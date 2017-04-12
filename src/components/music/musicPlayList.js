import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class partners extends Component { 
  render() {
      let {specialname,intro,imgurl,playcount} = this.props.data.info
      let imgU = imgurl.replace('{size}',400)
      return (
        <div style={Styles.container}>
              <div style={Object.assign(Styles.mask,{backgroundImage:`url(${imgU})`} ) }></div>
              <div style={Styles.intro}>
                  <div>
                    <img src={imgU} style={Styles.introImg} />
                  </div>
                  <div style={Styles.introName}>{specialname}</div>
              </div>

            {
              this.props.data.list.map((obj,index)=>
                  <Item index={index+1}  {...obj} />
              )
            }
        </div>
      )
  }
}

class Item extends Component { 
  render() {
      const {filename,imgurl,intro,playcount,hash,index} = this.props;
      return (
        <Link style={Styles.ItemContainer} to={`play/${hash}`}>
          <div style={Styles.index}>{index}</div>
          <div style={Styles.name}>{filename}</div>
        </Link>
      )
  }
}

const Styles = {
  container:{
    display: 'flex',
    flex:1,
    flexDirection: 'column',
  },
  intro:{
    display:'flex',
    padding:'1rem',
    marginTop:'-13rem',
    zIndex: 2
  },
  introImg:{
    width:'12rem',
  },
  count:{
    position:'absolute',
    width:'11rem',
    marginTop:'.5rem',
    textAlign: 'right',
    color:'#fff',
    fontSize:'.8rem'
  },
  introName:{
    padding:'1rem'
  },
  mask:{
    height:'13.5rem',
    width:'100%',
    filter: 'blur(60px)',
  },
  ItemContainer:{
    display: 'flex',
    flex:1,
    padding:'1rem',
    color:'#333'
  },
  index:{
    padding:'0 .6rem'
  },
  name:{
    display:'flex',
    flex:1,
  },
  name:{
    borderBottom:'.1rem solid #333'
  }
}