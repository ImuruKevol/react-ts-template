import { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setGroupList } from '@/reducers/groupReducer';
import { setPolicyList } from '@/reducers/policyReducer';
import { setUserList } from '@/reducers/userReducer';
import { group, policy, Page, user } from '@/type';
import { getGroupList, getPolicyList, getUserList } from '@/utils/api';
import GroupList from './GroupList';
import { emptyUserPage } from '@/enum';
import { initModal } from '@/reducers/popupReducer';
import '@/styles/UserGroup.scss';

const UserGroup: FC = () => {
    const dispatch = useDispatch();

    useEffect( () => {
        const func = async () => {
            const policies: policy[] = await getPolicyList();
            dispatch( setPolicyList( policies ) );
            const users: Page<user> = await getUserList();
            dispatch( setUserList( users ) );
            const groups: group[] = await getGroupList();
            dispatch( setGroupList( groups ) );
        }
        func();
        return () => {
            dispatch( setGroupList( [] ) );
            dispatch( setUserList( emptyUserPage ) );
            dispatch( setPolicyList( [] ) );
            dispatch( initModal() );
        }
    }, [] );

    return (
        <div>
            <h2>Group List</h2>
            <GroupList />
        </div> );
}

export default UserGroup;
