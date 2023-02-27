// import React from 'react';
// import '../LandingPage.css'; // import the CSS file for styling

// function LandingPage() {
//   return (
//     <div className="cont-pad">
//     <div className="landing-page">
//       <h1>Welcome to smart-todos</h1>
//       <p>Get organized and stay on top of your tasks with our simple and easy-to-use todo app.</p>
//       <button className="sign-up-btn">Sign up for free</button>
//     </div>
//     </div>
//   );
// }

// export default LandingPage;


// import React from 'react';
// import FeatureCard from './FeatureCard';
// import Screenshot from './Screenshot';
// import Demo from './Demo';
// import '../LandingPage.css';

// const LandingPage = () => {
//   const features = [
//     {
//       title: 'Intuitive task management',
//       description: 'Easily create, edit, and delete tasks with a few taps or clicks.',
//     },
//     {
//       title: 'Prioritization',
//       description: 'Assign priorities to tasks to keep track of what\'s most important.',
//     },
//     {
//       title: 'Reminders and notifications',
//       description: 'Set reminders and receive notifications so you never miss a deadline or forget a task.',
//     },
//     {
//       title: 'Collaboration',
//       description: 'Share your to-do lists with others and work together on projects.',
//     },
//     {
//       title: 'Personalization',
//       description: 'Customize your to-do lists with colors, labels, and tags to make them easier to navigate.',
//     },
//   ];

//   return (
//     <div className="cont-pad">
//     <div className="landing-page">
//       <header>
//         <h1>smart-todos</h1>
//       </header>

//       <main>
//         <section className="features">
//           <h2>Features</h2>
//           {features.map(feature => (
//             <FeatureCard title={feature.title} description={feature.description} />
//           ))}
//         </section>

//         <section className="screenshots">
//           <h2>Screenshots</h2>
//           <div className="screenshot-container">
//             <Screenshot />
            
//           </div>
//         </section>

//         <section className="demo">
//           <h2>Demo</h2>
//           <Demo />
//         </section>
//       </main>

//       <footer>
//         <p>Copyright © 2023</p>
//       </footer>
//     </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import '../LandingPage.css';



// function LandingPage() {
//   return (
//     <div className="landing-page">
//       <h1>My Todo App</h1>
//       <p>A simple app to help you stay organized and on top of your tasks.</p>
//       <h2>Features</h2>
//       <ul>
//         <li>Create and manage multiple todo lists</li>
//         <li>Add, edit, and delete tasks</li>
//         <li>Mark tasks as completed</li>
//         <li>Set due dates and reminders</li>
//       </ul>
//       <h2>Screenshots</h2>
//       <img src="screenshot-1.png" alt="Screenshot 1" />
//       <img src="screenshot-2.png" alt="Screenshot 2" />
//       <h2>Demo</h2>
//       <iframe src="https://www.youtube.com/embed/your-video-id-here" frameborder="0" allowfullscreen></iframe>
//       <p>Ready to get started? Sign up now and start organizing your tasks!</p>
//       <button className="cta-button">Sign up</button>
//     </div>
//   );
// }

// export default LandingPage;

import todoAppScreenshot from './screenshot-1.png';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="left-column">
        <h1 className="title">smart-todos</h1>
        <p className="subtitle">Get organized and boost your productivity with our simple and intuitive Todo app.</p>
        <button className="cta-button">Sign up for free</button>
      </div>
      <div className="right-column">
        <img src={todoAppScreenshot} alt="Todo app screenshot" className="screenshot" />
        <h2 className="section-heading">Features</h2>
        <ul className="feature-list">
          <li>Create and manage multiple todo lists</li>
          <li>Add, edit, and delete tasks</li>
          <li>Set due dates and receive reminders</li>
          <li>Mark tasks as complete and track progress</li>
          <li>Collaborate with others on shared lists</li>
        </ul>
      </div>
    </div>
  );
}

export default LandingPage;



// import todoAppScreenshot from './screenshot-1.png';

// function LandingPage() {
//   return (
//     <div className="landing-page">
//       <div className="left-column">
//         <h1 className="title">My Todo App</h1>
//         <p className="subtitle">Get organized and boost your productivity with our simple and intuitive Todo app.</p>
//         <button className="cta-button">Sign Up</button>
//       </div>
//       <div className="right-column">
//         <img className="screenshot" src={todoAppScreenshot} alt="Todo App Screenshot" />
//         <h2 className="section-heading">Features</h2>
//         <ul className="feature-list">
//           <li>Create, edit, and delete tasks with ease</li>
//           <li>Set priority levels and due dates for each task</li>
//           <li>View all your tasks in one convenient location</li>
//           <li>Mark tasks as complete when you're done</li>
//         </ul>
//         <h2 className="section-heading">Demo</h2>
//         <iframe width="560" height="315" src="https://www.youtube.com/embed/0Kv_KrPyIos" title="Todo App Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;


