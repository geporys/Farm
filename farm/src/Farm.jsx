import React from 'react';
import Passport from './passport.jsx';
import ReactDOM from 'react-dom';
import exit from './img/X.png';
import './css/farm.css';
import cows from './Cows.jsx';
let idCounter=Counter()

class Farm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            infocow:{},
            cowsFarm: createCow(cows, this)
        }
        this.appendCow=this.appendCow.bind(this);
        this.viewPassport=this.viewPassport.bind(this);
    }
    render(){
        return(
            <div>
<table>
<tbody onClick={this.viewPassport}>
<tr>
    <th>Имя</th>
    <th>Порода</th>
    <th>Масть</th>
    <th>Возраст</th>
   </tr>
{this.state.cowsFarm}

</tbody>

</table>
<div id="footerTable">  <span  onClick={this.appendCow}>  <button className='add'>+</button></span></div>
  </div>
  
        )
    }
    appendCow(e){
        var context=document.createElement("div");
        context.className="backgroundPassport";
        document.body.appendChild(context);
        document.onclick=function(e){
        if(e.target.className!="passport-container" && e.target.className!="endCow" ){return}
            ReactDOM.render(<div></div> , document.getElementById('footer'))  
            e.target.remove();
            context.remove();
        };
        ReactDOM.render(<AddCow table={this}/>, document.getElementById('footer'))
    }
    viewPassport(e){
        var target=e.target;
        if(target.tagName!="TD"){
            return;
        }
        target=target.parentNode;
var context=document.createElement("div");
context.className="backgroundPassport";
document.body.appendChild(context);
document.onclick=function(e){
if(e.target.className!="passport-container" && e.target.className!="endCow"){return}
if(e.target.parentNode.className=='form'){e.target.parentNode.style.display='none'; return;}
    ReactDOM.render(<div></div> , document.getElementById('footer'))  
    e.target.remove();
    context.remove();
};
ReactDOM.render(<Passport cow={this.state.infocow[target.getAttribute('data-id')]} targetCow={target} />, document.getElementById('footer'))
    }
}
function createCow(mass, cont){
    let newMass=[];
     for(let i=0;i<mass.length; i++){
newMass.push(<Cow key={mass[i].id.toString()} data={mass[i]} context={cont} />)}
     return newMass;
}

function Cow(props){

props.context.state.infocow[props.data.id]=props.data;
   return(<tr data-id={props.data.id}>
       <td>{props.data.name}</td>
       <td>{props.data.breed}</td>
       <td>{props.data.color}</td>
       <td>{year(new Date().getFullYear()-  props.data.DOB.getFullYear())}</td>
   </tr>)
}
class AddCow extends React.Component{
    constructor(props){
        super(props);
        this.state={
            table:props.table
        }
        this.makeCow=this.makeCow.bind(this);    }
    render(){return(<div className="passport-container">
    <div className="windowCow">
         <img className='endCow' src={exit} style={{float:'right', margin:"-20px"}} />
    <div><span>Имя:</span><input type='text' id='name' /></div>
    <div><span>Порода:</span><input type='text' id='breed'/></div>
    <div><span>Масть:</span><input type='text' id='color' /></div>
    <div>
                <label >Дата рождения: </label>
                <input type="date" id="DOB" name="date"/></div>
    <div><span>Id Отца:</span><input type='text' id='father' /><span>Id Матери:</span><input type='text' id='mother' /></div>
    <button onClick={this.makeCow}>Добавить</button>
</div>
    </div>)}
    makeCow(e){
      let  name=document.getElementById('name').value;
   let     breed=document.getElementById('breed').value;
     let   color=document.getElementById('color').value;
     let id=idCounter();
    let DOB=document.getElementById('DOB').valueAsDate;
       let fatherId=document.getElementById('father').value;
       let motherId=document.getElementById('mother').value;
let objectCow={
    name,
    breed,
    color,
    id,
    DOB: DOB ? DOB : new Date(),
    fatherId,
     motherId,
    graph:{"Надой":['','','','','','',''],"Жирость":['','','','','','',''],"Вес":['','','','','','','']}
}
cows.push(objectCow);
this.state.table.setState(
    {
        cowsFarm: createCow(cows, this.state.table)
    }
)
ReactDOM.render(<div></div> , document.getElementById('footer'))  
document.getElementsByClassName("backgroundPassport")[0].remove();

    }
}
function year(y){
    y=y.toString();
    let ey=y[y.length-1];
if(ey==1){
    return y + ' год'
}
if(ey>1 && ey<5 && y<10 || ey>1 && ey<5 && y>14){
    return y + ' года'
}
if(ey==0 || ey>4 || y>10 && y<14){
    return y + ' лет'
}
}
function Counter() {
    var currentCount = 10;
  
    return function() { 
      return currentCount++;
    };
  }
export default Farm;