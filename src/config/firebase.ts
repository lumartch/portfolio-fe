import { FIREBASE_CONFIG } from '@/consts';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from 'firebase/database';


export const useFirebase = () => {
    const app = initializeApp(FIREBASE_CONFIG);
    const database = getDatabase(app);
    const refLanguages = ref(database, 'languages');
    const refFrameworks = ref(database, 'frameworks');
    const refTools = ref(database, 'tools');

    return { refFrameworks, refLanguages, refTools };
};