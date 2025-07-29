#!/usr/bin/env node

//define all the global needed data and functions
const fs = require('fs');
const {program} = require('commander'); 
let categories = ['shopping','education','fun','food']
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let fileData = fs.readFileSync('expenses.json', 'utf8');
fileData = JSON.parse(fileData)

function generateId(data){
    if(data.length==0) return 1
    let Ids = data.map(item=>item.id)
    return Ids[(Ids.length)-1]+1
}

// adding expense
program
.command('add')
.description("adding a new expense")
.requiredOption('-D, --description <description>', 'Add a description for the expense')
.requiredOption('-A, --amount <amount>', 'Add an amount for the expense')
.option('-C, --category <category>','add the category of your spending it is none by default')
.action(function(data){
    if(data.category!=undefined){
        if(!categories.includes(data.category)){
            console.log(`you must enter from those categories shopping, fun, food, education and make sure the spelling is correct`)
            return;
        }
    }
    data = {
        'id':generateId(fileData),
        'description':data.description,
        'amount':data.amount,
        'date':new Date(),
        'category': data.category == undefined? 'none':data.category
        }

  if(fileData.length>0){

    fileData.push(data)
    fs.writeFile('expenses.json',JSON.stringify(fileData),(err)=>{
    if(err) {
        console.error('Error writing to file', err);
        return;
    } 
    console.log(`Expense added successfully id: ${data.id}`);}
)
}
else{
    fs.writeFile('expenses.json',JSON.stringify([data]) ,(err)=>{
    if(err) {
        console.error('Error writing to file', err);
        return;
    } 
    console.log(`Expense added successfully id: ${data.id}`);}
)}  
})


// list all the expenses in table format
program.command('list')
.description("get all your expenses")
.option('-C, --category <category>')
.action(function(category){
    if(category.category!=undefined){
        fileData = fileData.filter(item=>item.category==category.category)
    }
   
    console.table(fileData)
})

// get the total expenses
program
.command('summery')
.description("get the total of your expense without too much details")
.option('-m, --month <month>',"the month you want the summery of it's expenses")
.action(function(month){
    if(month.month==undefined){
        let total = 0;
        for(item of fileData){
            total += parseInt(item.amount)
        }
        console.log(`total $${total}`)
    }
    else{
        let m = month.month
        let monthData = fileData.filter(item=>new Date(item.date).getMonth()+1==m)
        if(monthData.length==0) console.log("you didn't expense anything in this month")
        else{
            let total = 0;
            for(item of monthData){
                total+= parseInt(item.amount)
            }
            console.log(` total spent for month ${monthNames[m-1]} is $${total}`)
        }
    }
})

// delete specific expense
program
.command('delete')
.description("delete specific expense by specifying it's id")
.requiredOption('--id <id>','the id of the expense you want to delete')
.action(function(id){
     id = id.id
     let len = fileData.length
     fileData = fileData.filter(item=>item.id!=id)
     if(len == fileData.length) console.log(`id ${id} deosn't exist`)
    else{
        fs.writeFile("expenses.json",JSON.stringify(fileData),(err)=>{
            if(err) console.log("something went wrong")
            console.log("deleted successfully")
        })
    }
})

program.parse(process.argv);
 
 
 

 