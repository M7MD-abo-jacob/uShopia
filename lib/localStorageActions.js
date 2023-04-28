export const getLocalStorage = (item) => {
  const storageItem = localStorage.getItem(item);
  return storageItem;
};

export const setLocalStorage = (item, value) => {
  localStorage.setItem(item, value);
};
