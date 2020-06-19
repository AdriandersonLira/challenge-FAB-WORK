const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
app.use(express.json());
app.use(cors());

const voos = [{
    "id": 1,
    "origin": {
      "CEP": "58046670",
      "country": "Brazil",
      "state": "Paraíba",
      "city": "João Pessoa"
    },
    "destination": {
      "CEP": "58057 454",
      "country": "Brazil",
      "state": "São Paulo",
      "city": "São Paulo"
    },
    "date": "16-07-2020",
    "hour": "00:30"
  }];
let contId = 0;

app.get('/voos', (request, response) => {
  return response.json(voos);
});

app.post('/voos', (request, response) => {
  const vooBody = request.body;

  // validando se é já existe esse destino
  const vooDestination = voos.findIndex(voo => voo.destination.CEP == vooBody.destination.CEP);
  if (vooDestination >= 0)
    return response.status(400).json({ error: 'Destination already registered' });

  // validando formato de hora
  const dateHourVooBody = moment(`${vooBody.date} ${vooBody.hour}`, "DD-MM-YYYY HH:mm", true);
  if (!dateHourVooBody.isValid()) {
    return response.status(400).json({ error: 'Date or Hour invalid.' });
  }

  // validando se tem já existe voo naquele intervalo de 30 min
  let AlreadyVooHour = false;
  
  // pega a hora e minuto do vooBody
  let divHour = vooBody.date.split('-');
  const hourVooBody = new Date(`${divHour[2]}-${divHour[1]}-${divHour[0]} ${vooBody.hour}`);
  
  // para todo voo pega a hora e minuto dele
  for (let voo of voos) {
    let divHour = voo.date.split('-');
    const hourVoo = new Date(`${divHour[2]}-${divHour[1]}-${divHour[0]} ${voo.hour}`);
    
    // verificando data
    if (hourVooBody.getDate() === hourVoo.getDate()) 
    {
      // verificar if estar no range > ou < que 30 min
      // verificar if < 30 min

      function handleHour(hourStart, hourEnd, minuteStart, minuteEnd) {
        if (hourStart <= hourEnd && minuteStart <= minuteEnd) {
          x = hourEnd - hourStart
          y = minuteEnd - minuteStart
        }
        else if (hourStart > hourEnd && minuteStart == minuteEnd) {
          x = hourEnd - hourStart + 24
          y = minuteStart - minuteEnd
        }
        else if (hourStart > hourEnd && minuteStart > minuteEnd) {
          x = (hourEnd - hourStart + 24) - 1
          y = minuteStart - minuteEnd
        }
        else if (hourStart <= hourEnd && minuteStart >= minuteEnd) {
          x = hourStart - hourEnd
          y = minuteStart - minuteEnd
        }
        if (x == 0 && y <= 29) {
          AlreadyVooHour = true;
        }
      }

      if ( hourVooBody.getTime() > hourVoo.getTime()) {
        handleHour(hourVoo.getHours(), hourVooBody.getHours(), hourVoo.getMinutes(), hourVooBody.getMinutes());
      } else {
        handleHour(hourVooBody.getHours(), hourVoo.getHours(), hourVooBody.getMinutes(), hourVoo.getMinutes());
      }

      if (AlreadyVooHour) break;
    }
  }


  if (AlreadyVooHour) {
    return response.status(400).json({ error: 'Flight must be at least 30 minutes apart from the other' });
  }

  const newVoo = { 
    id: contId+1, 
    origin: vooBody.origin,
    destination: vooBody.destination,
    date: vooBody.date, 
    hour: vooBody.hour 
  }

  contId++
  voos.push(newVoo);
  return response.json(newVoo);
});

app.put('/voos/:id', (request, response) => {
  const { id } = request.params;
  const vooBody = request.body;

  // validando id
  const vooIndex = voos.findIndex(voo => voo.id == id);
  if (vooIndex < 0 )
    return response.status(400).json({ error: 'Voo not found.' });  

  // validando se é já existe esse destino
  const vooDestination = voos.findIndex(voo => voo.destination.CEP == vooBody.destination.CEP);
  if (vooDestination >= 0)
    return response.status(400).json({ error: 'Destination already registered' });

  // validando formato de hora
  const dateHourVooBody = moment(`${vooBody.date} ${vooBody.hour}`, "DD-MM-YYYY HH:mm", true);
  if (!dateHourVooBody.isValid()) {
    return response.status(400).json({ error: 'Date or Hour invalid.' });
  }

  // validando se tem já existe voo naquele intervalo de 30 min
  let AlreadyVooHour = false;
  
  // pega a hora e minuto do vooBody
  let divHour = vooBody.date.split('-');
  const hourVooBody = new Date(`${divHour[2]}-${divHour[1]}-${divHour[0]} ${vooBody.hour}`);
  
  // para todo voo pega a hora e minuto dele
  for (let voo of voos) {
    let divHour = voo.date.split('-');
    const hourVoo = new Date(`${divHour[2]}-${divHour[1]}-${divHour[0]} ${voo.hour}`);
    
    // verificando data
    if (hourVooBody.getDate() === hourVoo.getDate()) 
    {
      // verificar if estar no range > ou < que 30 min
      // verificar if < 30 min

      function handleHour(hourStart, hourEnd, minuteStart, minuteEnd) {
        if (hourStart <= hourEnd && minuteStart <= minuteEnd) {
          x = hourEnd - hourStart
          y = minuteEnd - minuteStart
        }
        else if (hourStart > hourEnd && minuteStart == minuteEnd) {
          x = hourEnd - hourStart + 24
          y = minuteStart - minuteEnd
        }
        else if (hourStart > hourEnd && minuteStart > minuteEnd) {
          x = (hourEnd - hourStart + 24) - 1
          y = minuteStart - minuteEnd
        }
        else if (hourStart <= hourEnd && minuteStart >= minuteEnd) {
          x = hourStart - hourEnd
          y = minuteStart - minuteEnd
        }
        if (x == 0 && y <= 29) {
          AlreadyVooHour = true;
        }
      }

      if ( hourVooBody.getTime() > hourVoo.getTime()) {
        handleHour(hourVoo.getHours(), hourVooBody.getHours(), hourVoo.getMinutes(), hourVooBody.getMinutes());
      } else {
        handleHour(hourVooBody.getHours(), hourVoo.getHours(), hourVooBody.getMinutes(), hourVoo.getMinutes());
      }

      if (AlreadyVooHour) break;
    }
  }


  if (AlreadyVooHour) {
    return response.status(400).json({ error: 'Flight must be at least 30 minutes apart from the other' });
  }

  const voo = {
    id: parseInt(id),
    origin: vooBody.origin,
    destination: vooBody.destination,
    date: vooBody.date, 
    hour: vooBody.hour
  };

  voos[vooIndex] = voo;
  return response.json(voo);
});

app.delete('/voos/:id', (request, response) => {
  const { id } = request.params;

  const vooIndex = voos.findIndex(voo => voo.id == id);

  if (vooIndex < 0 )
    return response.status(400).json({ error: 'Voo not found.' });

  voos.splice(vooIndex, 1);

  return response.status(204).send();
});

module.exports = app;