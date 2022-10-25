export function registerWithEmail() {
  const user = {
    currentUser: {
      uid: "gEQj2U6nJcOKWDyb3L8Kmo9TPtH2",
      email: "gamba@gamil.com",
    },
  };
  return Promise.resolve(user);
}

export function loginWithEmail() {
  return Promise.resolve();
}

export function signInWithGoogle() {
  return Promise.resolve();
}
