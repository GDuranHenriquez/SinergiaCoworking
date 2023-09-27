const { format, addHours, parse } = require('date-fns');

function getTodayCountry(country){
  const toDay = new Date();
  const todayCountry = toDay.toLocaleString("es-MX", {timeZone: country });
  const format = "dd/MM/yyyy, hh:mm:ss";
  const horaDate = parse(todayCountry, format, new  Date());

  const año = horaDate.getUTCFullYear();
  const mes = (horaDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
  const día = horaDate.getUTCDate().toString().padStart(2, '0');

  // Formatear la fecha como "YYYY-MM-DD"
  var fechaFormateada = `${año}-${mes}-${día}`;
  fechaFormateada = new Date(fechaFormateada);
  return fechaFormateada;
}

module.exports = getTodayCountry;