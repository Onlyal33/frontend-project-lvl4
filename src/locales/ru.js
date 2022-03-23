export default {
  translation: {
    appHeader: 'Хекслет Чат',
    tooltip: {
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Повторите пароль',
      message: 'Введите сообщение...',
    },
    login: {
      header: 'Войти',
      button: 'Войти',
      redirectText: 'Нет аккаунта? ',
      redirectLink: 'Регистрация',
      errors: {
        incorrect: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      header: 'Регистрация',
      button: 'Зарегистрироваться',
      errors: {
        userExists: 'Такой пользователь уже существует',
      },
    },
    messages: {
      errors: {
        noNetwork: 'Нет сети',
      },
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
      errors: {
        noNetwork: 'Нет сети',
      },
    },
    toast: {
      channel: {
        add: 'Канал создан',
        rename: 'Канал переименован',
        remove: 'Канал удален',
      },
    },
    validation: {
      required: 'Обязательное поле',
      match: 'Пароли должны совпадать',
      exist: 'Такой канал уже существует',
      length: {
        login: 'От 3 до 20 символов',
        password: 'От 6 символов',
      },
    },
  },
};
