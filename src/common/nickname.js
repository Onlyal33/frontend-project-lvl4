import React from 'react';
import faker from 'faker';
import Cookies from 'js-cookie';

export const getNickname = () => {
  const nickname = Cookies.get('nickname');
  if (nickname) {
    return nickname;
  }
  const newNickname = faker.internet.userName();
  Cookies.set('nickname', newNickname);
  return newNickname;
};

const NicknameContext = React.createContext();

export default NicknameContext;
