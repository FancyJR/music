import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { changetimeAPI,controllAPI} from '../actions/music';

class App extends Component {

  constructor(props) {
    super(props);
     const { dispatch,music } = this.props
     const {currentTime ,duration} = this.props.time
    this.state = {
      slider: duration === 0 ? 0 : currentTime / duration *100
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(111)
  //   return true;
  // }

  componentWillReceiveProps(){
    const {currentTime ,duration} = this.props.time
    this.setState({
      slider: duration === 0 ? 0 : currentTime / duration *100
    })
  }

  musicControll(status){
    const { dispatch } = this.props
    console.log(status)
    dispatch(controllAPI(status))
    
  }


 formatSeconds(value) { 
    var theTime = parseInt(value);// 秒 
    var theTime1 = 0;// 分 
    var theTime2 = 0;// 小时 
    // alert(theTime); 
    if(theTime >= 60) { 
    theTime1 = parseInt(theTime/60); 
    theTime = parseInt(theTime%60); 
    // alert(theTime1+"-"+theTime); 
    if(theTime1 > 60) { 
    theTime2 = parseInt(theTime1/60); 
    theTime1 = parseInt(theTime1%60); 
    } 
    } 
    var result = parseInt(theTime); 
    result = (result >= 10  ) ? ""+parseInt(theTime) : "0"+parseInt(theTime); 
    if(theTime1 > 0) { 
      var m = parseInt(theTime1)
      m = m >= 10  ? ""+m : "0"+m; 
      result = ""+m+":"+result; 
    }else{
       result = '00:'+result 
    } 

    if(theTime2 > 0) { 
    result = ""+parseInt(theTime2)+":"+result; 
    } 

    return result; 
  } 

  changeSlider(value){
    this.setState({
      slider:value
    })
    const {currentTime ,duration} = this.props.time
    this.props.dispatch(changetimeAPI({
      currentTime: value/100 * duration ,
      duration,
      changeTimeFlag: true
    }))
    
  }

  render() {
    const { dispatch,data,login,krc,time,music } = this.props
    const {currentTime ,duration} = this.props.time
    let imgU = music.currentMusic.imgUrl.replace('{size}',400)

    let krc2 =  music.currentMusic.krc.filter((item)=>
      currentTime > item.time
    )
    let s = krc2.pop()
    s = s? s : {time: 0 ,
          str: '',
          index:0}

    return (
      <div className='root' >
        
          <div  style={{zIndex:1,position:'absolute',left:0,top:0,right:0,bottom:0,opacity: '0.6'}}>
            <div  style={{display: 'flex',maxWidth: '640px',widtt:'100%',height:'100%', margin: '0 auto',backgroundImage:`url(${imgU})`,backgroundSize: 'cover',filter: 'blur(3rem)',backgroundPosition: '50%'}}>
            </div>
          </div>

          <div style={{height:'100%',zIndex:10,display: 'flex',flexDirection: 'column'}}>

            <div className="header" style={{backgroundColor:'transparent',color:'#333',display:'flex',justifyContent: 'space-between',padding:'0 1rem',borderBottom:'.01rem solid #eee'}}>
              <div onClick={()=>browserHistory.goBack()} style={{display:'flex',flex:1}}>返回</div>
              <div style={{display:'flex',flex:3,justifyContent: 'center'}}>{ music.currentMusic.songName }</div>
              <div style={{display:'flex',flex:1}}></div>
            </div>

            
              <div className="container" style={{overflowY: 'auto',textAlign:'center',color:'#333',padding:'3rem 0',fontSize:'1.2rem'}}>
                {
                  music.currentMusic.krc.map((item)=> 
                    <div style={ Object.assign( {transform: 'translateY('+  (15-s.index*3.3)  +'rem)',transition: 'transform .5s ease',padding:'1rem 0'}, s.time === item.time ? {color:'rgb(206, 61, 62)'} : {} )} >
                      {item.str}
                    </div>
                  )
                }
              </div>
            

            <div>
              <div style={{display:'flex'}}>
                <div style={{padding:'0 1rem',color:'#333'}}> {this.formatSeconds(currentTime)} </div>
                <div style={{display:'flex',flex:1}}>
                  <Slider onChange={(value)=>this.changeSlider(value)}  step={0.1} value={ this.state.slider}/>
                </div>
                <div style={{padding:'0 .5rem',color:'#333'}}> {this.formatSeconds(duration)} </div> 
              </div>

              <div onClick={()=>this.musicControll('play')}>播放</div>  
              <div onClick={()=>this.musicControll('pause')}>暂停</div>  
            </div>

        </div>
       

      </div>
    )
  }
}

function map(state) {
  return {
    music: state.music.musicBox,
    time:state.music.time
  }
}

const Styles = {
  content:{
    marginTop:50,
    marginBottom:50,
  }
}

export default connect(map)(App)
