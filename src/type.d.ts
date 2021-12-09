export type Method = "get" | "post" | "put" | "patch" | "delete"

export interface Match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

export type modal = {
    modalProps?: { [ key: string ]: any },
    header: string,
    body: ReactElement,
    exButton?: ReactElement,
    useFooter?: boolean,
    clearEffect?: Function,
}

export type notice = {
    id: number,
    variant: string,
    text: string,
}
