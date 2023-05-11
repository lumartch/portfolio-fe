import { FC } from 'react';

import styles from './Skeleton.module.css';

type ISkeleton = {
    title: string;
    description: string;
}

export const Skeleton: FC<ISkeleton> = ({title, description}) => {
    return (
        <div className={styles.Skeleton}>
            <h1>{title}</h1>
            <div className={styles.Divider}> </div>
            <span>{description}</span>
        </div>
    );
};