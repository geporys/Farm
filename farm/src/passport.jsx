import React from 'react';
import Highcharts from 'highcharts';
import exit from './img/X.png';

class Passport extends React.Component{
    constructor(props){
        super(props);
     
        this.state={
            name:props.cow.name,
            id:props.cow.id,
            breed:props.cow.breed,
            color:props.cow.color,
            DOB:props.cow.DOB,
            data: props.cow
        }
        this.choiceGraph=this.choiceGraph.bind(this);
        this.append=this.append.bind(this);
    }
    render(){
        return(
<div className="passport-container">
       <div className="passport">
       <img className='endCow' src={exit} />
       <div id="idCow">IDкоровы: <span>{this.state.id}</span></div>
       <div >Имя:<span> {this.state.name}</span></div>
       <div >Порода:<span> {this.state.breed}</span></div>     
       <div >Масть:<span> {this.state.color}</span></div> 
       <div >Отец: <span>{searcParents(this.state.data.fatherId)}{' id'+this.state.data.fatherId}</span> Мать: <span>{searcParents(this.state.data.motherId)}{' id'+this.state.data.motherId}</span></div> 
       <div >Дата рождения:<span>  {formatDate(this.state.DOB)} </span></div> 
      <div className='dataCow'>
          <div id="graph"></div>
             <span className="datB" onClick={this.choiceGraph}>
                 <button>Надой</button>
                 <button>Жирость</button>
                 <button>Вес</button>
                 
             </span>
            <span className="add" onClick={this.add}>  <button>+</button></span>
        </div>
       </div>
       <div className='form'>
       <img className='endCow' src={exit} />
       <div><span>День:</span> <select>
                        <option>Пн</option>
                        <option>Вт</option>
                        <option>Ср</option>
                        <option>Чт</option>
                        <option>Пт</option>
                        <option>Сб</option>
                        <option>Вс</option>
                      </select></div>
       <div><span>Надой:</span>  <span><input type="text" id="squeezed" />  л.</span></div>
       <div><span>Жирность:</span><span><input type="text" id="fat" /> %</span></div>
       <div><span>Вес:</span><span><input type="text" id="weight" /> кг</span></div>
       <button onClick={this.append} >Добавить</button>
        </div>
</div>)
    }
    add(e){
    document.getElementsByClassName('form')[0].style.display='block';
    }

    append(e){
        let day=document.getElementsByTagName('select')[0].selectedIndex;
        let squeezed=this.state.data.graph['Надой'];
        for(let i=day;i<7;i++){
if(squeezed[i])
{if(window.confirm("Вы хотите обновить неделю?")){this.state.data.graph["Надой"]=['','','','','','','']; this.state.data.graph["Жирость"]=['','','','','','','']; this.state.data.graph["Вес"]=['','','','','','','']; break;}       
else{break;}}
}
        
        this.state.data.graph['Надой'][day]=+document.getElementById("squeezed").value;
        this.state.data.graph['Жирость'][day]=+document.getElementById("fat").value;
        this.state.data.graph['Вес'][day]=+document.getElementById("weight").value;
        staticGrap(this);
        document.getElementById("squeezed").value='';
        document.getElementById("fat").value='';
        document.getElementById("weight").value='';
    }
    choiceGraph(e){
let target=e.target;
if(target.tagName!="BUTTON"){
    return
}
Highcharts.chart('graph', {

    title: {
        text: target.innerText
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    xAxis: {
        categories: ['Пн','Вт','Ср',"Чт","Пт","Сб","Вс"]
    },

    series: [{
        name: this.state.name,
        data: this.state.data.graph[target.innerText]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
    }
    componentDidMount(){
        staticGrap(this);

    }
   
    }
    function nullWeek(week){
for(let i=0;i<week.length;i++)
{week[i]='';}
return week;
    }
function staticGrap(e){
    Highcharts.chart('graph', {

        title: {
            text: 'Вес'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        xAxis: {
            categories: ['Пн','Вт','Ср',"Чт","Пт","Сб","Вс"]
        },
    
        series: [{
            name: e.state.name,
            data: e.state.data.graph['Вес']
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}
function formatDate(date) {
    
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;
  
    return dd + '.' + mm + '.' + yy;
  }
  function searcParents(id){
      if(!id){return}
var tr=document.getElementsByTagName('tr');
tr.filter=[].filter;
return tr.filter(function(parent){
    return parent.getAttribute('data-id')==id
})[0].children[0].innerText;
  }
export default Passport;