// const child = document.getElementById('child');

// child.addEventListener('click', function handleClick(event) {
//   // 👇️ "parent"
//   console.log(event.target.parentElement.id);
// });


//Global variables
var csrftoken = getCookie("csrftoken");
var activeItem = null;
var activeElementId = null;
var returnStatus = null;
var returnStatusText = null;
var gvalue=null;
const myurl = "http://"+window.location.host+'/'


// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

window.addEventListener('onunload', function (e) {
  e.preventDefault();
  var url = myurl+'logout/';//set the url to check the authentication
  //make both invisible
  fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
  })
});

//This function displays qabrastan imagees and details in the main-area IQBAL
function qabrastan(el){
  url = myurl+'graveyard-info/'+el.innerHTML+"/";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      document.querySelector(".main-area").innerHTML=response;
    }
  };
  xhr.send();
}

//This function creates services menu when clicked on Services in the main menu
function CreateServicesMenu(e) {

  var serviceList=[]
  var attr=[]
  var url = myurl+'services-list-nav/';//set the url to get the liist of services from the db using REST API

  fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    for(var i=0; i<(data.length)-1; i++){ 
      serviceList[i]=[data[i].name,data[i].filename]
      console.log(data[i].name,data[i].id)
      // attr[i] = [`getDoc('${data[i].filename}:${data[i].id}')`,`getDoc('${data[i].filename}:${data[i].id}')`]
      attr[i] = [`getDoc('${data[i].id}')`,`getDoc('${data[i].id}')`]
      // console.log("CreateServicesMenu ",attr[i])
    }
    clearArea("nav");
    element=document.querySelector('nav')

    createList(serviceList,attr);//create list of serviices and links for onmouseover and click
    // setTimeout(delayMsg,200)
    setTimeout(scrollRight,100)
    setTimeout(scrollLeft,1000)
  

  })
  .catch((err) => console.error("error:", err));
}

//This function displays the list in the menu bar and sets the attributes of each item
function createList(list,attr=null){
  element = document.querySelector("nav");//get the parent

  topline = document.createElement("ul");//create the child
  topline.classList.add('nav-ul');//assign classes to the child
  element.appendChild(topline);//add child to the parent
  
  // for (let i = 0; i < 4; i++) {
  for (let i = 0; i < list.length; i++) {
    let listItem = document.createElement("li");
    let node = document.createTextNode(list[i][0]);//create text element to be inserted in the element of interest
    listItem.appendChild(node);//element createed and text inserted
    listItem.setAttribute('onmouseover',attr[i][0]);
    listItem.setAttribute('onclick',attr[i][0]);
    if (i+1 == list.length){
      listItem.setAttribute('id','last');
    }
    if (i == 0){
      listItem.setAttribute('id','first');
    }
    topline.appendChild(listItem);//this is where the newly created element is placed in the doc

  }
}

//This functiion creates the graveyards menu when graveyards is clicked on the main menu
function CreateGraveyardMenu(e){
  // console.log("you are in CreateGraveyardMenu",e)
    var qabrastanList=[]
    var attr=[]
    var url = myurl+'graveyard-list/';//set the url to get the list of graveyard from the db using REST API
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      // console.log("data fetched",data)
      for(var i=0; i<(data.length)-1; i++){ 
        qabrastanList[i]=[data[i].name,data[i].layout]
        attr[i]=['qabrastan(this)','qabrastan(this)']
      }
      clearArea("nav");
      // createMenuHeading("Graveyards");
      createList(qabrastanList,attr);//create list of graveyard and links for onmouseover and click
      // goHome();
      clearArea(".main-area");//clear main-area to display content
    })
    .catch((err) => console.error("error:", err));
  }

//This function creates the static heading in the menu bar for the relavent content
function createMenuHeading(heading){
  //add heading
  const hd = document.createElement("p");
  let node = document.createTextNode(heading);
  hd.classList.add('highlight');
  hd.appendChild(node);
  element = document.querySelector("nav");
  element.appendChild(hd);
}

