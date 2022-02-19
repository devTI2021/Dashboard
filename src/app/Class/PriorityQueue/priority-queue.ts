import { ThisReceiver } from "@angular/compiler";


export interface Node{
    name: String,
    prio: number,
    state: String,
    nit: number,
    position: number,
    date: String
}

export class PriorityQueue {
    empty: Boolean = true;
    data: Node[] = [];
    idHead: Number = 0;
    constructor( ){
        
    }

    setData( data: Node[]){
        this.data= data;
        this.empty= this.data.length>0 ? false : true;
        if( this.idHead==0 || (this.data[0].nit== this.idHead && this.data[0].state=='D')){ this.idHead= this.data[0].nit;}
        else{
            console.log(this.idHead); 
            while(this.data[0].nit!= this.idHead){
                console.log(this.data[0]);
                var element= this.data.length>0 ? this.data.shift() : null;
                if( element != null){ this.data.push(element);}
            }
            console.log(this.data[0]);
            console.log(this.data[0].state);
            console.log(this.data[0].state!="D");
            while( this.data[0].state!='D'){ 
                var element= this.data.length>0 ? this.data.shift() : null;
                if( element != null){ this.data.push(element);}
            }
        }

    }
    
    getData(){
        return this.data;
    }

    isEmpty(){
        return this.empty;
    }
    
    dequeue(){
        do{
            var element= this.data.length>0 ? this.data.shift() : null;
            if( element != null){ this.data.push(element);}
            this.idHead= this.data[0].nit;
        }while(this.data[0].state!='D')
        
    }
    
}
