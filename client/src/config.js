const config = {
  APP_URL: 'localhost:3002',
  GOOGLE_CLIENT_ID:
    '259953567573-610dtk0jg8gto5u29mei0o0cebkpnru7.apps.googleusercontent.com',
};

if (process.env.NODE_ENV === 'production') {
  config.APP_URL =
    'vranasclimbinggear-env.eba-ptdbsryq.us-east-1.elasticbeanstalk.com';
}

module.exports = config;
