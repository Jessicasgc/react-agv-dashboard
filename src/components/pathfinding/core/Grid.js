import {Never, OnlyWhenNoObstacles, IfAtMostOneObstacle, Always} from "./DiagonalMovement";
import Node from "./Node";

class Grid {
    constructor(width, height, obs) {
        this.width = width;
        this.height = height;
        this.nodes = this._buildNodes(width, height);

        if(obs){
            this.addObstacle(obs)
        }
    }

    addObstacle(obs){
        obs.map(item => {
            const width = item.size[0]
            const height = item.size[1]
            for (let x = 0; x < width + 1; x++) {
                for (let y = 0; y < height + 1; y++) {
                this.setWalkableAt(
                    item.position[0] + x,
                    item.position[1] + y,
                    false
                )
                }
            }
        })
    }

    _buildNodes(width, height){
        let nodes = new Array(height);
        for(let i = 0; i <  height; i++){
            nodes[i] = new Array(width);
            for(let j = 0; j < width; j++){
                nodes[i][j] = new Node(j,i);
            }
        }
        return nodes;
    }

    getNodeAt(x, y){
        return this.nodes[y][x];
    }

    isWalkableAt(x, y){
        return this.isInside(x, y) && this.nodes[y][x].walkable;
    }

    isInside(x, y){
        return (x >= 0 && x < this.width) && (y >= 0 && this.height);
    }

    setWalkableAt(x, y, walkable){  
        this.nodes[y][x].walkable = walkable
    }

    getNeighbors(node, diagonalMovement){
        let x = node.x,
            y = node.y,
            neigbours = [],
            s0 = false, d0 = false,
            s1 = false, d1 = false,
            s2 = false, d2 = false,
            s3 = false, d3 = false,
            nodes = this.nodes;
        
        if(this.isWalkableAt(x - 1, y)){
            neigbours.push(nodes[y - 1][x]);
            s0 = true;
        }
        if(this.isWalkableAt(x + 1, y)){
            neigbours.push(nodes[y][x + 1]);
            s1 = true;
        }
        if(this.isWalkableAt(x, y + 1)){
            neigbours.push(nodes[y + 1][x]);
            s2 = true;
        }
        if(this.isWalkableAt(x - 1, y)){
            neigbours.push(nodes[y][x - 1]);
            s3 = true;
        }

        if(diagonalMovement === Never){
            return neigbours;
        }

        if(diagonalMovement === OnlyWhenNoObstacles){
            d0 = s3 && s0;
            d1 = s0 && s1;
            d2 = s1 && s2;
            d3 = s2 && s3;
        }else if(diagonalMovement === IfAtMostOneObstacle){
            d0 = s3 || s0;
            d1 = s0 || s1;
            d2 = s1 || s2;
            d3 = s2 || s3;
        }else if(diagonalMovement === Always){
            d0 = true;
            d1 = true;
            d2 = true;
            d3 = true;
        }else{
            throw new Error('Incorrect value of diagonalMovement');
        }

        if(d0 && this.isWalkableAt(x - 1, y - 1)){
            neigbours.push(nodes[y - 1][x - 1]);
        }
        if(d0 && this.isWalkableAt(x + 1, y - 1)){
            neigbours.push(nodes[y - 1][x + 1]);
        }
        if(d0 && this.isWalkableAt(x + 1, y + 1)){
            neigbours.push(nodes[y + 1][x + 1]);
        }
        if(d0 && this.isWalkableAt(x - 1, y + 1)){
            neigbours.push(nodes[y + 1][x - 1]);
        }
        return neigbours;
    }

    clone(){
        let width = this.width;
        let height = this.height;
        let thisNodes = this.nodes;

        let newGrid = new Grid(width, height);
        let newNodes = new Array(height);

        for(let i = 0; i < height; i++){
            newNodes[i] = new Array(width);
            for(let j = 0; j < width; j++){
                newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable);
            }
        }
        newGrid.nodes = newNodes;

        return newGrid;
    }
}

export default Grid;