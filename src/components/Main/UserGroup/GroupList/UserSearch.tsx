import { emptyUserPage } from '@/enum';
import { Page, user } from '@/type';
import { getUserList } from '@/utils/api';
import { FC, useState, useEffect } from 'react';
import { Button, Modal, Table, Form, Pagination } from 'react-bootstrap';

type userSearch = {
    onHide: Function,
    includeAuthority: Function,
    selectUser: Function,
}

const UserSearch: FC<userSearch> = ( props: userSearch ) => {
    const { onHide, selectUser, includeAuthority } = props;
    const [ users, setUsers ] = useState<Page<user>>( emptyUserPage );
    const [ text, setText ] = useState<string>( "" );

    const pagination = () => {
        const { page, lastpage } = users;
        const start = page === 1 ? 1 : ( page - 1 ) * 3 + 1;
        const end = page * 3 > lastpage ? lastpage : page * 3;
        let arr = [];
        for ( let i = start; i <= end; i++ ) arr.push( i );

        return (
            <Pagination>
                <Pagination.First disabled={start === 1} />
                <Pagination.Prev disabled={start === 1} />
                {arr.map( num => (
                    <Pagination.Item
                        key={`us-pn-${ num }`}
                        active={page === num}
                    >
                        {num}
                    </Pagination.Item>
                ) )}
                <Pagination.Next disabled={end === lastpage} />
                <Pagination.Last disabled={end === lastpage} />
            </Pagination>
        );
    }

    useEffect( () => {
        const func = async () => {
            const result: Page<user> = await getUserList();
            setUsers( result )
        }
        func();
    }, [] );

    const search = async () => {
        const result: Page<user> = await getUserList( {
            ...users,
            userId: text,
            userName: text,
        } );
        setUsers( result );
    }

    return (
        <Modal
            show={true}
            onHide={onHide}
            size="sm"
            centered
            animation={false}
            dialogClassName="user-search-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    유저 검색
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    maxLength={100}
                    placeholder={"ID or Name"}
                    value={text}
                    onChange={e => {
                        const { value } = e.target;
                        setText( value );
                    }}
                    onKeyDown={e => {
                        const { key } = e;
                        if ( key === "Enter" ) search();
                    }}
                />
                <Table hover striped className="user-search-modal-ulist">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.list.map( ( user, i ) => (
                            <tr
                                key={`user-search-modal-row-${ i }`}
                                onClick={() => {
                                    selectUser( user.userid )
                                    onHide()
                                }}
                                className={includeAuthority( user.userid ) ? "include" : ""}
                            >
                                <td>{user.userid}</td>
                                <td>{user.username}</td>
                            </tr>
                        ) )}
                    </tbody>
                </Table>
                {pagination()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={() => onHide()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserSearch;
