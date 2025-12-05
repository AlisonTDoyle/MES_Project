"use client";

import { MouseEventHandler, MouseEvent, useState } from "react";

export default function OperatorStationStatusButton() {
    const buttonTextOptions:string[] = ["Check into Station", "Check out of Station"];
    const [checkedIntoStation, setCheckedIntoStation] = useState(false);
    const [buttonText, setButtonText] = useState(buttonTextOptions[0]);

    function ChangeStationStaus(event:MouseEvent<HTMLButtonElement>):void  {
        const newCheckedState = !checkedIntoStation;
        setCheckedIntoStation(newCheckedState);
        setButtonText(newCheckedState ? buttonTextOptions[1] : buttonTextOptions[0]);

        
    }

    return(
        <button onClick={ChangeStationStaus} className="p-2 rounded border border-red-800 bg-red-900 hover:border-red-500 hover:bg-red-800 hover:cursor-pointer">{buttonText}</button>
    )
}