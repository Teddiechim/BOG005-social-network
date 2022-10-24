export function saveData() {
  return Promise.resolve();
}

export function getPosts() {
  return Promise.resolve([
    {
      data: () => {
        return {
          title: X,
          description: A,
        };
      },
    },
  ]);
}
