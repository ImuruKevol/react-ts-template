import { FC } from 'react';
import { useSelector } from 'react-redux';
import { State } from '@/reducers';
import "@/styles/Content.scss";

const Content: FC = () => {
    const Content = useSelector( ( state: State ) => state.nav.content );
    return (
        <div className="main">
            <Content />
        </div>
    );
}

export default Content;
