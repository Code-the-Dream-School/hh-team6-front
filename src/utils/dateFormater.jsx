const dateFormater = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};

export default dateFormater;