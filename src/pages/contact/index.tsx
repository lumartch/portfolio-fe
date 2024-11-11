import { Skeleton } from '@/components';
import { CONTACT_LABELS, EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, minWidth } from '@/consts';
import emailjs from '@emailjs/browser';
import { Alert, AlertColor, Box, Button, CircularProgress, FormControl, Grid, Snackbar, TextField, useMediaQuery } from '@mui/material';
import React, { useRef, useState } from 'react';

const Contact: React.FC = () => {
  const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
  const padding: number = matches ? 16 : 0;
  const { Description, Title} = CONTACT_LABELS;
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>();
  const [isSendingEmail, setIsSendingEmail] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleOpen = ( message: string, severity: AlertColor) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    if(!formRef.current) return;
    e.preventDefault();
    setIsSendingEmail(true);
    try {
      emailjs.sendForm(EMAIL_SERVICE_ID!, EMAIL_TEMPLATE_ID!, formRef.current, EMAIL_PUBLIC_KEY!);
      handleOpen('Your email was sent correctly! I\'ll contact you soon! :)', 'success');
    } catch {
      handleOpen('Oops! Something went wrong, try it later!', 'error');
    } finally {
      formRef.current.reset();
      setIsSendingEmail(false);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container item paddingLeft={padding} paddingRight={padding} spacing={4} textAlign='center'>
      <Grid container item xs={12}>
        <Skeleton description={Description} title={Title} />
        <Box alignItems='center' p={6} sx={{ width: '100%'}}>
          <form onSubmit={onSubmit} ref={formRef} style={{ display: 'inline-block', width: '75%'}}>
            <FormControl fullWidth margin='normal'>
              <TextField label='Your name...' name='from_name' required sx={{ paddingBottom: '40px'}} variant='standard' />
              <TextField label='email@example.com' name='from_email' required sx={{ paddingBottom: '40px'}} type='email' variant='standard' />
              <TextField label='Subject...' name='subject' required sx={{ paddingBottom: '40px'}} variant='standard' />
              <TextField inputProps={{ style: { height: '80px', }, }} label='Mesage...' multiline name='message' required 
                size='medium' sx={{ paddingBottom: '40px'}} variant='outlined' />
              <Button disabled={isSendingEmail} type='submit' variant='outlined' >{ isSendingEmail ? <CircularProgress /> : 'Send email' }</Button>
            </FormControl>
          </form>
        </Box>
      </Grid>
      <Snackbar autoHideDuration={6000} onClose={handleClose} open={open}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Contact;