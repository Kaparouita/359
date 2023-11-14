class Player {
    constructor(name, position,color) {
        this.name = name;
        this.position = position;
        this.september = false;
        this.color = color;
    }

	updatePlayerInfo() {
		document.getElementById('playerName').textContent = this.name;
		document.getElementById('playerPosition').textContent = this.position;
		document.getElementById('playerSeptember').textContent = this.september;
	}

    changePositionGui(oldPosition,alone){
        if (alone){
            document.getElementById("position"+oldPosition).innerHTML="<img  src='images/"+oldPosition+".png'  height=70 width=80></div>";
            document.getElementById("position"+this.position).innerHTML="<img  src='images"+this.color+"/"+this.position+".png'  height=70 width=80></div>";
        }
        else{
            document.getElementById("position"+oldPosition).innerHTML="<img  src='images/"+oldPosition+".png'  height=70 width=80></div>";
            document.getElementById("position"+this.position).innerHTML="<img  src='imagesBoth/"+this.position+".png'  height=70 width=80></div>";
        }
    }

    changePositionGuiFirstTurn(){
        if (this.position !== 0){
            document.getElementById("position"+this.position).innerHTML="<img  src='images"+this.color+"/"+this.position+".png'  height=70 width=80></div>";
        }
    }

    changePosition(newPosition){
        this.position = newPosition;
    }
}

