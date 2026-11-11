import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import ToolDetail from './pages/ToolDetail';
import Prompts from './pages/Prompts';
import PromptDetail from './pages/PromptDetail';
import Agents from './pages/Agents';
import Learn from './pages/Learn';
import Submit from './pages/Submit';
import Pricing from './pages/Pricing';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools" element={<Tools />} />
        <Route path="tools/:slug" element={<ToolDetail />} />
        <Route path="prompts" element={<Prompts />} />
        <Route path="prompts/:id" element={<PromptDetail />} />
        <Route path="agents" element={<Agents />} />
        <Route path="learn" element={<Learn />} />
        <Route path="submit" element={<Submit />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
