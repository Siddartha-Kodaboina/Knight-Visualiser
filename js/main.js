function randInt(max) {
    let k= Math.floor(Math.random() * Math.floor(max))+1;
    k= (Math.floor(Math.random() * Math.floor(k*max)))%max+1;
    return k;
}
function Cell(x,y){
    this.x=x;
    this.y=y;
}
function main(){
    this.height=8;
    this.width=8;
    this.hasStartSelected=false;
    this.start_x=-1;
    this.start_y=-1;
    this.dx=[1,1,2,2,-1,-1,-2,-2];
    this.dy=[2,-2,1,-1,2,-2,1,-1];
    this.nodesToAnimate=[];
    this.maxNodes=0;
    this.delay=50;
    var firstSquare=document.getElementById('firstSquare');
    var currentSquare=document.getElementById('currentSquare');
    var moveNumber=document.getElementById('moveNumber');
    var totalIter=document.getElementById('totalIter');
    
    console.log("inside main");

    //to choose color (white ) or (black)
    this.chooseColor=(x,y)=>{
        
        let cur=document.getElementById(`${x}-${y}`);
        if((x+y)%2==1) cur.style.backgroundColor="white",console.log("in choose color"+" "+x+" "+y+" white");
        else cur.style.backgroundColor="black",console.log("in choose color"+" "+x+" "+y+" black");
    }

    //to select a starting point or node of the knight
    this.selectStarter=( x, y)=>{
        let presentCurrent=document.getElementById(`${this.start_x}-${this.start_y}`);
        let nextCurrent=document.getElementById(`${x}-${y}`);
        let elem=document.getElementById('fill');
        presentCurrent.removeChild(elem);
        this.start_x=x,this.start_y=y; 
        nextCurrent.append(elem);
        let rowValue=String.fromCharCode(parseInt(x)+'A'.charCodeAt(0));
        currentSquare.innerHTML=rowValue+(parseInt(y)+1);
        firstSquare.innerHTML=rowValue+(parseInt(y)+1);
        moveNumber.innerHTML='00';
        console.log("in selectStarter current strat detailes "+x+" "+y);
    }

    this.createBoard=()=>{
        let tableData="";
        console.log("inside create board");
        for(let i=0;i<this.height;i++){
            let row="";
            row+=`<tr>`;
            for(let j=0;j<this.width;j++){
                row+=`<td class="cell" id="${i}-${j}" onClick="Main.selectStarter(${i},${j})">`;
                if(i==0 && j==7) row+=`<div class="fill" id="fill" draggable="true"><i class="fas fa-chess-knight"></i></div>`,this.start_x=0,this.start_y=7;
                row+=`</td>`;
                console.log("current start deatiles : "+this.start_x+" "+this.start_y);
            }
            row+=`</tr>`;
            tableData+=row;
        }
        console.log("board lo pettesnam");
        document.querySelector(".board").innerHTML=tableData;
    }

    //Fill Listeners
    dragStart=()=>{
        let fill=document.getElementById('fill');
        fill.classList.add('hold');
        setTimeout(()=>(fill.className='invisible'),0);
    }

    dragEnd=()=>{
        let fill=document.getElementById('fill');
        fill.className='fill';
    }


    //EMpties (cells) Listeners
    dragOver=(e)=>{
        //let fill=document.getElementById('fill');
        e.preventDefault();
        console.log("Over "+e.target.id);
    }

    dragEnter=(e)=>{
        //let fill=document.getElementById('fill');
        e.preventDefault();
        let currentCellId=e.target.id;
        let currentCell=document.getElementById(`${currentCellId}`);
        currentCell.className='hovered';
        console.log("dragEnter");
    }

    dragLeave=(e)=>{
        //let fill=document.getElementById('fill');
        let currentCellId=e.target.id;
        let currentCell=document.getElementById(`${currentCellId}`);
        currentCell.className='cell';
        console.log("dragLeave");
    }

    dragDrop=(e)=>{
        //let fill=document.getElementById('fill');
        let currentCellId=e.target.id;
        let currentCell=document.getElementById(`${currentCellId}`);
        currentCell.className='cell';
        let a=currentCellId.split('-');
        this.selectStarter(a[0],a[1]);
        console.log("dragDrop Id: "+currentCellId+"  a[0],a[1] "+a[0]+" "+a[1]);
    }

    this.dragAndDropEvents=()=>{
        let fill=document.querySelector('.fill');
        let cells=document.querySelectorAll('.cell');

        console.log("drag drop ki ochindi");
        //Fill Listeners
        fill.addEventListener('dragstart',dragStart);
        fill.addEventListener('dragend',dragEnd);

        //Loop through Cells
        for(var cell of cells){
            cell.addEventListener('dragover',dragOver);
            cell.addEventListener('dragenter',dragEnter);
            cell.addEventListener('dragleave',dragLeave);
            cell.addEventListener('drop',dragDrop);
        }

    }

    //Adding colors to the chess board
    this.addColor=()=>{
        console.log("inside add colors");
        for(let i=0;i<this.height;i++){
            for(let j=0;j<this.width;j++){
                this.chooseColor(i,j);
            }
        }
        //console.log("color inchesnam");
    }
    this.limits=(x,y)=>{
        return (x>=0 && x<this.height && y>=0 && y<this.width);
    }
    //checks whether a cell (x,y) is safe in grid
    this.isEmpty=(vis,x,y)=>{
        return (this.limits(x,y) && vis[y*this.width+x]==-1);
    }

    //get the degree
    this.getDegree=(vis,x,y)=>{
        let count=0;
        for(let i=0;i<8;i++){
            if(this.isEmpty(vis,x+this.dx[i],y+this.dy[i])){
                count++;
            }
        }
        return count;
    }


    this.nextMove=(vis,cell)=>{

        let nx,ny,min_deg_idx=-1,c,min_deg=(this.height)+1;
        let start=randInt(1000);
        let res=new Cell(parseInt(-1),parseInt(-1));
        for(let i=0;i<8;i++){
            let cur=parseInt(start+i)%8;
            nx=parseInt(cell.x)+parseInt(this.dx[cur]);
            ny=parseInt(cell.y)+parseInt(this.dy[cur]);
            //console.log(" current cell : "+nx+" "+ny);
            if(this.isEmpty(vis,nx,ny)){
                c=this.getDegree(vis,nx,ny);
                //console.log("inside forloop at: "+cell.x+" "+cell.y+" index : "+cur+" current cell : "+nx+" "+ny+" degree : "+c);
                
                if(parseInt(c)<parseInt(min_deg)){
                    min_deg_idx=cur;
                    min_deg=c;
                    res.x=nx;
                    res.y=ny;
                }
            }
        }
        //console.log("******************minimum index : "+min_deg_idx+" place : "+res.x+" "+res.y);
        if(min_deg_idx==-1) {
            //document.getElementById(`${nx}-${ny}`).style.animation=`visitedPathAnimation 2s ease-in-out ${this.delay}ms forwards`;
            return res;
        }

        nx=parseInt(cell.x)+parseInt(this.dx[min_deg_idx]);
        ny=parseInt(cell.y)+parseInt(this.dy[min_deg_idx]);

        vis[ny*this.width+nx]=vis[parseInt(cell.y) * this.width + parseInt(cell.x)] + 1;
        cell.x=nx;
        cell.y=ny;

        return cell;

    }


    this.neighbour=(x,y,xx,yy)=>{
        for(let i=0;i<8;i++){
            if(x+this.dx[i]==xx && y+this.dy[i]==yy) return true;
        }
        return false;
    }

    this.findClosedTour=()=>{
        
        let vis=new Array(this.height*this.width);
        for(let i=0;i<this.height*this.width;i++) {
            vis[i]=-1;
        }

        let cell=new Cell(this.start_x,this.start_y);

        vis[parseInt(cell.y)*this.width+parseInt(cell.x)]=1;

        let ret=new Cell(parseInt(-1),parseInt(-1));

        for(let i=0;i<this.height*this.width-1;i++){
            ret=this.nextMove(vis, cell);
            //console.log(ret.x+" "+ret.y);
            if(ret.x==-1 || ret.y==-1) return false;
            this.maxNodes++;
        }

        if(ret.x!=-1 && ret.y!=-1 && !this.neighbour(ret.x,ret.y,this.start_x,this.start_y)){
            return false;
        }
        console.log("ikkadi varaku ochindi: ");
        let mat="";
        let ans=new Array(this.height*this.width);
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                mat+=vis[j*this.width+i].toString()+" ";
                ans[j*this.width+i]=[vis[j*this.width+i],`${i}-${j}`];
            }
            console.log(mat);
            mat="";
        }
        /*for(let i=0;i<8;i++)
            for(let j=0;j<8;j++)
                console.log(ans[j*this.width+i]);*/
        ans.sort((a,b)=>{
            return parseInt(a[0])-parseInt(b[0]);
        });
        for(let i=0;i<64;i++){
            console.log(ans[i]);
            
            setTimeout(()=>{
                var cur=document.getElementById(`${ans[i][1]}`);
                var f,s;
                var d=ans[i][1].split('-');
                f=parseInt(d[0]),s=parseInt(d[1]);
                    
                this.delay+=800;
                
                if((f+s)%2==0){
                    // cur.style.animation=`blackAnimation 2s ease-in-out ${this.delay}ms`; //correct
                    cur.style.animation=`blackAnimation 1s ease-in-out ${this.delay}ms`;
                }else{
                    // cur.style.animation=`whiteAnimation 2s ease-in-out ${this.delay}ms`; //correct
                    cur.style.animation=`whiteAnimation 1s ease-in-out ${this.delay}ms`;
                }
                // this.delay+=800;//correct
                setTimeout(()=>{
                    /*let curHtml=`<div class="fill" id="fill" draggable="true"><i class="fas fa-chess-knight"></i></div>`
                    //cur.innerHTML=curHtml;*/
                    //console.log("vosthundi");
                    //document.getElementById(`${ans[i][1]}`).style.backgroundColor="red";
                    let fill=document.getElementById('fill');
                    cur.appendChild(fill);
                    let rowValue=String.fromCharCode(f+'A'.charCodeAt(0));
                    currentSquare.innerHTML=rowValue+(s+1);
                    
                    if(i<9) moveNumber.innerHTML='0'+(i+1);
                    else moveNumber.innerHTML=(i+1);
                    console.log('magical mmessi output: ',rowValue);

                },this.delay);
                if(i!=0){
                    setTimeout(()=>{
                        let prev=document.getElementById(`${ans[i-1][1]}`);
                        let prevStringValues=ans[i-1][1].split('-');
                        //prev.innerHTML=`<div class="circle" style="background-color:white"></div>`;
                        if((parseInt(prevStringValues[0])+parseInt(prevStringValues[1]))%2==0) 
                            prev.innerHTML=`<div class="circle" style="background-color:white"></div>`;
                        else 
                            prev.innerHTML=`<div class="circle" style="background-color:black"></div>`;
                    },this.delay+50);
                }
            },this.delay+100);
           
        }
        totalIter.innerHTML=this.maxNodes+1;
        return true;
    }

    //find the closed tours of knight
    //https://www.geeksforgeeks.org/warnsdorffs-algorithm-knights-tour-problem/
    this.knightPathStarter=()=>{
        console.log("**************8current start deatiles : "+this.start_x+" "+this.start_y);
        let ctr=10;
        while(/*ctr-- &&*/ !this.findClosedTour());
        console.log("ayipoyinhi");
    }
    this.createBoard();
    this.addColor();
    this.dragAndDropEvents();
}

let Main=new main();
var btn=document.getElementById('btn');
btn.addEventListener('click',(e)=>{
    let x=e.clientX;
    x-=1185.2;
    let y=e.clientY;
    y-=504.4;

    let btnClick=document.createElement('span');
    btnClick.className+='btnClick';
    btnClick.style.left=x+'px';
    btnClick.style.top=y+'px';
    btn.appendChild(btnClick);
    console.log('niku thelsu');
    setTimeout(()=>{
        btnClick.parentNode.removeChild(btnClick);
    },1000);
    Main.knightPathStarter();
});