import React, { FC } from 'react';
import Content from './Content';
import '@/styles/Main.scss';
import '@/styles/Common.scss';

const Main: FC = () => {
    return (
        <div className="page-main">
            <Content />
        </div>
    );
}

export default Main;
