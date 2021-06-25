const mainBody = document.getElementById('main-body');

setTitle("Welcome","This page is helps you to manage your activities for the day or a project effectively");
mainBody.innerHTML  = welcomeHtml;
mainBody.innerHTML += sectionNotification;
mainBody.innerHTML += sectionLogin;
mainBody.innerHTML += sectionSignup;
mainBody.innerHTML += sectionAccount;
mainBody.innerHTML += sectionEditAccount;
mainBody.innerHTML += sectionDashboard;
mainBody.innerHTML += sectionAddTodo;
mainBody.innerHTML += sectionEditTodo;


//Login Button clicked
document.getElementById("btnLogin").addEventListener('click', loginClicked);

//Login Link clicked
document.getElementById("linkLogin").addEventListener('click', loginClicked);

//Login form Submited
document.getElementById("frmLogin").addEventListener('submit', loginUser); 

//Signup Button clicked
document.getElementById("btnSignup").addEventListener('click', signUpClicked);

//Signup Link clicked
document.getElementById("linkSignup").addEventListener('click', signUpClicked);

//Signup form Submited
document.getElementById("frmSignup").addEventListener('submit', createUser);  

//Signup Link clicked
document.getElementById("btnAcctSettings").addEventListener('click', acctSettingsClicked);

//frmEditAcct form Submited
document.getElementById("frmEditAcct").addEventListener('submit', updateUser);  

//Create ne todo clicked
document.getElementById("btnCreateTodo").addEventListener('click', createTodoClicked);

let backBtns = document.getElementsByClassName("btnBackToDash");  
for (i = 0; i < backBtns.length; i++) {
	backBtns[i].addEventListener('click', backToShowDash);
}

// Click on a close button to hide the current list item


//frmAddTodo form Submited
document.getElementById("frmAddTodo").addEventListener('submit', createTodo);

//frmEditTodo form Submited
document.getElementById("frmEditTodo").addEventListener('submit', editTodo);  


//Set Globals
let users 		= new Array();
let toDo 		= new Array();
let toDos 		= new Array();
let login_user 	= null;



getStoredData();

function setTitle(e,d){
    document.title="To Do List: " + e;
    if((typeof d !== 'undefined')){
      document.description = d;  
    }
}
function getStoredData(){
	users = JSON.parse(localStorage.all_users) || [];
	toDo  = localStorage.all_todo ? JSON.parse(localStorage.all_todo) : [];
	toDos = localStorage.all_todos? JSON.parse(localStorage.all_todos) : [];
	
}

function createTodoClicked(e){
	e.preventDefault();
	hideAllSections(); //Hide all Elements
    setTitle("Create ToDo List"); //change page Title/discription meta
	document.getElementById("sectionAddTodo").style.display = 'block'; //show Signup Form
	
}



function acctSettingsClicked(e){
	e.preventDefault();
	hideAllSections(); //Hide all Elements
    setTitle("Edit Account"); //change page Title/discription meta
	document.getElementById("sectionEditAcct").style.display = 'block'; //show Signup Form
	document.getElementById("ed_email").innerText = login_user.email;
	document.getElementById("ed_firstname").value = login_user.first_name;
	document.getElementById("ed_lastname").value = login_user.last_name;
	document.getElementById("ed_psw").value = login_user.password;
}

function signUpClicked(e){
	e.preventDefault();
    setTitle("Register"); //change page Title/discription meta
	hideAllSections(); //Hide all Elements
	document.getElementById("sectionSignup").style.display = 'block'; //show Signup Form
}

function loginClicked(e){
	e.preventDefault();
    setTitle("Sign In"); //change page Title/discription meta
	hideAllSections(); //Hide all Elements
	document.getElementById("sectionLogin").style.display = 'block'; //Show Login Form
}

function hideAllSections(){
	//get all sections
	document.querySelectorAll("SECTION");
	for(const prob of document.querySelectorAll("SECTION")){
		prob.style.display = "none";
	}
}

function backToShowDash(e){
	e.preventDefault();
	showDash();
}

function showDash(){
	hideAllSections();
    setTitle("Dashboard"); //change page Title/discription meta
	document.getElementById("sectionDashboard").style.display = 'block'; //Show Dashboard 	
	document.getElementById("sectionAccount").style.display = 'block'; //Show sectionAccount
	getStoredData();
	loadAllTodo();
}

