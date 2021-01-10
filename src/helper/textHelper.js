export const thousandSeparator = (text) => {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const rupiahCoverter = (text) => {
  if (text == null) {
    return 0;
  } else {
    return "Rp" + text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};
