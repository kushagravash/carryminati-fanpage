import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteFooter } from './components/SiteFooter';
import { SiteNavigation } from './components/SiteNavigation';
import { HubPage } from './pages/Hub';
import { SubmitPage } from './pages/Submit';
import { VaultPage } from './pages/Vault';

function SiteShell() {
  return (
    <>
      <SiteNavigation />
      <Routes>
        <Route path="/" element={<HubPage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SiteFooter />
    </>
  );
}

export default function App() {
  return <BrowserRouter><SiteShell /></BrowserRouter>;
}
