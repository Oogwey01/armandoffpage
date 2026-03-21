import type { TabId } from "@/lib/types";

interface Tab {
  id: TabId;
  label: string;
}

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  tabs: Tab[];
}

export default function TabNavigation({ activeTab, onTabChange, tabs }: TabNavigationProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-shrink-0 whitespace-nowrap px-5 py-3 rounded-full font-montserrat text-sm font-semibold
            transition-all duration-300 min-h-[44px] cursor-pointer
            ${
              activeTab === tab.id
                ? "bg-brand-beige text-brand-black"
                : "bg-transparent border border-white/20 text-white/60 hover:border-brand-beige/50 hover:text-white"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
