import { ApiHandler } from '@/api';
import { Loader, ProfileItem, ProjectList, Skeleton } from '@/components';
import { DEVELOPER_GIT_USER, EGitSource, PROJECTS_LABELS, minWidth } from '@/consts';
import { IProfile } from '@/interfaces/';
import { Grid, Tab, Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';


const Projects = () => {
  const matches = useMediaQuery(minWidth); // TODO: Handle correctly the media size
  const padding: number = matches ? 16 : 0;
  const [profile, setProfile] = useState<IProfile>();
  const { Description, Title } = PROJECTS_LABELS;
  const [gitSource, setGitSource] = useState<string>(EGitSource.GITHUB);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setIsLoading(true);
    setGitSource(newValue);
  };
  
  useEffect(() => {
    const updateProjects = async () => {
      ApiHandler.getInstance();
      try {
        const { data: profileData } = await ApiHandler.getInfo(DEVELOPER_GIT_USER!, gitSource);
        setProfile(profileData);
        setIsLoading(false);
      } catch (e) {
        console.error(`ERROR THROWN BY SERVER ${e}`);
      }
    };
    updateProjects();
  }, [gitSource]);

  return (
    <Grid container paddingLeft={padding} paddingRight={padding} spacing={5} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Grid item xs={12}>
        <Skeleton description={Description} title={Title} />
      </Grid>
      <Grid item xs={12}>
        <Tabs centered indicatorColor="secondary" onChange={handleChange} textColor="secondary" value={gitSource}>
          <Tab label={EGitSource.GITHUB} value={EGitSource.GITHUB} />
          <Tab label={EGitSource.GITLAB} value={EGitSource.GITLAB} />
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        { isLoading ? <Loader /> : <ProfileItem profile={profile!}/> }
      </Grid>
      <Grid item xs={12}><ProjectList gitSource={gitSource} /></Grid>
    </Grid>
  );
};

export default Projects;