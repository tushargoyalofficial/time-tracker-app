import { FC, memo, useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import Navbar from '../components/Navbar';
import { createSearchParams, useNavigate } from 'react-router-dom';
import ShowAlert from '../utils/showAlert';
import Snackbar from '@mui/material/Snackbar';
import baseApi from '../utils/baseApi';
import {
  IUserProjectArray,
  IUserProjectsResponse,
} from '@time-tracker-app/models';

const DashboardScreen: FC = () => {
  const navigate = useNavigate();
  const { isActive, message, openSnackBar } = ShowAlert();
  const [projects, setProjects] = useState<IUserProjectArray[]>([]);

  const fetchProjects = useCallback(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      openSnackBar('First please login!');
    }

    fetch(baseApi + '/userProject/all', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((response: IUserProjectsResponse) => {
        if (response.status === 200 && response.data?.projects) {
          setProjects(response.data?.projects);
        }
      })
      .catch((e) => {
        openSnackBar(e.message);
      })
      .finally();
  }, [navigate, openSnackBar]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const showTasks = (projectId: string) => {
    navigate({
      pathname: '/task',
      search: createSearchParams({
        projectId,
      }).toString(),
    });
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Projects
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Here is the list of your all projects.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="stretch">
          {projects.map((project) => (
            <Grid item key={project._id.toString()} xs={12} sm={6} md={4}>
              <Card className="same-height">
                <CardHeader
                  title={project.name}
                  titleTypographyProps={{ align: 'center' }}
                  action={null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>{project.description}</CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={'outlined'}
                    onClick={() => showTasks(project._id.toString())}
                  >
                    Show Tasks
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <Snackbar open={isActive} message={message} />
    </>
  );
};

export default memo(DashboardScreen);
