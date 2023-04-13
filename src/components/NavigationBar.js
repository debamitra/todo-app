import { useState } from 'react';
import './NavigationBar.css';

function NavigationBar({selectedTab, handleTabClick}) {
  const [activeTab, setActiveTab] = useState('All');

  




  const handleClick = (tab) => {
    setActiveTab(tab);
    // Perform some logic here based on the selected tab
  };

  return (
    <div className="navigation-bar">
      <div className={`nav-tab ${selectedTab === 'All' ? 'active' : ''}`} onClick={() => handleTabClick('All')}>
        All
      </div>
      <div className={`nav-tab ${selectedTab === 'Pending' ? 'active' : ''}`} onClick={() => handleTabClick('Pending')}>
        Pending
      </div>
      <div className={`nav-tab ${selectedTab === 'Completed' ? 'active' : ''}`} onClick={() => handleTabClick('Completed')}>
        Completed
      </div>
    </div>
  );
}

export default NavigationBar