//This function inerts the goHome link in the menu bar
function goHome(){
  const element = document.querySelector("nav");
  const sp = document.createElement("span");
  sp.classList.add('back');
 
  var a = document.createElement('a'); // Create anchor element.
  var link = document.createTextNode('Back');  // Create the text node for anchor element.
  a.appendChild(link); // Append the text node to anchor element.
  a.title = "Back";   // Set the title.
  a.href = "/index/";   // Set the href property.
  
  sp.appendChild(a);   // Append the anchor element to the body.
  element.appendChild(sp);
}

//This functtion inserts the element passed as a link with the text (txt) in the main area
//Landing page is the page that will be displayed when the link is clicked
function insertElement(context,c='e2i'){
  for (var i=0; i<context.length;i++){
    e2i=context[i].element
    txt=context[i].text
    landingPage=context[i].url
    const e = document.createElement(e2i);
    e.classList.add(c);

    var a = document.createElement('a'); // Create anchor element.
    var link = document.createTextNode(txt);  // Create the text node for anchor element.
    a.appendChild(link); // Append the text node to anchor element.
    a.title = txt;   // Set the title.
    a.href = landingPage;   // Set the href property.
    e.appendChild(a);   // Append the anchor element to the body.
    let element = document.querySelector(".main-area");
    element.appendChild(e);
  }
}

function clearArea(a){
  const e = document.querySelector(a);
  let count = e.childElementCount;
  if (!count) return;

  for (let i=0; i<count; i++){
    e.children[0].remove();
  }
  return;
}

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}



function buildGravesList() {
  var wrapper = document.getElementById('list-wrapper')
  wrapper.innerHTML = ''
  var url = myurl+'graves-list/'
  document.querySelector('#submit').innerHTML="Create"
  fetchData(url)
}

function populateCustomerList(list){
  // var url = myurl+'customer-detail/'
  var num = list.length-1; //-1 is used to account for  added info
  var wrapper = document.getElementById('list-wrapper')
  var item="";
  for (var i=0; i<num; i++) {
    var divId='g'+i;
    val = buildUpdateCustomer(list[i])
    item += `
    <div id=h${i}>
    <div id=${divId} class='tabularList'>
    ${val}
    </div>
    <hr>
    </div>`
  }
  wrapper.innerHTML +=`${item}`;
  for (var i=0; i<num; i++){
    var url2send=myurl+'customer-detail/'+list[i].id+'/';
    var editBtn = document.getElementsByClassName('edit')[i]
 
    var deleteBtn = document.getElementsByClassName('delete')[i]
  
    var arg=`editSubmitted('${url2send}','g${i}')`
    editBtn.setAttribute('onclick',arg)
  
    deleteBtn.setAttribute("onclick", arg);
    arg = `deleteCustomerItem('${list[i].id}','g${i}')`;
    deleteBtn.setAttribute('onclick',arg);
  }
}

function buildGravesList() {
  var wrapper = document.getElementById('list-wrapper')
  wrapper.innerHTML = ''
  var url = myurl+'graves-list/'
  document.querySelector('#submit').innerHTML="Create"
  fetchData(url)
}
function buildGraveyardsList() {
  var wrapper = document.getElementById('list-wrapper')
  wrapper.innerHTML = ''
  var url = myurl+'graveyard-list/'
  document.querySelector('#submit').innerHTML="Create"
  fetchData(url,{})
}

function editCustomerItem(data) {
  // {
  //   "id": 22,
  //   "firstname": "Iqbal",
  //   "lastname": "Laljiani",
  //   "email": "laljiani@yahoo.com",
  //   "mobile": "03181167755"
  // },  
      activeItem = data;
      document.getElementById("first").value = activeItem.firstname;
      document.getElementById("last").value = activeItem.lastname;
      document.getElementById("email").value = activeItem.email;
      document.getElementById("mobile").value = activeItem.mobile;
      document.querySelector("#submit").innerHTML = "Submit";
      document.getElementById("first").focus();
      document.documentElement.scroll(0,0);
}

function deleteCustomerItem(item,itemId) {
  activeElementId = itemId;
  const url = `${myurl}customer-delete/${item}/`
    const context={
      method: "DELETE",
      headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
          },
    }
    fetchData(url,context);
}


