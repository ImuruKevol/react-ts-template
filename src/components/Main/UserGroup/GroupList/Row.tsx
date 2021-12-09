import React, { FC } from 'react';
import { State } from '@/reducers';
import { useSelector } from 'react-redux';
import UseStatus from '@com/UseStatus';
import Checkbox from '@com/Checkbox';

type row = {
    idx: number,
    isGroupUsed: Function,
}

const Row: FC<row> = ( props: row ) => {
    const { idx, isGroupUsed } = props;
    const list = useSelector( ( state: State ) => state.group.list );
    const row = list[ idx ];

    return (
        <>
            <td>
                <Checkbox id={`sv-cb-${idx}`} checked={false} />
            </td>
            <td>
                {row.name}
            </td>
            <td>
                {row.authority.join( "," )}
            </td>
            <td>
                <UseStatus use={isGroupUsed(row.id)} />
            </td>
        </>
    );
}

export default Row;
