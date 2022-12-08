
async function pullData() {
    const data = await require('./spreadsheet.cjs')
    return data
}

pullData().then(function (result) {//.then to avoid promise <pending>
    var json = JSON.stringify(result);
    var fs = require('fs');
    fs.writeFile("database.json", json, function (err) {
        if (err) throw err;
        console.log('Database refreshed');
    }
    );
})