function deleteGraveyardItem(item) {
  const url = `${myurl}graveyard-delete/${item}/`
    const context={
      method: "DELETE",
      headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
          },
    }
    fetchData(url,context);
}


  
  function submitFormServices(){
    var form = document.getElementById('form-wrapper')
    var url = myurl+'services-create/'
    if (activeItem != null){
      var url = myurl+`services-update/${activeItem.id}/`
      activeItem = null
    }
    else{
      var wrapper = document.getElementById('list-wrapper')
      wrapper.innerHTML = ''
    }

    var name = document.getElementById('name').value
    var order = document.getElementById('order').value
    var filename = document.getElementById('filename').value
    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify({'name':name,'order':order, 'filename':filename})
    })
    .then(function(response){
      buildServicesList()
      document.getElementById('form').reset()
    });
 }

  function submitFormGraveyard(){
    var form = document.getElementById('form-wrapper')
    var url = myurl+'graveyard-create/'
    if (activeItem != null){
      var url = myurl+`graveyard-update/${activeItem.id}/`
      activeItem = null
    }
    else{
      var wrapper = document.getElementById('list-wrapper')
      wrapper.innerHTML = ''
    }

    var name = document.getElementById('name').value
    var layout = document.getElementById('layout').value
    // console.log("submitFormGraveyard",url)
    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
      },
      body:JSON.stringify({'name':name,'layout':layout})
    })
    .then(function(response){
      buildGraveyardsList()
      document.getElementById('form').reset()
    });
 }

  function buildServicesList(){
  
    var wrapper = document.getElementById('list-wrapper')
    wrapper.innerHTML = ''
    var url = myurl+'services-list/'
    document.querySelector('#submit').innerHTML="Create"
    fetchData(url)
  }

  function editServicesItem(data){
      activeItem = data;
      document.getElementById('name').value = activeItem.name;
      document.getElementById('order').value = activeItem.order;
      document.getElementById('filename').value = activeItem.filename;
      document.querySelector('#submit').innerHTML="Submit";
      document.getElementById("name").focus();
      option={
        top: 0,
        left: 0,
        behavior: 'smooth'
      }
      document.documentElement.scroll(option);
  }

  function editGraveyardItem(data){
    
      activeItem = data;
      console.log("editGraveyardItem",data);
      document.getElementById('name').value = activeItem.name;
      document.getElementById('layout').value = activeItem.layout;
      document.querySelector('#submit').innerHTML="Submit";
      document.getElementById('name').focus();
      document.documentElement.scroll(0,0);
      // document.body.scrollTop; 
      // window.scrollBy(0, 200);document.documentElement.scrollTop

      // console.log("document.documentElement.scrollTop", document.documentElement.scrollTop);
      
  }

  function deleteServicesItem(item){
    var url = `${myurl}services-delete/${item}/`
    const context={
      method: "DELETE",
      headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
          },
    }
    fetchData(url,context);
}

// function resetForm(){
//   document.getElementById("form").reset();
//   document.querySelector('#submit').innerHTML="Create"
// }

//This function is called once the API returns data to call the appropriate functions to oserve the data
function processResponse(data){
  //length is undefined for signle or none data Response
  if(data.length){
    const func = data[data.length-1].func;
    if  (func === "servicesList"){
      populateServicesList(data);
    }
    if  (func === "graveyardList"){
      populateGraveyardsList(data);
    }
    if  (func === "customerList"){
      populateCustomerList(data);

    }
    if  (func === "gravesList"){
      populateGravesList(data);

    }
  }  
  else {
    if  (data.func === "servicesDetail"){
      editServicesItem(data);
    }
    if  (data.func === "customerDetail"){
      editCustomerItem(data);
    }
    if  (data.func === "GraveDetail"){
      editGraveItem(data);
    }
    if (data.func === "graveyardDetail"){
      editGraveyardItem(data);
    }
    
    if (data.func === "servicesDelete"){
      buildServicesList();
    }
    if (data.func === "customerDelete"){
      const hId =  activeElementId.replace(/g/, "h");

      document.querySelector(`#${hId}`).remove();
    }
    if (data.func === "graveDelete"){
      const hId =  activeElementId.replace(/g/, "h");
      document.querySelector(`#${hId}`).remove();
    }
    
    if (data.func === "graveyardDelete"){
      buildGraveyardsList();
    }
  }
}
// This function to fetch data for GET/POST/DELETE request
function fetchData(url,context={}){
  fetch(url,context)
  .then((resp) => resp.json())
  .then(function (data) {
    processResponse(data);
  })
  
}

