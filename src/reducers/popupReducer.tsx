import { modal } from "@/type";

const INIT = "popup/init" as const;
const SHOW = "popup/SHOW" as const;
const CLOSE = "popup/CLOSE" as const;
const SHOW_MODAL = "popup/modal/show" as const;
const CLOSE_MODAL = "popup/modal/close" as const;

//* action creator
export const initModal = () => ( {
    type: INIT,
} );

export const showPopup = ( id: string ) => ( {
    type: SHOW,
    id,
} );

export const closePopup = ( refresh: boolean = false ) => ( {
    type: CLOSE,
    refresh,
} );

export const showModal = ( modal: modal ) => ( {
    type: SHOW_MODAL,
    modal,
} );

export const closeModal = ( refresh: boolean = false ) => ( {
    type: CLOSE_MODAL,
    refresh,
} );

//* types & initial state

type PopupAction =
    | ReturnType<typeof initModal>
    | ReturnType<typeof showPopup>
    | ReturnType<typeof closePopup>
    | ReturnType<typeof showModal>
    | ReturnType<typeof closeModal>

type PopupState = {
    id: string | null,
    modal: modal | null,
    refresh: boolean | null,
}

const initialState: PopupState = {
    id: null,
    modal: null,
    refresh: null,
}

//* handler

const popupHandler: { [ key: string ]: Function } = {
    [ INIT ]: ( state: PopupState ) => {
        return initialState;
    },

    [ SHOW ]: ( state: PopupState, action: { id: string } ) => {
        const { id } = action;
        return {
            ...state,
            id,
        }
    },

    [ CLOSE ]: ( state: PopupState, action: { refresh: boolean } ) => {
        const refresh = action.refresh ? true : action.refresh === null ? null : false;
        return {
            ...state,
            id: null,
            refresh,
        }
    },

    [ SHOW_MODAL ]: ( state: PopupState, action: { modal: modal } ) => {
        const { modal } = action;
        return {
            ...state,
            modal,
        }
    },

    [ CLOSE_MODAL ]: ( state: PopupState, action: { refresh: boolean } ) => {
        const refresh = action.refresh ? !state.refresh : state.refresh === null ? null : false;
        return {
            ...state,
            modal: null,
            refresh,
        }
    },
}

const popupReducer = (
    state: PopupState = initialState,
    action: PopupAction
) => {
    const { type } = action;
    const handler = popupHandler[ type ];
    if ( !handler ) return state;
    const result: PopupState = handler( state, action );
    return result;
}

export default popupReducer;
