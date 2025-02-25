import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import DataReport from './pages/DataReport';
import DataTableDetails from './pages/DataReportDetails';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DataReport />} />
          <Route path="/dataDetails" element={<DataTableDetails />} />
        </Route>
      </Routes>
    </Router>
);
