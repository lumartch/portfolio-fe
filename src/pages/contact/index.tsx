import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Alert, AlertColor, Box, Button, CircularProgress, FormControl, Grid, Snackbar, TextField, useMediaQuery } from '@mui/material';

import { Skeleton } from '@/components';
import { CONTACT_LABELS, EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, minWidth } from '@/const';

const Contact = () => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const { Title, Description} = CONTACT_LABELS;
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [severity, setSeverity] = useState<AlertColor>();
    const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
    const form = useRef<any>(); // TODO: Handle the correct type of reference that matches form and email form

    const onSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSendingEmail(true);
        emailjs.sendForm(EMAIL_SERVICE_ID!, EMAIL_TEMPLATE_ID!, form.current, EMAIL_PUBLIC_KEY!)
        .then((_) => {
            handleOpen(`Your email was sent correctly! I'll contact you soon! :)`, 'success');
        }, (_) => {
            handleOpen('Oops! Something went wrong, try it later!', 'error');
        })
        .finally(() => {
            form.current.reset();
            setIsSendingEmail(false);
        });
    }

    const handleOpen = ( message: string, severity: AlertColor) => {
        setMessage(message);
        setSeverity(severity);
        setOpen(true);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container item textAlign='center' spacing={4} paddingLeft={padding} paddingRight={padding}>
            <Grid item container xs={12}>
                <Skeleton title={Title} description={Description} />
                <Box sx={{ width: '100%'}} p={6} alignItems='center'>
                    <form ref={form} style={{ width: '75%', display: 'inline-block'}} onSubmit={onSubmit}>
                        <FormControl fullWidth margin='normal'>
                            <TextField sx={{ paddingBottom: '40px'}} name='from_name' label='Your name...' variant='standard' required />
                            <TextField sx={{ paddingBottom: '40px'}} name='from_email' label='email@example.com' type='email' variant='standard'  required />
                            <TextField sx={{ paddingBottom: '40px'}} name='subject' label='Subject...' variant='standard' required />
                            <TextField sx={{ paddingBottom: '40px'}} name='message' size='medium' label='Mesage...' variant='outlined' 
                                inputProps={{ style: { height: '80px', }, }} required multiline />
                            <Button type='submit' variant='outlined' disabled={isSendingEmail} >{ isSendingEmail ? <CircularProgress /> : 'Send email' }</Button>
                        </FormControl>
                    </form>
                </Box>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default Contact;