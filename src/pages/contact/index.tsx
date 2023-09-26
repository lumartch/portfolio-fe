import { Box, Button, FormControl, Grid, TextField, useMediaQuery } from '@mui/material';

import { Skeleton } from '@/components';
import { CONTACT_LABELS, minWidth } from '@/const';
import { useRef } from 'react';

const Contact = () => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const { Title, Description} = CONTACT_LABELS;
    const form = useRef<HTMLFormElement>(null);
    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
    }

    return (
        <Grid container item textAlign='center' spacing={4} paddingLeft={padding} paddingRight={padding}>
            <Grid item container xs={12}>
                <Skeleton title={Title} description={Description} />
                <Box sx={{ width: '100%'}} p={6} alignItems='center'>
                    <form ref={form} style={{ width: '75%', display: 'inline-block'}} onSubmit={onSubmit}>
                        <FormControl fullWidth margin='normal'>
                            <TextField sx={{ paddingBottom: '40px'}} label='Your name...' variant='standard' required />
                            <TextField sx={{ paddingBottom: '40px'}} label='email@example.com' type='email' variant='standard'  required />
                            <TextField sx={{ paddingBottom: '40px'}} label='Subject...' variant='standard' required />
                            <TextField sx={{ paddingBottom: '40px'}} size='medium' label='Mesage...' variant='outlined' 
                                inputProps={{ style: { height: "80px", }, }} required multiline />
                            <Button type='submit' variant='outlined'>Send email</Button>
                        </FormControl>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Contact;