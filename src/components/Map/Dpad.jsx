
import { signal } from "@preact/signals-react";
import "../css/Dpad.css"
import { wsURLServer } from "./Report";
import useWebSocket from "react-use-websocket";

export const isUp = signal(false);
export const isDown = signal(false);
export const isRight = signal(false);
export const isLeft = signal(false);

export default function Dpad(){
    const {sendMessage} = useWebSocket(`ws://${wsURLServer}`, {
        onOpen: () => console.log(`Success Connection ${wsURLServer}`),
        share: true,
        shouldReconnect: () => true,
    })

    const handleDpad = (val, key) => {
        if(val){
            sendMessage(key);
        }
        switch(key){
            case 'isUp':{
                isUp.value = val;
                break;
            }
            case 'isRight':{
                isRight.value = val;
                break;
            }
            case 'isLeft':{
                isLeft.value = val;
                break;
            }
            case 'isDown':{
                isDown.value = val;
                break;
            }
        }
    }

    return(
        <nav className="d-pad">
            <a className="up" href="#" onMouseDown={()=> handleDpad(true, "isUp")} onMouseUp={()=> handleDpad(false, "isUp")}></a>
            <a className="right" href="#" onMouseDown={()=> handleDpad(true, "isRight")} onMouseUp={()=> handleDpad(false, "isRight")}></a>
            <a className="down" href="#" onMouseDown={()=> handleDpad(true, "isDown")} onMouseUp={()=> handleDpad(false, "isDown")}></a>
            <a className="left" href="#" onMouseDown={()=> handleDpad(true, "isLeft")} onMouseUp={()=> handleDpad(false, "isLeft")}></a>  
        </nav>
    )
}