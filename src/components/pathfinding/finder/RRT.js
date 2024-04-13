import { backtrace } from "../core/Util";

export default class RRT {
    constructor(opt) {
        opt = opt || {};
        this.allowDiagonal = opt.allowDiagonal;
        this.dontCrossCorners = opt.dontCrossCorners;
        this.heuristic = opt.heuristic || manhattan;
        this.goalRadius = opt.goalRadius || 1;
        this.goalBias = opt.goalBias || 0;
        this.epsilon = opt.epsilon || 1;
        this.diagonalMovement = opt.diagonalMovement;

        if (!this.diagonalMovement) {
            if (!this.allowDiagonal) {
                this.diagonalMovement = Never;
            } else {
                if (this.dontCrossCorners) {
                    this.diagonalMovement = OnlyWhenNoObstacles;
                } else {
                    this.diagonalMovement = IfAtMostOneObstacle;
                }
            }
        }
    }

    findPath(startX, startY, endX, endY, grid) {
        let startNode = grid.getNodeAt(startX, startY), 
            endNode = grid.getNodeAt(endX, endY), 
            nodes = new Array(),
            goalFlag = false,
            goalState = startNode,
            heuristic = this.heuristic, 
            goalRadius = this.goalRadius;
        
        nodes.push(startNode);
        
        while (!goalFlag){
            let randNode;
            if(Math.random() < this.goalBias){
                //bias to the goal
                randNode = endNode;
            }else{
                //Randomly choose a node in the grid
                while(!randNode?.walkable || nodes.includes(randNode)){
                    randNode = grid.getNodeAt(Math.floor(Math.random() * grid.width), Math.floor(Math.random() * grid.height));
                }
            }
            
            //Find the nearest node in the tree
            let nearestNode = nodes[0];
            let nearestDist = heuristic(Math.abs(nearestNode.x - randNode.x), Math.abs(nearestNode.y - randNode.y));
            for(let i = 1; i < nodes.length; i++){
                let dist = heuristic(Math.abs(nodes[i].x - randNode.x), Math.abs(nodes[i].y - randNode.y));
                if(dist < nearestDist){
                    nearestNode = nodes[i];
                    nearestDist = dist;
                }
            }
            //Step from to
            let newNode;
            if(nearestDist > this.epsilon){
                let x = randNode.x - nearestNode.x;
                let y = randNode.y - nearestNode.y;
                let theta = Math.atan2(y, x);
                newNode = grid.getNodeAt(Math.ceil(nearestNode.x + this.epsilon * Math.cos(theta)), Math.ceil(nearestNode.y + this.epsilon * Math.sin(theta)));
            }else{
                newNode = randNode;
            }
            //check if line is cross obstacles
            let crossFlag = false;
            if(!this.dontCrossCorners){
                let x = newNode.x - nearestNode.x;
                let y = newNode.y - nearestNode.y;
                let theta = Math.atan2(y, x);
                for(let i = 0; i < Math.ceil(Math.sqrt(x * x + y * y)); i++){
                    let node = grid.getNodeAt(Math.ceil(nearestNode.x + i * Math.cos(theta)), Math.ceil(nearestNode.y + i * Math.sin(theta)));
                    if(!node.walkable){
                        crossFlag = true;
                        break;
                    }
                }
            }
            if(crossFlag) continue;

            if(!newNode.walkable || nodes.includes(newNode)) continue;
            newNode.parent = nearestNode;

            nodes.push(newNode);
            //Check if the new node is in the goal radius
            if(heuristic(Math.abs(newNode.x - endNode.x), Math.abs(newNode.y - endNode.y)) < goalRadius){
                goalFlag = true;
                goalState = newNode;
            }
        }

        //BackTrack find the goal path
        if(goalFlag){
            return backtrace(goalState);
        }

        // fail to find the path
        return [];
    }
}