//This function populates all the services as a list upon response
function populateServicesList(list){
      
      var url = myurl+'services-detail/'
      var num = list.length-1; //-1 is used to account for  added info
      var wrapper = document.getElementById('list-wrapper')
      var item="";
      for (var i=0; i<num; i++) {
        sName=list[i].name
        sName=sName.trim()
        item += `
        <div class='tabularList'>
        <p class='itemTitle'>Service:</p> <p class='itemValue'>${sName}</p>
        <p class='itemTitle'>Order:</p> <p class='itemValue'>${list[i].order} </p>
        <p class='itemTitle'>File Name:</p> <p class='itemValue'>${list[i].filename}</p>
        <div class='btn-div'>
        <button class="btn  edit"> Edit</button>
        <button class="btn   delete">Delete</button>
        </div>
        </div>
        <hr>`
    }
    wrapper.innerHTML +=`${item}`
				
        for (var i=0; i<num; i++){
          const url2send=url+list[i].id+'/';
         	var editBtn = document.getElementsByClassName('edit')[i]

					var deleteBtn = document.getElementsByClassName('delete')[i]
					
					var arg='fetchData(\''+url2send+'\')'
					editBtn.setAttribute('onclick',arg)

          deleteBtn.setAttribute("onclick", arg);
          arg = 'deleteServicesItem(' + list[i].id + ')';
					deleteBtn.setAttribute('onclick',arg)
      
				}
        
}

//This function populates all the graveyards in db as a list upon response
function populateGraveyardsList(list){
  var url = myurl+'graveyard-detail/'
  var num = list.length-1; //-1 is used to account for  added info
  var wrapper = document.getElementById('list-wrapper')
  var item="";
  for (var i=0; i<num; i++) {
    item += `
    <div class='tabularList'>
    <p class='itemTitle'>Name:</p> <p class='itemValue'>${list[i].name}</p>
    <p class='itemTitle'>Layout:</p> <p class='itemValue'>${list[i].layout} </p>
    <div class='btn-div'>
    <button class="btn  edit"> Edit</button>
    <button class="btn   delete">Delete</button>
    </div>
    </div>
    <hr>`
   
}
  wrapper.innerHTML +=`${item}`
    
    for (var i=0; i<num; i++){
      const url2send=url+list[i].id+'/';
       var editBtn = document.getElementsByClassName('edit')[i]

      var deleteBtn = document.getElementsByClassName('delete')[i]
      
      var arg='fetchData(\''+url2send+'\')'
      editBtn.setAttribute('onclick',arg)

      deleteBtn.setAttribute("onclick", arg);
      arg = 'deleteGraveyardItem(' + list[i].id + ')';
      deleteBtn.setAttribute('onclick',arg)
  
    }
    
}
//This function populates all the services as a list upon response
function populateGravesList(gravesList){
//   {
//     "id": 8,
//     "graveNumber": 3000,
//     "grid": "W",
//     "distance": 3,
//     "uplink": 201,
//     "downlink": 2000,
//     "firstname": "2022-11-03 03:02:05.071228+00:00",
//     "lastname": "2022-11-03 03:02:05.105794+00:00",
//     "father": "2022-11-03 03:02:05.055224+00:00",
//     "husband": "2022-11-03 03:02:05.096704+00:00",
//     "expiryDay": null,
//     "expiryMonth": null,
//     "expiryYear": null,
//     "birthDay": null,
//     "birthMonth": null,
//     "birthYear": null,
//     "age": null,
//     "gender": "2022-11-03 03:02:05.085170+00:00",
//     "updateDate": "2022-11-03T03:02:05.114419Z",
//     "customer": 1,
//     "graveyard": 4
// },
// console.log("populateGravesList",gravesList)
  var num = gravesList.length-1; //-1 is used to account for  added info
  var urlGraveyardsList = myurl+'graveyard-list/'
  var wrapper = document.getElementById('list-wrapper');
  let item="";
  for (var i=0; i<num; i++) {
    var divId='g'+i;
    val = buildUpdateGrave(gravesList[i])
    item += `
    <div id=h${i}>
    <div id=${divId} class='tabularList4'>
    ${val}
    </div>
    <hr>
    </div>`
}
wrapper.innerHTML +=`${item}`
    
    for (var i=0; i<num; i++){
      var urlGraveDetail = myurl+'graves-detail/'
      const url2send=urlGraveDetail+gravesList[i].id+'/';
      var editBtn = document.getElementsByClassName('edit')[i]

      var deleteBtn = document.getElementsByClassName('delete')[i]
      
      var arg= `editSubmitted('${url2send}','g${i}')`
      editBtn.setAttribute('onclick',arg)

      deleteBtn.setAttribute("onclick", arg);
      arg = `deleteGraveItem('${gravesList[i].id}','h${i}')`;
      deleteBtn.setAttribute('onclick',arg)
  
    }
    buildDropdown(urlGraveyardsList,1)
    
}

