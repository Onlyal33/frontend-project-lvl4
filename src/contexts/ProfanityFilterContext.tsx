import profanityFilter from 'leo-profanity';
import { ReactNode, createContext, useContext } from 'react';

const ProfanityFilterContext = createContext<typeof profanityFilter | null>(
  null,
);

export const useProfanityFilter = () => useContext(ProfanityFilterContext);

const ProfanityFilterProvider = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dict = profanityFilter.getDictionary('ru');
  profanityFilter.add(dict);

  return (
    <ProfanityFilterContext.Provider value={profanityFilter}>
      {children}
    </ProfanityFilterContext.Provider>
  );
};

export default ProfanityFilterProvider;
