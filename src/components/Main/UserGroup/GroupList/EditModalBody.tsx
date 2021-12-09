import { FC, useState } from 'react';
import { Button, Form, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { State } from '@r/index';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/reducers/popupReducer';
import UserSearch from './UserSearch';
import { group } from '@/type';
import { saveGroup } from '@/utils/api';
import { emptyGroup } from '@/enum';
import { notice } from '@r/noticeReducer';

const {
    Group,
    Label,
    Control,
} = Form;

const {
    Item,
} = ListGroup;

type editModalBody = {
    idx: number,
}

const EditModalBody: FC<editModalBody> = ( props: editModalBody ) => {
    const { idx } = props;
    const list = useSelector( ( state: State ) => state.group.list );
    // const userList = useSelector( ( state: State ) => state.user.list );
    const dispatch = useDispatch();
    const row = idx >= 0 ? list[ idx ] : emptyGroup;
    const [ data, setData ] = useState<group>( row );
    const [ show, setShow ] = useState<boolean>( false );

    const onHide = ( refresh: boolean = false ) => {
        dispatch( closeModal( refresh ) );
    }

    const onSave = async () => {
        if ( data.name.replace( /\s/g, "" ).length === 0 ) {
            dispatch( notice( "ERROR: Name이 비어있습니다.", "danger" ) );
            return;
        }
        const result = await saveGroup( data );
        if ( result ) {
            dispatch( notice( "SUCCESS: SAVED" ) );
            onHide( true );
            return;
        }
        dispatch( notice( "ERROR: 저장 실패", "danger" ) );
    }

    const includeAuthority = ( userId: string ) => {
        return data.authority.includes( userId );
    }

    return (
        <div className="edit-modal-body">
            <Form>
                <Group className="mb-3" controlId="group-edit-name">
                    <Label>Group Name</Label>
                    <Control
                        type="text"
                        maxLength={500}
                        value={data.name}
                        onChange={e => {
                            const { value } = e.target;
                            setData( {
                                ...data,
                                name: value,
                            } )
                        }}
                    />
                </Group>
                <Group className="mb" controlId="group-edit-permission">
                    <Label>Permission</Label>
                    <Button
                        variant={show ? "primary" : "outline-primary"}
                        style={{ float: "right" }}
                        onClick={() => setShow( true )}
                    >
                        ADD
                    </Button>
                    <ListGroup>
                        {data.authority.map( ( userId: string, i: number ) => (
                            <OverlayTrigger
                                key={`group-edit-tooltip-${ i }`}
                                placement={"top"}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        {userId}
                                        {/* user name 등 기타 정보 추가 가능 */}
                                    </Tooltip>
                                }
                            >
                                <Item
                                    key={`group-edit-per-${ i }`}
                                    className="edit-modal-plist-item"
                                >
                                    <>{userId}</>
                                    <button
                                        onClick={() => {
                                            const idx = data.authority.findIndex( id => id === userId );
                                            setData( {
                                                ...data,
                                                authority: [
                                                    ...data.authority.slice( 0, idx ),
                                                    ...data.authority.slice( idx + 1 ),
                                                ],
                                            } )
                                        }}
                                    >&#215;</button>
                                </Item>
                            </OverlayTrigger>
                        ) )}
                    </ListGroup>
                </Group>
            </Form>
            <div className="modal-footer">
                <Button variant="primary" onClick={onSave}>SAVE</Button>
                <Button variant="dark" onClick={() => onHide()}>Cancel</Button>
            </div>
            {show &&
                <UserSearch
                    onHide={() => setShow( false )}
                    includeAuthority={includeAuthority}
                    selectUser={( userId: string ) => {
                        if ( data.authority.includes( userId ) ) return;
                        setData( {
                            ...data,
                            authority: [
                                ...data.authority,
                                userId,
                            ],
                        } );
                    }}
                />}
        </div>
    );
}

export default EditModalBody;
