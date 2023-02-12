import {
  FC,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../components/Navbar';
import Copyright from '../components/Copyright';
import Typography from '@mui/material/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '../components/CustomAccordian';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ShowAlert from '../utils/showAlert';
import Snackbar from '@mui/material/Snackbar';
import baseApi from '../utils/baseApi';
import { IAllTask, IAllTasksResponse } from '@time-tracker-app/models';

const TaskScreen: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isActive, message, openSnackBar } = ShowAlert();
  const [expanded, setExpanded] = useState<string | false>('');
  const [tasks, setTasks] = useState<IAllTask[]>([]);

  const fetchTasks = useCallback(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
      openSnackBar('First please login!');
    }

    fetch(baseApi + `/task/all/${searchParams.get('projectId')}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((response: IAllTasksResponse) => {
        if (response.status === 200 && response.data) {
          setTasks(response.data);
        }
      })
      .catch((e) => {
        openSnackBar(e.message);
      })
      .finally();
  }, [navigate, openSnackBar, searchParams]);

  useEffect(() => {
    if (searchParams.get('projectId')) {
      fetchTasks();
    }
  }, [fetchTasks, searchParams]);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
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
          Tasks
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Here is the list of your all the tasks belong to Project.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        {tasks.map((task) => (
          <Accordion
            key={task._id.toString()}
            expanded={expanded === task._id.toString()}
            onChange={handleChange(task._id.toString())}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{task.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{task.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
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

export default memo(TaskScreen);
