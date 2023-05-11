import PageSkelleton from "@/components/PageSkelleton";
import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

const header = "Hi visitor!";
const description = "Greetings! My name is Luis Martínez, and I am a passionate and highly skilled full-stack developer ready to embark on new and exciting coding adventures. With a solid foundation in both front-end and back-end development, I bring a wealth of technical expertise and a drive to create innovative and user-friendly digital solutions.";
const paragraphOne = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus sit amet dictum sit amet. Tellus rutrum tellus pellentesque eu. Nec tincidunt praesent semper feugiat nibh sed. Id aliquet risus feugiat in ante metus. Quisque id diam vel quam elementum pulvinar etiam. Quam viverra orci sagittis eu. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum.";
const paragraphTwo = "Aliquam id diam maecenas ultricies mi eget mauris. A cras semper auctor neque vitae tempus quam pellentesque. Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel. Dolor sit amet consectetur adipiscing. Elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl. Risus nec feugiat in fermentum. Hendrerit dolor magna eget est lorem. Ligula ullamcorper malesuada proin libero nunc consequat.";

const About = ( { skills }: InferGetStaticPropsType<typeof getStaticProps> ) => {
    const router = useRouter();
    console.log(skills);
    return (
            <section>
                <PageSkelleton title="About me" description={description}/>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <h2>{header}</h2>
                        <p>{paragraphOne}</p>    
                        <p>{paragraphTwo}</p>    
                    </Grid>
                    <Grid item xs={6}>
                        <h2>My Skills</h2>
                        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                            {skills.map((skill: string, index: number) => <Chip key={index} label={skill} variant="outlined" color="primary" />)}
                        </Stack>
                    </Grid>
                </Grid>
                <Button variant="outlined" size="large" onClick={() => router.push("/contact")}>Contact</Button>
            </section>
        );
}

export const getStaticProps: GetStaticProps  = async() => {
    return {
        props: {
            skills: ["Java", "JavaScripot", "TypeScript", "ReactJs", "Git", "C/C++"]
        }
    }
}

export default About;