function alertMsg(alert_type, alert_message){
	const sectionNotification = document.getElementById("sectionNotification");
	sectionNotification.style.display = "block";
	switch(alert_type){
		case "error":
			sectionNotification.innerHTML = '<div class="container bg_error"> <h3>Error !</h3><p>' + alert_message +' </p></div>';
			break;
		case "success":
			sectionNotification.innerHTML = '<div class="container bg_success"> <h3>Success !</h3><p>' + alert_message +' </p></div>';
			break;
		case "info":
			sectionNotification.innerHTML = '<div class="container bg_info"> <h3>Information !</h3><p>' + alert_message +' </p></div>';
			break;
		default:
			sectionNotification.innerHTML = '<div class="container bg_default"> <p>' + alert_message +' </p></div>';
			break;
	}

	setTimeout(function() {
 		sectionNotification.style.display = "none";
	}, 5000);
}

function removeTodo(name){
	for(i=0; i<toDo.length; i++){		
		if(toDo[i].name === name && toDo[i].email === login_user.email){
			toDo.splice(i, 1);
		}
	}
	localStorage.all_todo = JSON.stringify(toDo);
	showDash();
	alertMsg("success","To-Do List removed Successfully")
}

function createTodo(e){
	e.preventDefault();
	const todoname = document.getElementById("todoname").value || false;

	if(todoname){
		let todoExit = false;	
		for(const prob of toDo){
			if(prob.name === todoname && prob.email === login_user.email){
				todoExit = true;
			}
		}
		if(todoExit){
			alertMsg("error","To-Do name exist");
		}else{			
			let new_todo = {name:todoname, email:login_user.email};
			toDo.push(new_todo);
			localStorage.all_todo = JSON.stringify(toDo);
			showDash();
			alertMsg("success","To-Do added Successfully!")
			document.getElementById("todoname").value ="";
		}

	}else{
		alertMsg("error", "Pls, fill form appropraitly");
	}
}


function editTodo(e){
	e.preventDefault();
	const todoname = document.getElementById("ed_todoname").value || false;
	const todoname_old = document.getElementById("ed_todoname_old").value || false;

	if(todoname){
			
		for(i=0; i<toDo.length; i++){		
			if(toDo[i].name === todoname_old && toDo[i].email === login_user.email){
				toDo[i].name = todoname;
			}
		}
		localStorage.all_todo = JSON.stringify(toDo);
		showDash();
		alertMsg("success","To-Do added Successfully!")
	}else{
		alertMsg("error", "Pls, fill form appropraitly");
	}
}

function updateUser(e){
	e.preventDefault();
	const first_name = document.getElementById("ed_firstname").value || false;
	const last_name  = document.getElementById("ed_lastname").value || false;
	const password   = document.getElementById("ed_psw").value || false;
	if(first_name && lastname && password){
		
		for(i =0; i< users.length; i++){
			if(users[i].email === login_user.email){
				users[i].first_name = first_name;
				users[i].last_name  = last_name;
				users[i].password   = btoa(password);			
			}
		}

		localStorage.all_users = JSON.stringify(users);
		getStoredData();
		alertMsg("success", "User account Updated Successfully. Pls login again");
		setTimeout(function(){
			window.location.reload();
		},2000);
	
	}else{
		alertMsg("error", "Pls fill all required inputs");
	}
}
function createUser(e){
	e.preventDefault();
	//validate data
	const first_name = document.getElementById("firstname").value || false;
	const last_name  = document.getElementById("lastname").value || false;
	const email 	 = document.getElementById("email").value || false;
	const password   = document.getElementById("psw").value || false;
	if(first_name && lastname && email && password){
		//check if user email exist
		let user_exist = false;
		for(const prob of users){
			if(prob.email === email){
				user_exist = true;
			}
		}
		if(!user_exist){
			let user = new Object(); 
			user={
				first_name	: first_name,
				last_name	: last_name,
			 	email 		: email,
			 	password	: btoa(password)
			};
			users.push(user);
			localStorage.all_users = JSON.stringify(users);
			getStoredData();
			hideAllSections();
			document.getElementById("sectionLogin").style.display = 'block'; 

			alertMsg("success", "User account created Successfully. You can Login Now");

			document.getElementById("firstname").value ="";
			document.getElementById("lastname").value  ="";
			document.getElementById("email").value  ="";
			document.getElementById("psw").value  =""
		}else{
			hideAllSections();
			document.getElementById("sectionLogin").style.display = 'block'; 
			alertMsg("error", "Sorry, User Email already exist. Pls login");
		}	
	}else{
		alertMsg("error", "Pls fill all required inputs");
	}
}


