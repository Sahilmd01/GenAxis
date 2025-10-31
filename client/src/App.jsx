import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import HelpButton from './components/HelpButton';

// Pages
import Home from './pages/Home';
import Layout from './pages/Layout';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import Dashboard from './pages/Dashboard';
import GenerateImages from './pages/GenerateImages';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import Community from './pages/Community';
import About from './pages/About';
import Contact from './pages/Contact';

// Legal
import Privacy from './pages/legal/Privacy';
import Security from './pages/legal/Security';
import Terms from './pages/legal/Terms';

// Product
import Demo from './pages/product/Demo';
import Feature from './pages/product/Feature';
import Pricing from './pages/product/Pricing';

// Resources
import Api from './pages/resources/Api';
import Documentation from './pages/resources/Documentation';

// Feedback
import Feedback from './pages/Feedback';

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        {/* Main Route */}
        <Route path="/" element={<Home />} />

        {/* AI Tools under /ai layout */}
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>

        {/* Static Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Legal Pages */}
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/security" element={<Security />} />
        <Route path="/legal/terms" element={<Terms />} />

        {/* Product Pages */}
        <Route path="/product/demo" element={<Demo />} />
        <Route path="/product/feature" element={<Feature />} />
        <Route path="/product/pricing" element={<Pricing />} />

        {/* Resources Pages */}
        <Route path="/resources/api" element={<Api />} />
        <Route path="/resources/documentation" element={<Documentation />} />

        {/* Feedback Page */}
        <Route path="/feedback" element={<Feedback />} />
      </Routes>

      {/* Add Vercel Analytics*/}
      <Analytics />
      <HelpButton />
    </div>
  );
};

export default App;
