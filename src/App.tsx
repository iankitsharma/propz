import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { Requirements } from './pages/Requirements';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Dashboard } from './pages/Dashboard';
import { PropertyDetail } from './pages/PropertyDetail';
import { Analytics } from './pages/Analytics';
import { PostProperty } from './pages/PostProperty';
import { PostRequirement } from './pages/PostRequirement';
import { MyListings } from './pages/MyListings';
import { EditProperty } from './pages/EditProperty';
import { EditRequirement } from './pages/EditRequirement';
import { useRequirementStore } from './store/requirementStore';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { HowItWorks } from './pages/HowItWorks';
import { Pricing } from './pages/Pricing';
import { Help } from './pages/Help';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/post-property" element={<PostProperty />} />
          <Route path="/post-requirement" element={<PostRequirement />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/edit-property/:id" element={<EditProperty />} />
          <Route path="/edit-requirement/:id" element={<EditRequirement />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;