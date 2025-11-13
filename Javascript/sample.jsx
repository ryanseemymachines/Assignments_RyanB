import React, { useState, useEffect, Component } from 'react';

// Header Component (Functional)
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">My Tech Blog</h1>
        <nav className="navbar">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

// Footer Component (Functional)
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2025 My Tech Blog. All rights reserved.</p>
        <p>Built with React | Follow us on social media</p>
      </div>
    </footer>
  );
};

// Blog Titles Horizontal Scroll (Functional)
const BlogTitlesScroll = ({ posts, onSelectPost, selectedPostId }) => {
  return (
    <section className="titles-scroll-section">
      <div className="titles-scroll-container">
        {posts.map(post => (
          <div
            key={post.id}
            className={`title-card ${selectedPostId === post.id ? 'active' : ''}`}
            onClick={() => onSelectPost(post.id)}
          >
            <h3>{post.title}</h3>
            <span className="author-small">By {post.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// BlogPost Component (Class)
class BlogPost extends Component {
  componentDidMount() {
    console.log(`BlogPost "${this.props.title}" has been mounted`);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      console.log(`BlogPost has been updated from "${prevProps.title}" to "${this.props.title}"`);
    }
  }

  render() {
    const { title, author, date, content } = this.props;
    return (
      <article className="blog-post">
        <h2 className="post-title">{title}</h2>
        <div className="post-meta">
          <span className="author">By {author}</span>
          <span className="date">{date}</span>
        </div>
        <p className="post-content">{content}</p>
      </article>
    );
  }
}

// Modal Component (Functional)
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

// NewPostForm Component (Functional)
const NewPostForm = ({ onAddPost, onClose }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title && author && content) {
      onAddPost({
        id: Date.now(),
        title,
        author,
        date: new Date().toLocaleDateString(),
        content
      });
      setTitle('');
      setAuthor('');
      setContent('');
      onClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="new-post-form">
      <h2>Create New Post</h2>
      <div className="form-wrapper">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog post content here..."
            rows="6"
          />
        </div>
        <div className="form-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={handleSubmit} className="submit-btn">Publish Post</button>
        </div>
      </div>
    </div>
  );
};

// PostList Component (Functional)
const PostList = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      author: "John Doe",
      date: "2025-11-10",
      content: "React is a powerful JavaScript library for building user interfaces. It allows developers to create reusable components and manage application state efficiently. In this post, we'll explore the fundamentals of React and why it has become so popular in modern web development. React's component-based architecture makes it easy to build complex UIs from simple, isolated pieces of code. Each component manages its own state and can be composed together to create sophisticated applications."
    },
    {
      id: 2,
      title: "Understanding JavaScript Promises",
      author: "Jane Smith",
      date: "2025-11-08",
      content: "Promises are essential for handling asynchronous operations in JavaScript. They provide a cleaner alternative to callbacks and make code more readable. Learn how to use .then(), .catch(), and async/await to write better asynchronous code. Promises represent the eventual completion or failure of an asynchronous operation and allow you to attach callbacks to handle success or error cases. Modern JavaScript heavily relies on Promises for operations like fetching data from APIs, reading files, or any task that takes time to complete."
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      author: "Mike Johnson",
      date: "2025-11-05",
      content: "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Grid is ideal for two-dimensional layouts, while Flexbox excels at one-dimensional arrangements. Understanding when to use each will make you a better front-end developer. CSS Grid allows you to create complex layouts with rows and columns, making it perfect for page-level layout design. Flexbox, on the other hand, is great for distributing space within a single dimension and aligning items within a container."
    },
    {
      id: 4,
      title: "Node.js Best Practices",
      author: "Sarah Williams",
      date: "2025-11-03",
      content: "Node.js has revolutionized server-side JavaScript development. In this comprehensive guide, we'll explore best practices for building scalable and maintainable Node.js applications. From proper error handling to security considerations, we'll cover everything you need to know to become a proficient Node.js developer. Learn about middleware patterns, database integration, and how to structure your application for maximum efficiency."
    },
    {
      id: 5,
      title: "TypeScript in 2025",
      author: "David Chen",
      date: "2025-11-01",
      content: "TypeScript continues to gain popularity among JavaScript developers. This post explores the latest features and why TypeScript has become the go-to choice for large-scale applications. We'll dive into advanced types, generics, and how TypeScript can help you catch bugs before they reach production. Discover how type safety can improve your development workflow and make your code more maintainable and self-documenting."
    }
  ]);

  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setSelectedPostId(newPost.id);
  };

  const selectedPost = posts.find(post => post.id === selectedPostId);

  return (
    <div className="app">
      <Header />
      <BlogTitlesScroll 
        posts={posts} 
        onSelectPost={setSelectedPostId}
        selectedPostId={selectedPostId}
      />
      
      <main className="main-content">
        <div className="container">
          <button 
            className="create-blog-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Create Blog
          </button>

          {selectedPost && (
            <div className="selected-post-container">
              <BlogPost
                key={selectedPost.id}
                title={selectedPost.title}
                author={selectedPost.author}
                date={selectedPost.date}
                content={selectedPost.content}
              />
            </div>
          )}
        </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewPostForm 
          onAddPost={handleAddPost}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <Footer />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
        }

        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .header {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 1.5rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .navbar {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #555;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #667eea;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background: #667eea;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .titles-scroll-section {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 1.5rem 0;
          position: sticky;
          top: 88px;
          z-index: 90;
        }

        .titles-scroll-container {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          padding: 0 20px 0.5rem;
          scroll-behavior: smooth;
        }

        .titles-scroll-container::-webkit-scrollbar {
          height: 8px;
        }

        .titles-scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .titles-scroll-container::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
        }

        .title-card {
          min-width: 280px;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .title-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          border-color: #667eea;
        }

        .title-card.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .title-card h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .title-card.active h3 {
          color: white;
        }

        .author-small {
          font-size: 0.85rem;
          color: #777;
        }

        .title-card.active .author-small {
          color: rgba(255, 255, 255, 0.9);
        }

        .main-content {
          flex: 1;
          padding: 2rem 0;
        }

        .create-blog-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          margin-bottom: 2rem;
          display: block;
          margin-left: auto;
        }

        .create-blog-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .selected-post-container {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .blog-post {
          background: white;
          padding: 3rem;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .post-title {
          color: #333;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .post-meta {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #f0f0f0;
          color: #777;
          font-size: 0.95rem;
        }

        .author::before {
          content: '👤 ';
        }

        .date::before {
          content: '📅 ';
        }

        .post-content {
          color: #555;
          line-height: 1.9;
          font-size: 1.1rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeInOverlay 0.3s ease;
        }

        @keyframes fadeInOverlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #999;
          transition: all 0.3s ease;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: #f0f0f0;
          color: #333;
          transform: rotate(90deg);
        }

        .new-post-form {
          padding: 2rem;
        }

        .new-post-form h2 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          padding-right: 2rem;
        }

        .form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #555;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.8rem;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        .cancel-btn {
          background: #f0f0f0;
          color: #555;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #e0e0e0;
        }

        .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .footer {
          background: rgba(255, 255, 255, 0.98);
          padding: 2rem 0;
          text-align: center;
          color: #555;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
        }

        .footer p {
          margin: 0.5rem 0;
        }

        @media (max-width: 768px) {
          .header .container {
            flex-direction: column;
            gap: 1rem;
          }

          .navbar {
            gap: 1rem;
          }

          .logo {
            font-size: 1.5rem;
          }

          .post-title {
            font-size: 2rem;
          }

          .blog-post {
            padding: 2rem;
          }

          .title-card {
            min-width: 220px;
          }

          .titles-scroll-section {
            top: 110px;
          }
        }
      `}</style>
    </div>
  );
};

export default PostList;
