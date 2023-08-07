
export default function randomiseArray(arr=[], count=0) {
  let tempArray = arr.slice(0);
  let randomArray = [];
  //let loopCount = 0;
  while(count-- > 0) {
    //loopCount++;
    // when we reach the last element in tempArray
    if(tempArray.length === 1) {
      randomArray.push(tempArray.pop());
      break;
    }
    // if randon index is last index, retry
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * tempArray.length)
    } while (randomIndex === tempArray.length - 1 )

    let randomItem = tempArray[randomIndex];
    tempArray[randomIndex] = tempArray.pop();
    randomArray.push(randomItem);
    //console.log({ loopCount, randomIndex, randomItem, tempArray, randomArray, tempLength: tempArray.length });
  };
  //console.log('final',  { tempArray, randomArray});
  return randomArray;
};

