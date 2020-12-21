export const thousandSeparator = (text) => {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const rupiahCoverter = (text) => {
  return "Rp" + text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
