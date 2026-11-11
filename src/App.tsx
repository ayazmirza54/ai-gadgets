import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { pages, routeTable } from './routes';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routeTable.map(({ path, page }) => {
          const { C } = pages[page];
          return path === '/' ? <Route key={path} index element={<C />} /> : <Route key={path} path={path} element={<C />} />;
        })}
      </Route>
    </Routes>
  );
}
