import { FC } from 'react';

import styles from './Skeleton.module.css';

type ISkeleton = {
    title: string;
    description: string;
}

export const Skeleton: FC<ISkeleton> = ({title, description}) => {
    return (
        <div className={styles.skelleton}>
            <h1>{title}</h1>
            <div className={styles.divider}/>
            <span>{description}</span>
        </div>
    );
};