const uploader = async (data) => {
  //upload image
  //generate link
  const link = await getlink(data);
  //return link
  return link;
};
const getlink = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${data}@example.com`);
    }, 1000);
  });
};

module.exports = uploader;
