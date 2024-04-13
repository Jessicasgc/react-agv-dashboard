import { signal } from "@preact/signals-core";
import { Button, Input, Space } from "antd";
import { obstacles, grid } from "./Experience";

export const xPos = signal('');
export const yPos = signal('');
export const width = signal('');
export const height = signal('');

export default function InputObstacle () {
    const handleInsert = () => {
        const newObs = {
            key: obstacles.value.length + 1,
            position: [parseInt(xPos.value), parseInt(yPos.value)],
            size: [parseInt(width.value), parseInt(height.value)]
        };
        obstacles.value.push(newObs);
        grid.value.addObstacle([newObs])
        xPos.value = '';
        yPos.value = '';
        width.value = '';
        height.value = '';
    }
    return(
        <>
            <Space.Compact>
                <Input placeholder="x" value={xPos.value} onChange={(e) => xPos.value = e.target.value}/>
                <Input placeholder="y" value={yPos.value} onChange={(e) => yPos.value = e.target.value}/>
                <Input placeholder="W" value={width.value} onChange={(e) => width.value = e.target.value}/>
                <Input placeholder="H" value={height.value} onChange={(e) => height.value = e.target.value}/>
                <Button type="primary" onClick={handleInsert}>Insert</Button>
            </Space.Compact>
        </>
    );
}