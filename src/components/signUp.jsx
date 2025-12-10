import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignUp = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
      function isEmailInLocalStorage(email){
          let users=JSON.parse(localStorage.getItem("users")|| "[]");
          let isUserAvailable=users.find(u=>u.email===email);
          if(isUserAvailable){
            
                                  Swal.fire({
                                    icon: "error",
                                    title: "User Available ...",
                                    text: "This user in abailable plz enter diefferent email",
                                    footer: '<a href="/login">You have an account</a>'
                                });
                                
            return true;
          }
        }
     
    function createUser(email,password){
        let newUser={
            email:email,
            password:password
        }
        
        return newUser;
    }
    function inserUserInLocalStorage(newUser){
        console.log(newUser)
        let users=JSON.parse(localStorage.getItem("users")||"[]");
        users.push(newUser);

        localStorage.setItem("users",JSON.stringify(users));
        
    }
    function submitForm(e){
        e.preventDefault();
         
        // email conformtion its  valid eamil or not
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if(!emailPattern.test(email)){
            
                      Swal.fire({
                                    icon: "error",
                                    title: "email address ...",
                                    text: "Please enter a valid email address.",
                                    footer: '<a href="/login">You have an account</a>'
                                });
            return;
        }else if(password.length < 6){
            Swal.fire({
                                    icon: "error",
                                    title: "Min 6 characters  ...",
                                    text: "Password must be at least 6 characters long.",
                                    
                                });
            return;
        }else if(!strongPasswordPattern.test(password)){
            alert("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        else if(password !== confirmPassword){
            
                         Swal.fire({
                                    icon: "error",
                                    title: "Not match password and conform password ...",
                                    text: "plz enter a same password ",
                                    
                                });
            return;
        }
          let userAvailable=isEmailInLocalStorage(email);
           if(userAvailable){
               // stop submitForm execution
            return;
           }
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        Swal.fire({
            title: "Successfully sign up!",
              icon: "success"
            });
let newUser=createUser(email,password);
inserUserInLocalStorage(newUser);
    }
    
  return (
  <>
  <div className="bg-white py-6 sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Sign Up</h2>

    <form onSubmit={submitForm} className="mx-auto max-w-lg rounded-lg shadow-xl border-0">
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div>
          <label for="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
          <input type='email' name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }} />
        </div>

        <div>
          <label for="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
          <input type='password' name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }} />
        </div>
        <div>
          <label for="confirm_password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Confirm Password</label>
          <input type='password' name="confirm_password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" value={confirmPassword} onChange={(e)=>{
            setConfirmPassword(e.target.value)
          }} />
        </div>
<div className="flex items-start mb-5">
    <label for="remember-alternative" className="flex items-center h-5">
      <input id="remember-alternative" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium outline-none" required />
      <p className="ms-2 text-sm font-medium text-heading select-none">I agree with the <a href="#" className="text-fg-brand hover:underline">terms and conditions</a>.</p>
    </label>
  </div>
        <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Create an account</button>
    


        <div className="relative flex items-center justify-center">
          <span className="absolute inset-x-0 h-px bg-gray-300"></span>
          <span className="relative bg-white px-4 text-sm text-gray-400">Sign Up with social</span>
        </div>

     <div className='flex justify-around items-center gap-2'>
           <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-sky-800-300 transition duration-100 hover:bg-sky-600 focus-visible:ring active:bg-sky-700 md:text-base cursor-pointer">
          <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z" fill="white" />
          </svg>

       Facebook
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base cursor-pointer">
          <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4" />
            <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853" />
            <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05" />
            <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335" />
          </svg>

          Google
        </button>
     </div>
      </div>

      <div className="flex items-center justify-center bg-gray-100 p-4">
        <p className="text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Log in</Link></p>
      </div>
    </form>
  </div>
</div>
  </>
  )
}

export default SignUp