import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SelectionButtons from './pages/SelectionButtons/SelectionButtons.tsx';
import AutoSelect from './pages/AutoSelect/AutoSelect.tsx';
import IndependentSelect from './pages/IndependentSelect/IndependentSelect.tsx';
import Battle from './pages/Battle/Battle.tsx';
import Feedback from './pages/Feedback/Feedback.tsx';
import Layout from './components/Layout/Layout.tsx';

const App: React.FC = () => (
    <Layout>
       <Routes>
        <Route
              path="/"
              element={
                <SelectionButtons
                />
              }
            />
            <Route
            path="/auto-selection"
            element={
              <AutoSelect
              />
            }
            />
            <Route
            path="/manual-selection"
            element={
              <IndependentSelect
              />
            }
          />
          <Route
            path="/battle"
            element={
              <Battle
              />
            }
          />
          <Route path="/feedback" element={<Feedback />} />
       </Routes>
       </Layout>
);
export default App;
