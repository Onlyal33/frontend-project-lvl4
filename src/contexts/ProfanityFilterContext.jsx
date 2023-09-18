import profanityFilter from 'leo-profanity';
import { createContext, useContext } from 'react';

const ProfanityFilterContext = createContext();

export const useProfanityFilter = useContext(ProfanityFilterContext);

const ProfanityFilterProvider = ({ children }) => {
  profanityFilter.add(profanityFilter.getDictionary('ru'));

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ProfanityFilterContext.Provider value={profanityFilter}>
      {children}
    </ProfanityFilterContext.Provider>
  );
};

export default ProfanityFilterProvider;
