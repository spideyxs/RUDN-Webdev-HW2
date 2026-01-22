import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import TopBar from './components/TopBar/TopBar';
import BoardPage from './pages/BoardPage/BoardPage';
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage';
import TaskViewPage from './pages/TaskViewPage/TaskViewPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#E63946',
      light: '#FF6B7A',
      dark: '#C41E3A'
    },
    secondary: {
      main: '#1E40AF',
      light: '#3B82F6',
      dark: '#1E3A8A'
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
});

const Layout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <BoardPage />
      },
      {
        path: '/create',
        element: <CreateTaskPage />
      },
      {
        path: '/task/:id',
        element: <TaskViewPage />
      }
    ]
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
