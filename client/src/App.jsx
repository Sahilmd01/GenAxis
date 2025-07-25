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

        {/* New Static Routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
