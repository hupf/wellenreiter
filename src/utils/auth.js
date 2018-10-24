export function getSession() {
  const session = {
    accessToken: window.localStorage.getItem('accessToken'),
    idToken: window.localStorage.getItem('idToken'),
    expiresAt: Number(window.localStorage.getItem('expiresAt'))
  };
  return session.idToken ? session : null;
}

export function getSessionIdToken() {
  return window.localStorage.getItem('idToken');
}

export function setSession(authResult) {
  const { accessToken, idToken, expiresIn } = authResult;
  const expiresAt = expiresIn * 1000 + new Date().getTime();
  const session = {
    accessToken,
    idToken,
    expiresAt
  };

  window.localStorage.setItem('accessToken', accessToken);
  window.localStorage.setItem('idToken', idToken);
  window.localStorage.setItem('expiresAt', String(expiresAt));

  return session;
}

export function clearSession() {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('idToken');
  window.localStorage.removeItem('expiresAt');
}