function editGraveItem(gravesData) {
//   {
//   {
//     "id": 8,
//     "graveNumber": 3000,
//     "grid": "W",
//     "distance": 3,
//     "uplink": 201,
//     "downlink": 2000,
//     "firstname": "2022-11-03 03:02:05.071228+00:00",
//     "lastname": "2022-11-03 03:02:05.105794+00:00",
//     "father": "2022-11-03 03:02:05.055224+00:00",
//     "husband": "2022-11-03 03:02:05.096704+00:00",
//     "expiryDay": null,
//     "expiryMonth": null,
//     "expiryYear": null,
//     "birthDay": null,
//     "birthMonth": null,
//     "birthYear": null,
//     "age": null,
//     "gender": "2022-11-03 03:02:05.085170+00:00",
//     "updateDate": "2022-11-03T03:02:05.114419Z",
//     "customer": 1,  <----------  to pull the names of the customers
//     "graveyard": 4  <-------  to pull the names of graveyards & set it to selected
// },
  activeItem = gravesData;
  var url = myurl+'graveyard-list/'
  
  //get the customers names based on the customer field value in the data and populate the form
  var name=getCustomerName(activeItem.customer)
  document.getElementById("c-firstName").value = name[0];
  document.getElementById("c-lastName").value = name[1];
  
  //populate form fields based on the return data
  document.getElementById("graveNumber").value = activeItem.graveNumber; 
  document.getElementById("grid").value = activeItem.grid;
  document.getElementById("distance").value = activeItem.distance;
  document.getElementById("uplink").value = activeItem.uplink;
  document.getElementById("downlink").value = activeItem.downlink;
  document.getElementById("firstName").value = activeItem.firstname;
  document.getElementById("lastName").value = activeItem.lastname;
  document.getElementById("father").value = activeItem.father;
  document.getElementById("husband").value = activeItem.husband;
  document.getElementById("expiryDay").value = activeItem.expiryDay;
  document.getElementById("expiryMonth").value = activeItem.expiryMonth;
  document.getElementById("expiryYear").value = activeItem.expiryYear;
  document.getElementById("birthDay").value = activeItem.birthDay;
  document.getElementById("birthMonth").value = activeItem.birthMonth;
  document.getElementById("birthYear").value = activeItem.birthYear;
  document.getElementById("age").value = activeItem.age;
  document.getElementById("gender").value = activeItem.gender;
  // document.getElementById("updateDate").value = activeItem.updateDate;
  buildDropdown(url)
}

