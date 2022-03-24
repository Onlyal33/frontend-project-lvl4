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
      errors: {
        incorrect: 'the username or password is incorrect',
      },
    },
    signup: {
      header: 'Registration',
      button: 'Sign up',
      errors: {
        userExists: 'User already exists',
      },
    },
    messages: {
      errors: {
        noNetwork: 'No network',
      },
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
      errors: {
        noNetwork: 'No network',
      },
    },
    toast: {
      channel: {
        add: 'Channel added',
        rename: 'Channel renamed',
        remove: 'Channel removed',
      },
    },
    validation: {
      required: 'Please enter some text here',
      match: 'Passwords must match',
      exist: 'Channel already exists',
      length: {
        login: 'From 3 to 20 characters',
        password: 'From 6 characters',
      },
    },
  },
};
