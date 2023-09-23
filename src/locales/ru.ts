export default {
  translation: {
    tooltip: {
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      message: 'Введите сообщение...',
    },
    login: {
      header: 'Войти',
      button: 'Войти',
      redirectText: 'Нет аккаунта? ',
      redirectLink: 'Регистрация',
    },
    signup: {
      header: 'Регистрация',
      button: 'Зарегистрироваться',
    },
    main: {
      button: {
        logout: 'Выйти',
        send: 'Отправить',
        add: '+',
        rename: 'Переименовать',
        remove: 'Удалить',
      },
      channels: 'Каналы',
      messages: {
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
    },
    modal: {
      header: {
        add: 'Добавить канал',
        rename: 'Переименовать канал',
        remove: 'Удалить канал',
      },
      button: {
        cancel: 'Отменить',
        submit: 'Отправить',
      },
      removeText1: 'Вы действительно хотите удалить канал ',
      removeText2: '?',
    },
    toast: {
      channel: {
        newChannel: 'Канал создан',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удален',
      },
    },
    validation: {
      required: 'Обязательное поле',
      match: 'Пароли должны совпадать',
      exist: 'Такой канал уже существует',
      length: {
        login: 'От 3 до 20 символов',
        password: 'Не менее 6 символов',
      },
    },
    notFound: {
      header: 'Страница не найдена',
      message: 'Но вы можете перейти ',
      linkText: 'на главную страницу',
    },
    errors: {
      unknown: 'Неизвестная ошибка',
      network: 'Ошибка соединения',
      userExists: 'Такой пользователь уже существует',
      incorrectCredentials: 'Неверные имя пользователя или пароль',
    },
  },
};
