import { create } from 'zustand';

type Actions = {
  updateCountry: (d?: string) => void;
  updateCourtType: (d: { value: string; label: string }) => void;
};

type Store = {
  country: string;
  courtType: { value: string; label: string };
  actions: Actions;
};

export const useCountryInsightsStore = create<Store>(set => ({
  country: 'Albania',
  courtType: {
    label: 'All courts',
    value: 'total',
  },
  actions: {
    updateCountry: (d = 'Albania') => set({ country: d }),
    updateCourtType: (d: { value: string; label: string }) =>
      set({ courtType: d }),
  },
}));

export const useCountry = () => useCountryInsightsStore(s => s.country);
export const useCourtType = () => useCountryInsightsStore(s => s.courtType);

export const useCountryInsightsActions = () =>
  useCountryInsightsStore(s => s.actions);
