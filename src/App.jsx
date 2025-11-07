import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';
import { useGuard } from './hooks/guard/useGuard.js';

function App() {
  useGuard();
  return <RouterProvider router={router} />;
}

export default App;
