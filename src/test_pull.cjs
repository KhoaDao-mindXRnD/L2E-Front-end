
async function pullData(){
    const data = await require('./spreadsheet.cjs')
    return data
}

// let getdata = await pullData()
console.log(pullData())

