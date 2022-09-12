// gets get the data from the form 
let form = document.getElementById('user_form');
let users=[]


// get data from localstorage
const getusers = () =>{
    let users = localStorage.getItem('users')
   users? users=JSON.parse(users):users=[]
    return users
}

     // display table
const displayRows = ()=>{
    let users=getusers()
    const contents = users.map((user)=>{
    const nameCell = `<td class='border px-4 py-2'>${user.name}</td>`
    const emailCell = `<td class='border px-4 py-2'>${user.email}</td>`
    const passwordCell = `<td class='border px-4 py-2'>${user.password}</td>`
    const dobCell = `<td class='border px-4 py-2'>${user.dob}</td>`
    const acceptTermsCell = `<td class='border px-4 py-2'>${user.acceptTerms}</td>`
    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
    return row
    
    }).join('\n')
    const table =` <table class='table-auto w-full border-collapse border border-slate-500'>
        <tr>
        <th class='px-3 py-3 border border-slate-700'>Name </th>
        <th class='px-3 py-3 border border-slate-700'>Email </th>
        <th class='px-3 py-3 border border-slate-700'>Password </th>
        <th class='px-3 py-3 border border-slate-700'>Dob </th>
        <th class='px-3 py-3 border border-slate-700'>Accepted terms? </th>
        </tr>${contents}
    </table>`
    let userTable = document.getElementById('display')
    userTable.innerHTML=table
    }
// submit the form
const submit = (event)=>{
    //prevent default submission
event.preventDefault();

// create opject of user input
let name = document.getElementById('name').value
let email = document.getElementById('email').value
let password = document.getElementById('password').value
let dob = document.getElementById('dob').value
let acceptTerms = document.getElementById('acceptTerms').value
//check age
let currentYear = new Date().getFullYear()
let birthYear = dob.split('-')[0]
let difference = currentYear-birthYear
if(difference < 18 || difference > 55){
    alert("Age must be between 18 and 55")

    return
}else{
    let data = {
        name,
        email,
        password,
        dob,
        acceptTerms
    }
    
    //get previos data
    users=getusers()
    users.push(data)
     // save the new data on localstorage
     localStorage.setItem('users',JSON.stringify(users));
    displayRows()
    form.reset()
    // console.log(users)
    }
}

//on submit call submit
form.addEventListener('submit',submit)
