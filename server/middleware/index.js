const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/maker');
  }

  return next();
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }

  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

switch (process.env.NODE_ENV) {
  case 'production':
    module.exports.requiresSecure = requiresSecure;
    break;
  case 'other':
    module.exports.requiresSecure = bypassSecure;
    break;
  default:
    module.exports.requiresSecure = requiresSecure;
    break;
}
