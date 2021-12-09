import { notice } from "@/type";
import { closeNotice } from "@r/noticeReducer";
import { FC, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";

const Row: FC<{ notice: notice }> = ( { notice } ) => {
    const dispatch = useDispatch();
    const [ fade, setFade ] = useState( "" );

    useEffect( () => {
        setFade( "fadeout" )
        setTimeout( () => dispatch( closeNotice( notice.id ) ), 2000 );
    }, [] );

    return (
        <Alert
            variant={notice.variant}
            className={"global-notice " + fade}
            onClick={() => dispatch( closeNotice( notice.id ) )}
        >
            <span>
                {notice.text}
            </span>
        </Alert>
    );
}

export default Row;
