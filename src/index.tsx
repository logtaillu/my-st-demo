import React from "react";
import "./styles/index.css";
export interface IProps {
    text?: string;
}
// entry
const Test = function (props: IProps) {
    const { text = "text" } = props;
    return <div className="bk">{text}</div>;
}
export default Test;
