require('dotenv').config();
const env = process.env;

module.exports = {
  'development': {
    'username': env.USER_NAME,
    'password': env.PASSWORD,
    'database': env.DATABASE,
    'host': env.HOST,
    'dialect': 'mysql'
  },
  'test': {
    'username': env.USER_NAME,
    'password': env.PASSWORD,
    'database': env.DATABASE,
    'host': env.HOST,
    'dialect': 'mysql'
  },
  'production': {
    'username': env.P_USER_NAME,
    'password': env.P_PASSWORD,
    'database': env.P_DATABASE,
    'host': env.P_HOST,
    'dialect': 'mysql'
  }
};