function buildDropdown(urlGraveyard, create=0)
{
  //get list of the graveyards for the dropdown options
  fetch(urlGraveyard)
  .then((resp) => resp.json())
  .then(function (graveyardslist) {
    var graveyardField = document.getElementById("graveyard") 
    //remove all options
    clearArea('#graveyard')
    //Create and append the options
    option = document.createElement("option");
    option.value = -1;
    option.text = 'Select Graveyard';
    graveyardField.appendChild(option);

    for (var i = 0; i < graveyardslist.length-1; i++) {
      var option = document.createElement("option");
      option.value = graveyardslist[i].id;
      option.text = graveyardslist[i].name;
      graveyardField.appendChild(option);
    }
    option = document.createElement("option");
    option.value = 0;
    option.text = 'Add New';
    graveyardField.appendChild(option);
    //set the chosen item to selected
    if (activeItem) {
      graveyardField.value = activeItem.graveyard;
    }
    if (create)
      document.querySelector("#submit").innerHTML = "Create";
    else  
      document.querySelector("#submit").innerHTML = "Submit";
    document.getElementById("c-firstName").focus()
    document.documentElement.scroll(0,0);
  })
  .catch((err) => console.error("error:", err));
}
  



function getCustomerName(number){
  let xhr = new XMLHttpRequest();
  var url = `${myurl}customer-detail/${number}`
  var name=[]
// open(method, url, async, user, password)

  xhr.open('GET', url, false);

  try {
    xhr.send();
    if (xhr.status != 200) {
    } else {
      // name=xhr.response.firstname+" "+xhr.response.lastname
      var data = JSON.parse(xhr.response)
      name[0] = data['firstname']
      name[1] = data['lastname']
      return name
    }
  } catch(err) { // instead of onerror
  }
}
function getGraveyardName(number){
  let xhr = new XMLHttpRequest();
  var url = `${myurl}graveyard-detail/${number}`
  var name=""
// open(method, url, async, user, password)
  xhr.open('GET', url, false);

  try {
    xhr.send();
    if (xhr.status != 200) {
    } else {
      // name=xhr.response.firstname+" "+xhr.response.lastname
      var data = JSON.parse(xhr.response)
      name = data['name']
      return name
    }
  } catch(err) { // instead of onerror
  }
}



function filterData(first) {
  var url = myurl+"customer-filter/";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      'filter': first,
    }),
  })
  .then((resp) => resp.json())
  .then(function (resp) {
    // var mydata = JSON.parse(response)
    console.log("returned",resp)
    console.log(resp[0].id,resp[0].firstname)
  });
}

// function filterData() {
//   xhr = new XMLHttpRequest();
//   var url = "http://127.0.0.1:8000/customer-filter/";
//   xhr.open("POST", url, true);
//   xhr.setRequestHeader("Content-type", "application/json");
//   xhr.setRequestHeader("X-CSRFToken", csrftoken); 
//   xhr.onreadystatechange = function () { 
//     if (this.readyState == 4 && this.status == 200) {
//       var mydata = JSON.parse(xhr.response)
//       console.log("returned",this.responseText)
//       console.log(mydata[0].id,mydata[0].firstname)
//     }
      
//   }
//   var data = JSON.stringify({"filter":"Na"});
//   xhr.send(data);
// }
function validateName(){
  var fname = document.getElementById('c-firstName').value;
  var lname = document.getElementById('c-lastName').value;
  const url = myurl+"customer-number/"
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({
      'firstName': fname,
      'lastName': lname,
    }),
  }) .then((resp) => resp.json())
  .then(function (resp) {
    if(resp.length)
      console.log("validatiion successful")
    else{
      context=[
        {
          'element':'h2',
          'text':'  ',
          'url':'#"',
        }, 
        {
          'element':'h2',
          'text':'The name does not exists!',
          'url':'#"',
        },
        {
          'element':'p',
          'text':'Click here to create a new name',
          'url':'/',
        },
        {
          'element':'p',
          'text':'Click here to cancel',
          'url':'/grave',
        },
      ]
      clearArea("#list-wrapper"); 
      insertElement(context)
    }
  });

}

