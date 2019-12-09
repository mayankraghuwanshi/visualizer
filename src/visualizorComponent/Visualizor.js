import React, {Component} from 'react';
import './Visualizer.css';


const SPEED = 1;
const BOX_SIZE=5;
const SIZE=100;
const COMPARE_COLOR = "red";
const SORTED_COLOR="green";
const SWAP_COLOR="yellow";
const PREVIOUS_COLOR="#0074D9"
const NEW_COLOR="#00d999";
const headerStyle = {
    backgroundImage: "linear-gradient(rgb(31, 175, 132),rgb(0, 217, 153))",
    height : "40px",
    margin : "auto"

}
class Visualizor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr : [],
            active : false
        }
    }
    componentDidMount() {
        this.resetArray();
    }
    
    resetArray(){
        const size=SIZE;
        const min=15;
        const max=500;
        const arr = [];
        for(let i=0;i<size;i++){
            arr.push(Math.floor(Math.random() * (max - min + 1) + min))
        }
        this.setState({arr});
    }

    bubbleSort(){
        const objArr = []
        let arr = this.state.arr.slice();
        for(let i=0;i<arr.length;i++){
            for(let j=i+1;j<arr.length;j++){
                objArr.push({case : 1,start : i,end : j})
                if(arr[i]<arr[j]){
                    objArr.push({case : 2 , start : i , end : j , barOneHeight : `${arr[j]}px`,barTwoHeight : `${arr[i]}px`})
                    const temp = arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                }else {
                    objArr.push({case: 3, start: i, end: j})
                }
                objArr.push({case: 5, start: i, end: j})
            }
            objArr.push({case : 4,start : i})
        }
        return objArr;
    }

    sortHelper(){
        // this.setState({active : true})
        console.log("before loop")
        const barArr = document.getElementsByClassName("array-bars");
        const arr=this.bubbleSort()
        // console.table(arr)
        for(let i=0;i<arr.length;i++){
            const obj = arr[i];
            switch (obj.case) {
                //just compare.
                case 1 : setTimeout(()=>{
                    const startIdx = obj.start
                    const endIdx = obj.end
                    const barOneStyle = barArr[startIdx].style;
                    const barTwoStyle = barArr[endIdx].style;
                    barOneStyle.backgroundColor=COMPARE_COLOR;
                    barTwoStyle.backgroundColor=COMPARE_COLOR;
                },i*SPEED)
                    break;
                //swap
                case 2 : setTimeout(()=>{
                    const startIdx = obj.start
                    const endIdx = obj.end
                    const barOneStyle = barArr[startIdx].style;
                    const barTwoStyle = barArr[endIdx].style;
                    barOneStyle.backgroundColor=SWAP_COLOR;
                    barTwoStyle.backgroundColor=SWAP_COLOR;
                    barOneStyle.height=obj.barOneHeight;
                    barTwoStyle.height=obj.barTwoHeight;
                },i*SPEED)
                    break;
                //if are alredy sorted.
                case 3 : setTimeout(()=>{
                    const startIdx = obj.start
                    const endIdx = obj.end
                    const barOneStyle = barArr[startIdx].style;
                    const barTwoStyle = barArr[endIdx].style;
                    barOneStyle.backgroundColor=SORTED_COLOR;
                    barTwoStyle.backgroundColor=SORTED_COLOR;
                },i*SPEED)
                    break;
                //color sorted bars.
                case 4 : setTimeout(()=>{
                    const startIdx = obj.start;
                    const barOneStyle = barArr[startIdx].style;
                    barOneStyle.backgroundColor=NEW_COLOR;
                },i*SPEED)
                    break;
                case 5: setTimeout(()=>{
                    const startIdx = obj.start
                    const endIdx = obj.end
                    const barOneStyle = barArr[startIdx].style;
                    const barTwoStyle = barArr[endIdx].style;
                    barOneStyle.backgroundColor=PREVIOUS_COLOR;
                    barTwoStyle.backgroundColor=PREVIOUS_COLOR;
                },i*SPEED)
                    break;
                default : console.log("Something weng wrong!");
            }
        }
        console.log("after loop")
    }


    render() {
        const arr = this.state.arr;
        const active = this.state.active
        return (
            <div>
                <div style={headerStyle}>
                    <div style={{width : "500px" , margin : "auto"}}>
                    <input className={"button"}
                           type="button"
                           value={"Reset"}
                           onClick={()=>this.resetArray()}
                    />
                    <input className={"button"}
                           type={"button"}
                           onClick={()=>this.sortHelper()}
                           value={"Bubble Sort"}
                    />
                    <input className={"button"}
                           type={"button"}
                           onClick={()=>this.sortHelper()}
                           value={"Selection Sort"}/>
                    <input className={"button"} type={"button"}
                           onClick={()=>this.sortHelper()}
                           value={"Insertion Sort"}/>
                    <input className={"button"} type={"button"}
                           onClick={()=>this.sortHelper()}
                           value={"Quick Sort"}/>
                    </div>
                </div>

                <div className="array-container"
                     style={{width : `${(BOX_SIZE+2)*SIZE}px`}}>
                    {arr.map((item , index)=>(
                         <div key={index}
                              className="array-bars"
                              style={{height : `${item}px` ,width : `${BOX_SIZE}px`}}>
                             </div>))}
                </div>

            </div>
        );
    }
}

export default Visualizor;