
let originData = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 240,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];


const cardList = document.querySelector('#card-list');
const resultCount = document.querySelector('#result-count');
const resultSort = document.querySelector('#result-sort'); 
const btn = document.querySelector('#btn');
const name = document.querySelector('#name');
const area = document.querySelector('#area');
const imgUrl = document.querySelector('#imgUrl');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const rate = document.querySelector('#rate');
const group =document.querySelector('#group');

// 渲染畫面
const renderData = (data) =>{
  let str = "";
  if ( data.length === 0) {
    str += `<div>
              <h3 class="text-3xl text-primary font-bold text-center pb-10">查無此關鍵字資料</h3>
              <img class="max-h-[400px]" src="https://github.com/hexschool/2022-web-layout-training/blob/main/js_week5/no_found.png?raw=true" alt="">
            </div>`
  } else {

    data.forEach(item=>{
      str += 
      `<div class="px-1 w-full md:w-1/2 md:px-2 lg:w-1/3 lg:px-4  ">
            <div class="rounded border-solid shadow-md mb-9 ">
              <div class="relative">
                <a class="block overflow-hidden h-48 object-cover" href="#" alt="">
                  <img class=" duration-300 hover:scale-110 " src="${item.imgUrl}" alt="${item.name}">
                </a>
                <div class="absolute -top-3 px-5 py-2 bg-[#64C3BF] rounded-md">${item.area}</div>
                <div class="absolute -bottom-4 px-5 py-2 bg-primary rounded-md">${item.rate}</div>
              </div>
              <div class="mt-5 px-5">
                <h3 class="pb-1 text-2xl text-primary font-bold border-transparent border-b-primary border-2 mb-4">${item.name}</h3>
                <p class="text-secondary mb-8">${item.description}</p>
                <div class="flex justify-between items-center pb-4">
                  <p class="text-primary font-bold">
                    <span class="mr-1.5"><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 ${item.group} 組</p>
                  <p class="text-primary font-bold flex items-center "> 
                    <span class="mr-1">TWD</span>
                    <span class="text-3xl">$${item.price}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>`
    })
  }
  cardList.innerHTML = str;
  
}

// 渲染總共資料個數
const renderResultCount = (data) =>{
  let str = "";
  str += `<p class="text-secondary">本次搜尋共 ${data.length} 筆資料</p>`
  resultCount.innerHTML = str;
}

// 新增資料
const addData = (e) =>{
  e.preventDefault();
  let newdata = {
    id: Date.now(),
    name: name.value,
    area: area.value,
    imgUrl: imgUrl.value,
    description: description.value,
    price: price.value,
    rate: rate.value,
    group: group.value
  }
  isDataValid(newdata);
}

// 檢查資料是否正確
const isDataValid = (data) =>{
  if (data.name === '' || data.area=== '請選擇景點地區' || data.imgUrl=== '' ||
  data.description === '' || data.price === '' || data.rate === '' || data.group === '') {
    Swal.fire({
      icon: 'error',
      title: '請輸入完整資料',
    })
  } else {
    originData.push(data);
    renderData(originData);
    renderResultCount(originData);
    name.value = '';
    area.value = '請選擇景點地區';
    imgUrl.value = '';
    description.value = '';
    price.value = '';
    rate.value = '';
    group.value = '';
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '票券已新增',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

// 監聽地區選單
resultSort.addEventListener('change', (e) =>{
  const targetArea = e.target.value;
  if (targetArea === '地區搜尋') {
    return
  } else if(targetArea === '全部地區') {
    renderData(originData);
    renderResultCount(originData);
  } else {
    let newData  = [...originData].filter(item => item.area === targetArea);
    renderData(newData);
    renderResultCount(newData);
  }
})

// 監聽新增票券
btn.addEventListener('click', addData);

// 初始渲染畫面
renderData(originData);
renderResultCount(originData);
