import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/helpers";

type Tab = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  href?: string;
  disabled?: boolean;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (val: string) => void;
  layout?: "horizontal" | "vertical" | "full-width";
};

export function Tabs({
  tabs,
  value,
  onChange,
  layout = "horizontal",
}: TabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const active = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-value="${value}"]`
    );
    if (active) {
      const rect = active.getBoundingClientRect();

      setIndicatorStyle(
        layout === "vertical"
          ? { top: active.offsetTop, height: rect.height }
          : { left: active.offsetLeft, width: rect.width }
      );
    }
  }, [value, layout]);

  const isVertical = layout === "vertical";

  return (
    <div
      className={cn("relative", isVertical ? "flex flex-col" : "flex")}
      ref={containerRef}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        const baseClass = cn(
          "relative px-4 py-2 text-sm font-medium cursor-pointer transition-colors",
          isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500",
          tab.disabled && "cursor-not-allowed opacity-50"
        );

        const content = (
          <>
            {tab.icon && <span className="mr-2 inline-block">{tab.icon}</span>}
            {tab.label}
          </>
        );

        return tab.href ? (
          <a
            key={tab.value}
            href={tab.href}
            data-value={tab.value}
            className={baseClass}
            aria-disabled={tab.disabled}
          >
            {content}
          </a>
        ) : (
          <button
            key={tab.value}
            type="button"
            disabled={tab.disabled}
            data-value={tab.value}
            onClick={() => !tab.disabled && onChange(tab.value)}
            className={baseClass}
          >
            {content}
          </button>
        );
      })}

      <span
        className={cn(
          "absolute bg-blue-600 transition-all duration-300",
          isVertical ? "left-0 w-1 rounded-r" : "bottom-0 h-0.5 rounded-t"
        )}
        style={indicatorStyle}
      />
    </div>
  );
}

//   import { useState } from 'react';
//   import { CustomTabs } from './components/CustomTabs';
//   import { Home, User, Settings } from 'lucide-react';

//   const tabs = [
//     { label: 'Home', value: 'home', icon: <Home /> },
//     { label: 'Profile', value: 'profile', icon: <User /> },
//     { label: 'Settings', value: 'settings', icon: <Settings />, disabled: true },
//   ];

//   export default function App() {
//     const [active, setActive] = useState('home');

//     return (
//       <div className="p-6">
//         <CustomTabs
//           tabs={tabs}
//           value={active}
//           onChange={setActive}
//           layout="horizontal" // or 'vertical' / 'full-width'
//         />
//         <div className="mt-6 text-gray-700">Current tab: {active}</div>
//       </div>
//     );
//   }


// import { Tabs } from './Tabs';
// import { TabPanel } from './TabPanel';

// export default function Demo() {
//   return (
//     <Tabs defaultValue="profile">
//       <TabPanel value="profile" label="Profile">
//         <p>This is your profile tab content.</p>
//       </TabPanel>
//       <TabPanel value="settings" label="Settings">
//         <p>Settings tab content goes here.</p>
//       </TabPanel>
//       <TabPanel value="notifications" label="Notifications">
//         <p>Notifications tab content.</p>
//       </TabPanel>
//     </Tabs>
//   );
// }
