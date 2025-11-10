import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.jsx';
import { useGuard } from './hooks/guard/useGuard.js';
import ToastProvider from './lib/toast/ToastProvider.jsx';

function App() {
  useGuard();
  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
    </>
  );
}

export default App;
