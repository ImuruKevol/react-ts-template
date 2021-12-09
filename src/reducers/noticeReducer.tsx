import * as type from "@/type";

const SHOW = "notice/SHOW" as const;
const CLOSE = "notice/CLOSE" as const;

type Variant = 'success' | 'danger' | 'warning' | 'info';

//* action creator
export const notice = ( text: string, variant: Variant = "success" ) => ( {
    type: SHOW,
    text,
    variant,
} );

export const closeNotice = ( id: number ) => ( {
    type: CLOSE,
    id,
} );

//* types & initial state

type NoticeAction =
    | ReturnType<typeof notice>
    | ReturnType<typeof closeNotice>

type NoticeState = {
    id: number,
    list: type.notice[],
}

const initialState: NoticeState = {
    id: 0,
    list: [],
}

//* handler

const noticeHandler: { [ key: string ]: Function } = {
    [ SHOW ]: ( state: NoticeState, action: { text: string, variant: Variant } ) => {
        const { id, list } = state;
        const { text, variant } = action;
        return {
            ...state,
            list: [ ...list, {
                id,
                text,
                variant,
            } ],
            id: id + 1,
        }
    },

    [ CLOSE ]: ( state: NoticeState, action: { id: number } ) => {
        const { list } = state;
        const { id } = action;
        const idx = list.findIndex( t => t.id === id );
        if ( idx < 0 ) return state;
        return {
            ...state,
            list: [
                ...list.slice( 0, idx ),
                ...list.slice( idx + 1 ),
            ]
        }
    },
}

const noticeReducer = (
    state: NoticeState = initialState,
    action: NoticeAction
) => {
    const { type } = action;
    const handler = noticeHandler[ type ];
    if ( !handler ) return state;
    const result: NoticeState = handler( state, action );
    return result;
}

export default noticeReducer;
