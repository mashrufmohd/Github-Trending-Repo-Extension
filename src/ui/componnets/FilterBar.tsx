import { VSCodeDropdown, VSCodeOption } from '@vscode/webview-ui-toolkit/react';

interface FilterBarProps {
  setLanguage: (lang: string) => void;
  setTimeframe: (time: 'daily' | 'weekly' | 'monthly') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ setLanguage, setTimeframe }) => {
  return (
    <div className="flex gap-4 mb-6">
      <VSCodeDropdown onChange={(e: any) => setLanguage(e.target.value)}>
        <VSCodeOption value="">All Languages</VSCodeOption>
        <VSCodeOption value="javascript">JavaScript</VSCodeOption>
        <VSCodeOption value="python">Python</VSCodeOption>
        <VSCodeOption value="typescript">TypeScript</VSCodeOption>
      </VSCodeDropdown>
      <VSCodeDropdown onChange={(e: any) => setTimeframe(e.target.value as 'daily' | 'weekly' | 'monthly')}>
        <VSCodeOption value="daily">Daily</VSCodeOption>
        <VSCodeOption value="weekly">Weekly</VSCodeOption>
        <VSCodeOption value="monthly">Monthly</VSCodeOption>
      </VSCodeDropdown>
    </div>
  );
};

export default FilterBar;