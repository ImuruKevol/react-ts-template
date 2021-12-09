import { State } from "@r/index";
import { FC } from "react";
import { useSelector } from "react-redux";
import Row from "./Row";

const Notice: FC = () => {
    const list = useSelector( ( state: State ) => state.notice.list );

    return (
        <div className="notice">
            {list.map( ( notice ) => (
                <Row
                    key={`global-notice-${ notice.id }`}
                    notice={notice}
                />
            ) )}
        </div>
    )
}

export default Notice;
