import { Routes, Route } from 'react-router-dom';
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

import Carrers from './pages/company/Carrers';

import Privacy from './pages/legal/Privacy';
import Security from './pages/legal/Security';
import Tearms from './pages/legal/Tearms';

import Demo from './pages/product/Demo';
import Feature from './pages/product/Feature';
import Pricing from './pages/product/Pricing';
import Solution from './pages/product/Solution';

import Api from './pages/resources/Api';
import Blog from './pages/resources/Blog';
import Documentation from './pages/resources/Documentation';

import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
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

        {/* Static Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Company */}
        <Route path="/company/carrers" element={<Carrers />} />

        {/* Legal */}
        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/security" element={<Security />} />
        <Route path="/legal/tearms" element={<Tearms />} />

        {/* Product */}
        <Route path="/product/demo" element={<Demo />} />
        <Route path="/product/feature" element={<Feature />} />
        <Route path="/product/pricing" element={<Pricing />} />
        <Route path="/product/solution" element={<Solution />} />

        {/* Resources */}
        <Route path="/resources/api" element={<Api />} />
        <Route path="/resources/blog" element={<Blog />} />
        <Route path="/resources/documentation" element={<Documentation />} />
      </Routes>
    </div>
  );
};

export default App;
