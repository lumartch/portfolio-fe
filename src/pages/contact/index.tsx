import { PageInfo } from '@/components';
import { CONTACT_LABELS, EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID } from '@/consts';
import emailjs from '@emailjs/browser';
import { Alert, AlertColor, Button, CircularProgress, Grid2, Snackbar, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';

import { formStyle } from './contact.css';

const Contact: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);

    const onShowToast = ( message: string, severity: AlertColor) => {
        setToastMessage(message);
        setSeverity(severity);
        setOpen(true);
    };

    const onSubmit = async (e: { preventDefault: () => void; }) => {
        if (!formRef.current) return;
        e.preventDefault();
        setIsLoading(true);
        try {
            emailjs.sendForm(EMAIL_SERVICE_ID!, EMAIL_TEMPLATE_ID!, formRef.current, EMAIL_PUBLIC_KEY!);
            onShowToast('Your email was sent correctly! I\'ll contact you soon! :)', 'success');
        } catch {
            onShowToast('Oops! Something went wrong, try it later!', 'error');
        } finally {
            formRef.current.reset();
            setIsLoading(false);
        }
    };

    return (
        <>
            <PageInfo description={CONTACT_LABELS.description} title={CONTACT_LABELS.title} />
            <form className={formStyle} onSubmit={onSubmit} ref={formRef}>
                <Grid2 size={{ xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', gap: '34px', padding: '80px' }}>
                    <TextField label='Your name...' name='from_name' required variant='standard' />
                    <TextField label='email@example.com' name='from_email' required type='email' variant='standard' />
                    <TextField label='Subject...' name='subject' required variant='standard' />
                    <TextField label='Mesage...' multiline name='message' required sx={{ minHeight: '80px' }} variant='outlined' />
                    <Button disabled={isLoading} type='submit' variant='outlined' >{ isLoading ? <CircularProgress /> : 'Send email' }</Button>
                </Grid2>
            </form>
            <Snackbar autoHideDuration={6000} onClose={() => setOpen(false)} open={open}>
                <Alert onClose={() => setOpen(false)} severity={severity} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Contact;