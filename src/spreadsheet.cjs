const {GoogleSpreadsheet} = require('google-spreadsheet')//sheet library for node

const creds = require('./client_secret.json');//google api file

const doc = new GoogleSpreadsheet('1WSO_QWJlQtepVt1IbgTnUkhml1aVC0-CyjsonUWENuk'); //test global ranking sheet

const maxIndex = 200; //max Index of students

async function accessSpreadsheet() {
    await doc.useServiceAccountAuth({
      client_email: creds.client_email,
      private_key: creds.private_key,
    });
}

function Student(name, Classname, coin) {
  this.name = name
  this.Classname = Classname
  this.coin = coin
}

Studs = new Array()

async function getInfo(){
  var dados = []
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsByIndex[0];//load worksheet
  await sheet.loadCells('A1:L'+(maxIndex+1));//load data in range
  for (i = 0; i < maxIndex; i++) {
      const name = sheet.getCell(i+1, 0)
      var Classname = sheet.getCell(i+1, 11)
      const coin = sheet.getCell(i+1, 10)
      if (!name.value){//if no name found, skip row
        continue
      } else{
        Studs.push(new Student(name.value, Classname.value, (Math.round(coin.value * 100) / 100)))
      }
    }
  
  for (i = 0 ; i < Studs.length; i++){//push to json
      var hold = {}
      hold['id'] = 0
      hold['name'] = Studs[i].name
      hold['class'] = Studs[i].Classname
      hold['image'] = 'https://cdn-icons-png.flaticon.com/512/7981/7981266.png'
      hold['coins'] = Studs[i].coin
      hold['pass'] = true
      hold['rank'] = 0
      dados[i] = hold
  }
  dados = dados.sort((a, b) => {//sort by coin descending
    if (a.coins > b.coins) {
      return -1;
    }
  });
  for (let i = 0 ; i < dados.length; i++){//indexing
    dados[i]['id'] = i
  }
  for (let i = 0 ; i < Studs.length; i++){//ranking
    if (i>0){
      if (dados[i]['coins'] == dados[i-1]['coins']){
        dados[i]['rank'] = dados[i-1]['rank']
      }
      else{
        dados[i]['rank'] = ((dados[i-1]['rank'])+1)
      }
    }
    else{
      dados[i]['rank'] = 1
    }
  }
  return dados
}

var data = []
accessSpreadsheet();
async function driver(){
  data = await getInfo()
  return data
}

module.exports = driver()



