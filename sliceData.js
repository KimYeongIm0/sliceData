let dummyData = []
let temporyBook = []


async function getData() {
    await Promise.all([
      axios.post('url1', {params}),
      axios.post('url2', {params})
    ]).then((res) => {
        //res의 totalCount는 서버에서 내려주는 총 개수
      totalCount = res[0].data.data.totalCount + res[1].data.data.totalCount;
      let first = [];
      first.push(...res[0].data.data.data, ...res[1].data.data.data)
      let total = first.length + temporyBook.length
      //20개 이하일 시
      if (totalCount <= 20) {
        Array.prototype.push.apply(dummyData, first);
      }
      //20개 이상이고 처음 로딩시 || api값 중 하나만에만 값이 있을 경우 
      else if (totalCount > 20 && temporyBook.length == 0) {
        let sliceData = first.slice(0, 20)
        temporyBook = first.slice(20, first.length)
        Array.prototype.push.apply(dummyData, sliceData);
      }
      //다음 로딩
      else if(temporyBook.length !== 0 && totalCount !== dummyData.length){
        let temp = [];
        temp.push(...temporyBook, ...first)
        let sliceData = temp.slice(0, 20)
        temporyBook = temp.slice(20, total)
        Array.prototype.push.apply(dummyData, sliceData);
      }
      //마지막 로딩이면 남아있던 데이터 모두 삽입
      else if ( totalCount === dummyData.length) {
        Array.prototype.push.apply(dummyData, this.temporyBook);
      }

    }).catch((err) => console.log(err))
  }