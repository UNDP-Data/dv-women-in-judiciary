import { create } from 'zustand';

type Actions = {
  updateTab: (d: string) => void;
  updateIndicator: (d: { value: string; label: string }) => void;
  updateCourtType: (d: { value: string; label: string }) => void;
  updateRegion: (d?: string) => void;
  updateDisaggregationType: (d: 'sex' | 'age') => void;
  updateCountries: (d?: string[]) => void;
};

type Store = {
  tab: string;
  indicator: { value: string; label: string };
  disaggregationType: string;
  courtType: { value: string; label: string };
  region?: string;
  countries?: string[];
  actions: Actions;
};

export const useDataExplorerStore = create<Store>(set => ({
  tab: 'map',
  indicator: {
    label: 'Female representation in judicial positions (%)',
    value: 'femalePercentage',
  },
  disaggregationType: 'sex',
  courtType: {
    label: 'All courts',
    value: 'total',
  },
  region: undefined,
  countries: [],
  actions: {
    updateTab: (d = 'map') => set({ tab: d }),
    updateIndicator: d => set({ indicator: d }),
    updateDisaggregationType: (d = 'sex') => set({ disaggregationType: d }),
    updateCourtType: d => set({ courtType: d }),
    updateRegion: (d?: string) => set({ region: d }),
    updateCountries: (d?: string[]) => set({ countries: d }),
  },
}));

export const useTab = () => useDataExplorerStore(s => s.tab);
export const useIndicator = () => useDataExplorerStore(s => s.indicator);
export const useDisaggregationType = () =>
  useDataExplorerStore(s => s.disaggregationType);
export const useCourtType = () => useDataExplorerStore(s => s.courtType);
export const useRegion = () => useDataExplorerStore(s => s.region);
export const useCountries = () => useDataExplorerStore(s => s.countries);

export const useDataExplorerActions = () =>
  useDataExplorerStore(s => s.actions);
