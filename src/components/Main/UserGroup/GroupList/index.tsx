import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from "@r/index";
import { deleteGroup, setGroupList } from '@/reducers/groupReducer';
import { showModal, closeModal } from '@/reducers/popupReducer';
import { Button, Table } from 'react-bootstrap';
import Row from "./Row";
import EditModalBody from './EditModalBody';
import * as api from '@/utils/api';
import { getGroupList } from '@/utils/api';
import { group } from '@/type';
import { notice } from '@/reducers/noticeReducer';
import Checkbox from '@com/Checkbox';
import ButtonArea from '@com/ButtonArea';

const UserGroupTable: FC = () => {
    const key = "usergroup-list";
    const list = useSelector( ( state: State ) => state.group.list );
    const policies = useSelector( ( state: State ) => state.policy.list );
    const refresh = useSelector( ( state: State ) => state.popup.refresh );
    const dispatch = useDispatch();

    const showEditModal = ( i: number ) => {
        dispatch( showModal( {
            header: "EDIT",
            body: <EditModalBody idx={i} />,
            useFooter: false,
            modalProps: {
                dialogClassName: "edit-modal",
            },
        } ) );
    }

    const showCreateModal = () => {
        dispatch( showModal( {
            header: "ADD",
            body: <EditModalBody idx={-1} />,
            useFooter: false,
            modalProps: {
                dialogClassName: "edit-modal",
            },
        } ) );
    }

    const isGroupUsed = ( groupId: number ) => {
        const tmp = policies.filter( p => p.group_id === groupId );
        if ( tmp.length === 0 ) return false;
        return true;
    }

    const onDeleteGroup = async ( i: number ) => {
        const { id } = list[ i ];
        await api.deleteGroup( id );
        dispatch( deleteGroup( i ) );
        dispatch( closeModal( true ) );
    }

    const onDelete = ( i: number ) => {
        const { id } = list[ i ];
        if ( isGroupUsed( id ) ) {
            dispatch( notice( "ERROR: Policy에서 사용 중인 그룹입니다.", "danger" ) );
            return;
        }
        dispatch( showModal( {
            header: "삭제",
            body: <>{list[ i ].name} 그룹을 삭제하시겠습니까?</>,
            exButton: (
                <Button
                    variant="danger"
                    onClick={() => onDeleteGroup( i )}
                >
                    삭제
                </Button>
            ),
            modalProps: {
                size: "sm",
            },
        } ) );
    }

    useEffect( () => {
        if ( refresh === null ) return;
        const func = async () => {
            const groups: group[] = await getGroupList();
            dispatch( setGroupList( groups ) );
        }
        func();
    }, [ refresh ] );

    return (
        <>
            <div className="table-action">
                <Button className="add" variant="primary" onClick={() => showCreateModal()}>Add</Button>
            </div>
            <Table hover className={"grouplist-table"}>
                <caption className="blind">Group List</caption>
                <colgroup>
                    <col width="100px" />
                    <col />
                    <col width="400px" />
                    <col width="200px" />
                    <col width="250px" />
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <Checkbox id="server-checkbox-all" checked={false} />
                        </th>
                        <th>Name</th>
                        <th>permission</th>
                        <th>Use in policy</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map( ( group, i: number ) => (
                        <tr key={`${ key }-tr-${ i }`}>
                            <Row idx={i} isGroupUsed={isGroupUsed} />
                            <td>
                                <ButtonArea
                                    edit del
                                    onEdit={() => showEditModal( i )}
                                    onDelete={() => onDelete( i )}
                                />
                            </td>
                        </tr>
                    ) )}
                </tbody>
            </Table>
        </>
    );
}

export default UserGroupTable;
