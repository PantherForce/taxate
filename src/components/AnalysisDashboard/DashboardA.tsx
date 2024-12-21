// @ts-nocheck
// 
import React, { useState } from 'react';
import AnalysisDashboard from './AnalysisDashbaord';
import MentalHealth from './MentalHealth';
import User from './User';

interface SidebarItem {
  id: number;
  title: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 1, title: 'Dashboard' },
  { id: 2, title: 'Meantal health' },
  { id: 3, title: 'Users' },
  { id: 4, title: 'Settings' },
];

const DashboardA: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<SidebarItem | null>(null);

  const renderContent = () => {
    if (!selectedItem) {
      return <AnalysisDashboard/>;
    }

    switch (selectedItem.id) {
      case 1:
        return <AnalysisDashboard/>;
      case 2:
        return <MentalHealth/>;
      case 3:
        return <User/>;
      case 4:
        return <div className="p-10 text-xl">Settings page content goes here.</div>;
      default:
        return <div className="text-center p-10 text-xl">Invalid option.</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-primary text-white p-4">
        <h2 className="text-2xl font-bold mb-8 text-left"> Analytics Dashboard</h2>
        <ul className='flex flex-col gap-3'>
          {sidebarItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer  py-2 px-4 rounded-md ${
                selectedItem?.id === item.id ? 'bg-[#F4F1E6] text-black' : ''
              }`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 h-full overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardA;
