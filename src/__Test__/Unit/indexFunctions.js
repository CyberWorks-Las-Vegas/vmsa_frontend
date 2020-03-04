// test function that returns array of same msgs at different indexs.
function boshoka(msg, repeat) {
  let msgArray = [];
  for (let i = 1; i <= repeat; i++) {
    msgArray.push(msg);
  }
  return msgArray;
}

export default boshoka;
