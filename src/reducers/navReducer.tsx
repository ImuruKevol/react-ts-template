import Login from "@c/Login";
import { FC } from "react";

//* action type
const LINK = "nav/link" as const;

//* action creator
export const link = ( to: string, component: FC ) => ( {
    type: LINK,
    to,
    component,
} );

//* types & initial state

type NavAction =
    | ReturnType<typeof link>

type NavState = {
    uri: string,
    content: FC,
}

const initialState: NavState = {
    uri: "/login",
    content: Login,
}

//* handler

const linkHandler: { [ key: string ]: Function } = {
    [ LINK ]: ( state: NavState, action: { to: string, component: FC } ) => {
        const { to, component } = action;
        return {
            ...state,
            uri: to,
            content: component,
        }
    },
}

const navReducer = (
    state: NavState = initialState,
    action: NavAction
) => {
    const { type } = action;
    const handler = linkHandler[ type ];
    if ( !handler ) return state;
    const result: NavState = handler( state, action );
    return result;
}

export default navReducer;
