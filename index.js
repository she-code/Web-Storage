// gets get the data from the form 
let userForm = document.getElementById('user_form');
let userEntries=[]


// get data from localstorage
const retieveEntries = () =>{
    let entries = localStorage.getItem('userEntries')
   entries? entries=JSON.parse(entries):entries=[]
    return entries

}

     // display table
const displayEntries = ()=>{
    let entries=retieveEntries()
    const tbleEntries = entries.map((entry)=>{
    const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`
    const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`
    const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`
    const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`
    const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
    return row
    
    }).join('\n')
    const table =` <table class='table-auto w-full border-separate border border-slate-500'>
        <tr>
        <th class='px-3 py-3 border border-slate-700'>Name </th>
        <th class='px-3 py-3 border border-slate-700'>Email </th>
        <th class='px-3 py-3 border border-slate-700'>Password </th>
        <th class='px-3 py-3 border border-slate-700'>Dob </th>
        <th class='px-3 py-3 border border-slate-700'>Accepted terms? </th>
        </tr>${tbleEntries}
    </table>`
    let details = document.getElementById('user-entries')
    details.innerHTML=table
    }
// submit the form
const saveUserForm = (event)=>{
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
    let entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    }
    
    //get previos entry
    userEntries=retieveEntries()
    userEntries.push(entry)
     // save the new data on localstorage
     localStorage.setItem('userEntries',JSON.stringify(userEntries));
    displayEntries()
    userForm.reset()
    // console.log(users)
    }
}

//on submit call submit
userForm.addEventListener('submit',saveUserForm)
displayEntries()
