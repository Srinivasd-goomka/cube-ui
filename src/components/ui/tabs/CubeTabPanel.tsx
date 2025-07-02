type TabPanelProps = {
    value: string;
    label: string;
    children: React.ReactNode;
    isActive?: boolean;
  };
  
  export function CubeTabPanel({ children, isActive }: TabPanelProps) {
    if (!isActive) return null;
    return <div>{children}</div>;
  }
  