function getDoc(fp) {
  url = myurl+`services/${fp}/`
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      document.querySelector(".main-area").innerHTML=response;
    }
  };
  xhr.send();
  // console.log("getDoc ",url)
  // fetch(url)
  // .then((resp) => resp.json())
  // .then(function (data) {
  //   data = JSON.parse(data)
  //   topline= document.querySelector('#main-section')
  //   clearArea(".main-area"); 
  //   topline.children[0].innerHTML = data.logInfo;
  //   sub_buttton = document.querySelector('#sub-button');
  //   sub_buttton.innerHTML = `  <a href="/subscribe/${data.id}">
  //   <button class="button-90" role="button">Subscribe</button>
  //   </a>`
  // })
  // .catch((err) => console.error("error:", err));
}

function extractID(url){
  var splitUrl = url.split('/')
  var savedID = splitUrl[splitUrl.length-2]
  localStorage.setItem('savedID',savedID);
  fetchData(url)
}

function getID(name){
  return localStorage.getItem('savedID');
}
function userLogging(){
  var url = myurl+'loginfo/';//set the url to check the authentication
  //make both invisible
  fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    data = JSON.parse(data)
    notLogged= document.querySelector('#notLogged')
    logged= document.querySelector('#logged')
    if (data.logInfo === 'yes'){
      logged.classList.replace('user_inactive','user_active')
      notLogged.classList.replace('user_active','user_inactive')
      document.querySelector('#user').style.display = "flex"; 
    }
    if (data.logInfo === 'no'){
      logged.classList.replace('user_active','user_inactive')
      notLogged.classList.replace('user_inactive','user_active')
      document.querySelector('#user').style.display = "none"; 
    }
  })
  .catch((err) => console.error("error:", err));
}

function editSubmitted(url=null,itemId=null){
  activeElementId = itemId;
  fetchData(url)
  return
}

function test(msg=null,head=null) {
  alert(msg)
  return

const modal = document.getElementById('modal')
 console.log("+++++++++++++++++++",modal)
  if (modal){
    var title = document.querySelector(".title")
    var body = document.querySelector(".modal-body")
    if (msg === null){
      body.innerHTML="Welcome to my dynamic modal."
      title.innerHTML="Well Done my boy!!"
    }
    else{
      body.innerHTML=msg
      title.innerHTML=head
    }
   
    openModal(modal)
  }
  else{
    alert(msg)
  }
}
function launchpad(path){
  var path_url="http://"+window.location.host+"/"+path
  alert(path_url)
  var auth_url = myurl+'loginfo';//set the url to check the authentication
  var auth_url = myurl+'loginfo';//set the url to check the authentication
  //make both invisible
  fetch(path_url)
  .then((resp) => resp.json())
  .then(function (data) {
    console.log("userLogging (",data,")")
    notLogged= document.querySelector('#notLogged')
    logged= document.querySelector('#logged')

    if (data['logInfo'] === 'yes'){
      fetch(path_url)
    }
    if (data['logInfo'] === 'no'){
      msgBody="You attempted to access restricted information."
      msgHeading="Sign up is required!"
      test(msgBody,msgHeading)
    }
  })
  .catch((err) => console.error("error:", err));
}

function launcher(e){
  let url2call = `${myurl}${e}`
  console.log("launcher is launching ",url2call)
  window.location.href = `${myurl}${e}`;
}
function toggleMobileMenu(menu){
  menu.classList.toggle('open');
  document.querySelector('nav').style.display='grid'
  // check if dropdown menu is opened.
  // if not then hide both logged and notLogged elements
  if (menu.classList.contains("open") === false){
    notLogged_m= document.querySelector('#notLogged_m')
    logged_m= document.querySelector('#logged_m')
  if (notLogged_m.classList.contains("hide") === false){
      notLogged_m.classList.toggle('hide')
    }
  if (logged_m.classList.contains("hide") === false){
      logged_m.classList.toggle('hide')
    }
 
  }
  // if the menu is opened then show logged or notLogged elements based on the login status
  else{
    document.querySelector('nav').style.display='none'
    var url = myurl+'loginfo/';//set the url to check the authentication
    //make both invisible
    fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      data = JSON.parse(data)
      notLogged_m= document.querySelector('#notLogged_m')
      logged_m= document.querySelector('#logged_m')
    
      if (data.logInfo === 'yes'){
        logged_m.classList.toggle('hide');// unhide logged_m element
      document.querySelector('#user').style.display = "flex"; 
        if (logged_m.classList.contains("mobile-menu") === false){
          logged_m.classList.toggle('mobile-menu')
        }
      }
      if (data.logInfo === 'no'){
        notLogged_m.classList.toggle('hide')
        document.querySelector('#user').style.display = "none"; 
        if (notLogged_m.classList.contains("mobile-menu") === false){
          notLogged_m.classList.toggle('mobile-menu')
        }
      }
    })
    .catch((err) => console.error("error:", err));
  }
}

