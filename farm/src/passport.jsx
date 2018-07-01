import React from 'react';
import Highcharts from 'highcharts';
import exit from './img/X.png';
import minus from './img/minus.png';
import refresh from './img/refresh.png';
import ReactDOM from 'react-dom';
class Passport extends React.Component{
    constructor(props){
        super(props);
     
        this.state={
            name:props.cow.name,
            id:props.cow.id,
            breed:props.cow.breed,
            color:props.cow.color,
            DOB:props.cow.DOB,
            data: props.cow,
            targetCow: props.targetCow
        }
        this.choiceGraph=this.choiceGraph.bind(this);
        this.append=this.append.bind(this);
        this.add=this.add.bind(this);
        this.deleteCow=this.deleteCow.bind(this);
        this.refreshWeek=this.refreshWeek.bind(this);
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
            <span className="icons" ><img src={minus} onClick={this.deleteCow} className="minusCow" /> 
            <img src={refresh} onClick={this.refreshWeek} /> 
            <button className='add' onClick={this.add} >+</button></span>
            
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
       <div><span>Надой:</span>  <span><input type="text" id="squeezed"  />  л.</span></div>
       <div><span>Жирность:</span><span><input type="text" id="fat" /> %</span></div>
       <div><span>Вес:</span><span><input type="text" id="weight" /> кг</span></div>
       <button onClick={this.append} >Добавить</button>
        </div>
</div>)
    }
    deleteCow(e){
        cullingSurvey('Вы точно хотите удалить корову?',(function(){
            document.getElementsByClassName('backgroundPassport')[0].remove();

       ReactDOM.render(<div></div> , document.getElementById('footer'))  
this.state.targetCow.remove();
        }).bind(this))
    }
    add(e){
    document.getElementsByClassName('form')[0].style.display='block';
document.getElementById('squeezed').autofocus=true;
    }

    append(e){
        
        let day=document.getElementsByTagName('select')[0].selectedIndex;
        let squeezed=this.state.data.graph['Надой'];
        let squeez=+document.getElementById("squeezed").value;
        let fat=+document.getElementById("fat").value;
        let weight=+document.getElementById("weight").value;
        for(let i=day;i<7;i++){
if(squeezed[i])
{cullingSurvey('Вы точно хотите обновить неделю?',(function(day, squeez, fat, weight)
{this.state.data.graph["Надой"]=['','','','','','','']; this.state.data.graph["Жирость"]=['','','','','','',''];
 this.state.data.graph["Вес"]=['','','','','','','']; 
this.state.data.graph['Надой'][day]=squeez;
 this.state.data.graph['Жирость'][day]=fat;
 this.state.data.graph['Вес'][day]=weight;
 staticGrap(this);   }).bind(this,day,squeez,fat,weight)); break;  }
}
        
        this.state.data.graph['Надой'][day]=squeez;
        this.state.data.graph['Жирость'][day]=fat;
        this.state.data.graph['Вес'][day]=weight;
        staticGrap(this);
        document.getElementById("squeezed").value='';
        document.getElementById("fat").value='';
        document.getElementById("weight").value='';
       let select=document.getElementsByTagName('select')[0];
        select.childNodes[select.selectedIndex+1 < 7 ? select.selectedIndex+1 : 0].selected=true;
        document.getElementById('squeezed').focus();
        var xhr = new XMLHttpRequest();

        var json = JSON.stringify(this.state.data);
        
        xhr.open("POST", 'http://localhost:3001', true)
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        
        xhr.send(json);
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
    refreshWeek(){
        cullingSurvey('Вы точно хотите обновить неделю?',(function()
        {this.state.data.graph["Надой"]=['','','','','','','']; this.state.data.graph["Жирость"]=['','','','','','',''];
         this.state.data.graph["Вес"]=['','','','','','','']; staticGrap(this)  }).bind(this))      
           
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
 let tr=document.getElementsByTagName('tr');   
      if(!id || tr.length<id){return}

tr.filter=[].filter;
let parent = tr.filter(function(parent){
    return parent.getAttribute('data-id')==id
});
if(parent.length){
      return parent[0].children[0].innerText
}
return ''
  }
  function cullingSurvey(text, func){
      let background=document.createElement('div');
      background.className="backgroundInterview";
      document.body.appendChild(background);
      background.onclick=function(){
          return false;
      }
    let wind=document.createElement('div');
      wind.className="interview";
      let spantext=document.createElement('span');
      spantext.innerText=text;
      wind.appendChild(spantext);
      let yes=document.createElement('button');
      yes.innerText='Да';
      let no=document.createElement('button');
      no.innerText='Нет';
      wind.appendChild(yes);
      wind.appendChild(no)
      document.body.appendChild(wind);
yes.onclick=function(){
    func();
    background.remove();
    wind.remove();
}
no.onclick=function(){
    background.remove();
    wind.remove();
}
}
export default Passport;