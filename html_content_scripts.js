const welcomeHtml = ` <section id="welcome">
	<h1>Pirple.com To-Do list Manager</h1>
	<p>This Application will assist you to manage all your to-do list, making your life easy and organized. You have no more excuses for the work undone</p>
	<button id="btnLogin" class="login">Log In</button> <button id="btnSignup" class="signup">Sign Up</button>
</section>`;

const sectionAccount = ` <div class="container" id="sectionAccount" style="display:none">
    <button id="btnAcctSettings" class="button-success">Account Settings</button>    
    <button id="btnLogout" class="button-error" onclick="window.location.reload();">Logout</button>
</div>`;

const sectionLogin =`<section id="sectionLogin" style="display:none" >
<form id="frmLogin" class="login-container">
  <div class="container">
    <h1>Login</h1>
    <p>Please enter your details to Login.</p>
    <hr>
    <label for="lg_email"><b>Email</b></label>
    <input type="email" placeholder="Enter Email" id="lg_email" required>
    <label for="lg_psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" id="lg_psw" required>
    <hr>
    <button type="submit" class="registerbtn">Login</button>
  </div>
  
  <div class="container signin">
    <p>Don't have an account? <a href="#" id="linkSignup">Sign Up</a>.</p>
  </div>
</form>

</section>`;

const sectionEditAccount = `<section id="sectionEditAcct" style="display:none"  >
          <form id="frmEditAcct" class="login-container">
            <div class="container ">
              <h1>Edit Details for <span id="ed_email"></span></h1>
              <p>Please fill in this form to create an account.</p>
              <hr>

              <label for="ed_firstname"><b>First Name</b></label>
              <input type="text" placeholder="Enter First Names" id="ed_firstname" required>
              <label for="ed_lastname"><b>Last Name</b></label>
              <input type="text" placeholder="Enter Last Name" id="ed_lastname" required>
              <label for="ed_psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" id="ed_psw" required>
              <hr>
              
              <button type="submit" class="registerbtn">Update Account</button>
            </div>
            
            
          </form>
  
    </section>`;

const sectionSignup = `  <section id="sectionSignup"  style="display:none" >
          <form id="frmSignup" class="login-container">
            <div class="container ">
              <h1>Register</h1>
              <p>Please fill in this form to create an account.</p>
              <hr>

              <label for="firstname"><b>First Name</b></label>
              <input type="text" placeholder="Enter First Names" id="firstname" required>
              <label for="lastname"><b>Last Name</b></label>
              <input type="text" placeholder="Enter Last Name" id="lastname" required>
              <label for="email"><b>Email</b></label>
              <input type="email" placeholder="Enter Email" id="email" required>
              <label for="psw"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" id="psw" required>
              <hr>
              <p><input type="checkbox" id="termsagree" required /> I agree to the Terms of Use </p>

              <button type="submit" class="registerbtn">Sign Up</button>
            </div>
            
            <div class="container signin">
              <p>Already have an account? <a href="#" id="linkLogin">Log In</a>.</p>
            </div>
          </form>
  
    </section>`;

const sectionDashboard =`<section id="sectionDashboard"   style="display:none">
      <div class="container">
        <div class="login-container" style="text-align: right;">
                  <button id="btnCreateTodo" class="button-secondary"> + Add To Do </button>
        </div>
        <div id="listTodoWrapper" class="login-container">
          <h1>My To Do Lists</h1>
            <ul id="listTodo" >
              
            </ul>
        </div>
      </div>
      
    </section>`;

const sectionAddTodo = ` <section id="sectionAddTodo" style="display:none"  >
      <div class="container login-container">
            <a href="#" class="btnBackToDash"> < Back</a>
            <form id="frmAddTodo">
            <h1>Create New To-Do List</h1>
                <hr>
                <label for="todoname"><b>To-Do List Name</b></label>
                <input type="text" placeholder="Enter To-Do List Name" id="todoname" required>
                <hr>
                <button type="submit" class="registerbtn"> Save</button>
            </form>
            
        </div>
        </section>`;

const sectionEditTodo = `<section id="sectionEditTodo" style="display:none"  >
        <div class="container login-container">
        <a href="#" class="btnBackToDash"> < Back</a>
        <form id="frmEditTodo">
            <h1>Edit To-Do List</h1>
                <hr>
                <label for="todoname"><b>To-Do List Name</b></label>
                <input type="text" placeholder="Enter To-Do List Name" id="ed_todoname" required>
                <input type="hidden" id="ed_todoname_old">
                <hr>
                <button type="submit" class="registerbtn"> Save</button>
        </form>

        <hr>
        <h1>To Dos in <span id="list_title"></span> Lists</h1>

        <div id="" class="add-todo-wrapper">
            <h2 >My To Do List</h2>
            <input type="text" id="newtodo" class="todos_input" placeholder="Title...">
            <input type="hidden" id="parentTodo" class="todos_input" placeholder="Title...">
            <span onclick="addNewTodo()" class="addBtn">Add</span>
        </div>

        <ul id="listTodos" >
                
        </ul>
        
        </div>

    </section>`;

const sectionNotification = `<section id="sectionNotification" class="login-container"  style="display:none"> </section>`;
