import { create } from 'zustand';

type Actions = {
  updateCountry: (d?: string) => void;
};

type Store = {
  country: string;
  actions: Actions;
};

export const useCountryInsightsStore = create<Store>(set => ({
  country: 'Albania',
  actions: {
    updateCountry: (d = 'Albania') => set({ country: d }),
  },
}));

export const useCountry = () => useCountryInsightsStore(s => s.country);

export const useCountryInsightsActions = () =>
  useCountryInsightsStore(s => s.actions);