function toggleMobileMenu2(menu){
  menu.classList.toggle('open');
  // check if dropdown menu is opened.
  // if not then hide both logged and notLogged elements
  botSub= document.querySelector('#botSub')
  botSub.classList.toggle('hide')
  window.scrollBy(0, 200);
  if (menu.classList.contains("open") === true){
    document.querySelector('#user').style.display = "none"; 
    let e = document.querySelector('#hamburger-icon-bottom');
    let count = e.childElementCount;
    for (let i=0; i<count; i++){
      if (e.children[i].classList.contains('bar1'))
        e.children[i].style.backgroundColor= "#333"; 
      if (e.children[i].classList.contains('bar3'))
        e.children[i].style.backgroundColor= "#333"; 
    }
  }
  else{
    let e = document.querySelector('#hamburger-icon-bottom');
    let count = e.childElementCount;
    for (let i=0; i<count; i++){
      if (e.children[i].classList.contains('bar1'))
        e.children[i].style.backgroundColor= "#fff"; 
      if (e.children[i].classList.contains('bar3'))
        e.children[i].style.backgroundColor= "#fff"; 
    }
  }
}
function delayMsg() {

  msg = '<p = class="scrollMsg">Please scroll above for more services </p>' 
  e=document.querySelector('.main-area')
  e.innerHTML=msg;
  // setTimeout(scrollRight,1000)
  // setTimeout(scrollLeft,1000)
  // showMsg(1,9,1,4,msg)
  return
}
function scrollRight(){
  elem = document.getElementById('last')
  elem.scrollIntoView();
}
function scrollLeft(){
  elem = document.getElementById('first')
  elem.scrollIntoView();
  elem.focus({focusVisible: true})
}

function resetCanvas(cs=1,ce=-2,rs=1,re=-2){
  e=document.querySelector('.main-area')
  e.style.gridColumn = `${cs} / ${ce}`;
  e.style.gridRow = `${rs} / ${re}`;

}
function showMsg(cs=1,ce=-2,rs=1,re=-2,msg){
  e=document.querySelector('.main-area')
  resetCanvas(cs,ce,rs,re);
  let c = e.innerHTML;
  msg +=c;
  e.innerHTML=msg;

}
function removeLastWord(str) {
  const lastIndexOfSpace = str.lastIndexOf(' ');

  if (lastIndexOfSpace === -1) {
    return str;
  }

  return str.substring(0, lastIndexOfSpace);
}
function pricing(element,p,flag='true'){
  p=Number(p)
  const elementId = element.id;
  var v = document.getElementById("id_amount").value;
  v = Number(v)
  console.log("v = ",v)
  const checkbox = document.getElementById(elementId);
  if (flag == 'true'){
    if (checkbox.checked) {
      v=v+p
      v=v.toFixed(2)
      document.getElementById("id_amount").value = v
    }
    else {
      v=v-p
      v=v.toFixed(2)
      document.getElementById("id_amount").value = v
    }
  }
  // if not true then do the following
  else{
    console.log("the flag is ",flag)
    const checkboxes = document.querySelectorAll('#pricingTable input[type="checkbox"]');
    console.log("the checkboxes is ",checkboxes)
    const checkedCheckboxes = [];
    check_flag = 0
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checkedCheckboxes.push(checkbox);
        check_flag = 1;
        console.log("the check_flag int the loopis ",check_flag)
      }
    });
    if (check_flag){
      v = p;
      v=v.toFixed(2);
      document.getElementById("id_amount").value = v;
      return;
    }
    else{
      v = 0;
      v=v.toFixed(2);
      console.log("the value of v is ",v)
      document.getElementById("id_amount").value = v;
    }
  }
}
