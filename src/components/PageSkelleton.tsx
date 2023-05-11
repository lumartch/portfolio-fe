import { FC } from 'react';

import styles from './PageSkelleton.module.css';

type IPageSkelleton = {
    title: string;
    description: string;
}

const PageSkelleton: FC<IPageSkelleton> = ({title, description}) => {
    return (
        <div className={styles.PageSkelleton}>
            <h1>{title}</h1>
            <div className={styles.Divider}> </div>
            <span>{description}</span>
        </div>
    );
};

export default PageSkelleton;