function loginUser(e){
	//validate data
	e.preventDefault();
	const email = document.getElementById("lg_email").value || false;
	const password = document.getElementById("lg_psw").value || false;
	if(email && password){
	 	let user_exist = false;
		for(const prob of users){
			if(prob.email === email && prob.password===btoa(password)){
				user_exist = true;
				login_user = {
					first_name	: prob.first_name,
					last_name	: prob.last_name,
				 	email 		: prob.email,
				 	password	: atob(prob.password)
				};		
			}
		}
		if(user_exist){
			//show dashboard
			showDash();

		}else{
			alertMsg("error", "Sorry, no user with this password exist. Pls try again");
		}		
	}else{
		alertMsg("error", "Pls fill all required inputs");
	}
	
}


function loadAllTodo(){
	todo_list = document.getElementById('listTodo');
	todo_list.innerHTML = "";
	for(const prob of toDo){
		if(prob.email===login_user.email){
			let li = document.createElement("li");
			li.appendChild(document.createTextNode(prob.name));
			let span = document.createElement("SPAN");
			let txt = document.createTextNode("\u00D7");
		  	span.className = "close-todo";
		  	span.appendChild(txt);
		  	li.appendChild(span);

			todo_list.appendChild(li);
		}
	}
	todo_list.addEventListener('click', function(e) {
	  if (e.target.tagName === 'LI') {
	  	hideAllSections();
	  	document.getElementById("sectionEditTodo").style.display = 'block';
	  	document.getElementById("ed_todoname").value = e.target.innerText.slice(0, -1);
	  	document.getElementById("ed_todoname_old").value = e.target.innerText.slice(0, -1);
	  	document.getElementById("list_title").innerText = e.target.innerText.slice(0, -1);
	  	document.getElementById("parentTodo").value = e.target.innerText.slice(0, -1);
	  	
	  	loadAllTodos(e.target.innerText.slice(0, -1));

	  }
	}, false);

	const removeTodoBtns = document.getElementsByClassName("close-todo");
	for (i = 0; i < removeTodoBtns.length; i++) {
	  removeTodoBtns[i].onclick = function() {
	   	let confDelete = confirm("Are you sure you wwant to Remove " + this.parentElement.innerText.slice(0, -1) );
	   	if(confDelete){
	   		removeTodo(this.parentElement.innerText.slice(0, -2));
	    }
	  }
	  
	}
}


function loadAllTodos(todo_name){
	todos_list = document.getElementById('listTodos');
	todos_list.innerHTML = "";
	for(const prob of toDos){
		if(prob.email===login_user.email && prob.todo_name === todo_name){
			let li = document.createElement("li");
			li.appendChild(document.createTextNode(prob.name));
			let span = document.createElement("SPAN");
			let txt = document.createTextNode("\u00D7");
		  	span.className = "close-todos";
		  	span.appendChild(txt);
		  	li.appendChild(span);
		  	if(!(parseInt(prob.state)===1)){
		  	 li.classList.add('checked');
		  	}
			todos_list.appendChild(li);
		}
	}
	todos_list.addEventListener('click', function(e) {
	  if (e.target.tagName === 'LI') {
	  	toggleTodoState(e.target.innerText.slice(0, -1));
	  }
	}, false);

	const removeTodoBtns = document.getElementsByClassName("close-todos");
	for (i = 0; i < removeTodoBtns.length; i++) {
	  removeTodoBtns[i].onclick = function() {
	   	let confDelete = confirm("Are you sure you want to Remove " + this.parentElement.innerText.slice(0, -1) );
	   	if(confDelete){
	   		removeSubTodos(this.parentElement.innerText.slice(0, -2));
	    }
	  }
	  
	}
}

function removeSubTodos(name){
	let parentTodo = document.getElementById("parentTodo").value;
  for(i=0; i< toDos.length; i++){
  	if(toDos[i].name == name && toDos[i].email===login_user.email && toDos[i].todo_name === parentTodo){
  		toDos.splice(i,1);
  	}
  }
  localStorage.all_todos = JSON.stringify(toDos);
  loadAllTodos(parentTodo);
}


function toggleTodoState(name){
  let parentTodo = document.getElementById("parentTodo").value;  
  for(i=0; i< toDos.length; i++){
  	if(toDos[i].name == name && toDos[i].email===login_user.email && toDos[i].todo_name === parentTodo){
  		if(parseInt(toDos[i].state)===1){
  			toDos[i].state=0;
  		}else{
  			toDos[i].state=1;
  		}
  	}
  }
  localStorage.all_todos = JSON.stringify(toDos);
  loadAllTodos(parentTodo);
}

function addNewTodo() {
  let newtodo = document.getElementById("newtodo").value;
  let parentTodo = document.getElementById("parentTodo").value;
  
  toDos.push({name: newtodo, todo_name: parentTodo, email:login_user.email, state:1});
  localStorage.all_todos = JSON.stringify(toDos);
  
  document.getElementById("newtodo").value ="";
  
   loadAllTodos(parentTodo);
}




