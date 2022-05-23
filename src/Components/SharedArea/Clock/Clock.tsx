import { useEffect, useState } from "react";
import "./Clock.css";
import ILTime from '../ILTime/ILTime';

function Clock(): JSX.Element {

    let timerID: any = null;
    const [time, setTime] = useState<Date>(new Date());

    const zeroLead = (num: number) => {
        num.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        }
        )
    }

    // componentDidMount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timerID = setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);

    // // componentDidUpdate
    // useEffect(()=>{

    // },[time]);

    // componentWillUnmount
    useEffect(() => {
        return () => {
            clearInterval(timerID);
        }
    }, [])


    return (
        <div className="Clock">
            <ILTime date={time}/>
        </div>
    );
}

export default Clock;
