

const fs = require('fs');
const { Pool } = require('pg');

// Read CSV file
const csvfile = fs.readFileSync('./data.csv');
const arr = csvfile.toString().split("\n");
const header = arr[0].split(',');

// Transform CSV data to JSON objects

const jsonObject = [];
for (let i = 1; i < arr.length; i++) {
    const data = arr[i].split(',');
    const object = {};
    for (let j = 0; j < data.length; j++) {
        object[header[j].trim()] = data[j].trim();
    }
    const transformedJSON = transformJSON(object);
    jsonObject.push(transformedJSON);



    const pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'newdb',
      password: '123',
      port: 5432,
  });

  // console.log(data);
  


  // Execute insert query
  const insertQuery= `INSERT INTO public.users (name, age, address, additional_info)
VALUES (
    CONCAT('${data[0]}', ' ', '${data[1]}'),
    ${data[2]} ,
    '{"addressline1": "${data[3]}", "addressline2": "${data[4]}", "city": "${data[5]}", "state": "${data[6]}"}'::jsonb,
    '{"gender": "${data[7]}"}'::jsonb)`;




  
  pool.query(insertQuery, (err, result) => {
      if (err) {
          console.error('Error inserting JSON data:', err);
      } else {
          console.log('JSON data inserted successfully');
      }
      pool.end();
  });
}

// Create database connection pool




// Function to transform JSON keys with dots into nested objects
function transformJSON(originalJSON) {
    const transformedJSON = {};

    for (const key in originalJSON) {
        const keys = key.split('.');
        let currentObj = transformedJSON;

        for (let i = 0; i < keys.length; i++) {
            const currentKey = keys[i];
            if (i === keys.length - 1) {
                currentObj[currentKey] = originalJSON[key];
            } else {
                if (!currentObj[currentKey]) {
                    currentObj[currentKey] = {};
                }
                currentObj = currentObj[currentKey];
            }
        }
    }

    return transformedJSON;
}

//console.log(jsonObject);