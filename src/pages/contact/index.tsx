import { Skeleton } from "@/components";
import { CONTACT_LABELS, minWidth } from "@/const";
import { Grid, useMediaQuery } from "@mui/material";

const Contact = () => {
    const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
    const padding: number = matches ? 16 : 0;
    const { Title, Description} = CONTACT_LABELS;
    return (
        <Grid container item textAlign='center' spacing={4} paddingLeft={padding} paddingRight={padding}>
            <Grid item container xs={12}>
                <Skeleton title={Title} description={Description} />
            </Grid>
        </Grid>
    );
}

export default Contact;