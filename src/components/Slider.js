import React,{Component} from 'react';
import './Slider.css'
import SliderItems from './SliderItems';
import SliderArrows from './SliderArrows';
export default class Slider extends Component{
    constructor(props){
        super(props);
        this.state = {index:0};
    }
    turn = (n)=>{ // 切换
        let index = this.state.index + n;
        if(index>=this.props.images.length)
            index = 0;
        if(index < 0){
            index = this.props.images.length-1;
        }
        this.setState({index});
    }
    go = ()=>{
        this.$timer = setInterval(()=>{
            this.turn(1);
        },this.props.delay*1000)
    }
    componentDidMount(){
        if(this.props.autoplay)
            this.go();
    }
    render(){
        let sliderOptions ={};
        if(this.props.pause){
            sliderOptions.onMouseOver =()=>clearInterval(this.$timer);
            sliderOptions.onMouseOut = this.go;
        }
        let SliderItemsOptions={
            images:this.props.images,
            index:this.state.index,
            speed:this.props.speed
        }
        return (
            <div className="slider-wrapper" {...sliderOptions}>
                <SliderItems {...SliderItemsOptions}/>
                <SliderArrows turn={this.turn}/>
            </div>
        )
    }
}