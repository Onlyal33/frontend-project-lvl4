export default {
  translation: {
    appHeader: 'Hexlet Chat',
    tooltip: {
      nickname: 'Username',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      message: 'Write your message here',
    },
    login: {
      header: 'Log in',
      button: 'Log in',
      redirectText: 'Do not have an account? ',
      redirectLink: 'Sign up',
    },
    signup: {
      header: 'Registration',
      button: 'Sign up',
    },
    main: {
      button: {
        logout: 'Log Out',
        send: 'Send',
        add: '+',
        rename: 'Rename',
        remove: 'Remove',
      },
      channels: 'Channels',
      messages: {
        key_one: '{{count}} message',
        key_other: '{{count}} messages',
      },
    },
    modal: {
      header: {
        add: 'Add Channel',
        rename: 'Rename Channel',
        remove: 'Remove Channel',
      },
      button: {
        cancel: 'Cancel',
        submit: 'Submit',
      },
      removeText1: 'Do you really want to remove channel ',
      removeText2: '?',
    },
    toast: {
      channel: {
        newChannel: 'Channel created',
        renameChannel: 'Channel renamed',
        removeChannel: 'Channel removed',
      },
    },
    validation: {
      required: 'Please enter some text here',
      match: 'Passwords must match',
      exist: 'Channel already exists',
      length: {
        login: 'From 3 to 20 characters',
        password: 'At least 6 characters',
      },
    },
    notFound: {
      header: 'Page not found',
      message: 'You can go ',
      linkText: 'to the main page',
    },
    errors: {
      unknown: 'Unknown error',
      network: 'Network error',
      userExists: 'User already exists',
      incorrectCredentials: 'The username or password is incorrect',
    },
  },
};
