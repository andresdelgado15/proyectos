$(function () {
  $("#date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
  });
});

$(document).ready(function () {
  let reservations = [];
  let reservedDates = [];
  $("#reservationForm")[0].reset();

  $("#date, #time").on("change", function () {
    const selectedDate = $("#date").val();
    const selectedTime = $("#time").val();
    if (isReservationAvailable(selectedDate, selectedTime)) {
      $("#date, #time").removeClass("reserved-field");
    } else {
      $("#date, #time").addClass("reserved-field");
    }
  });
  // Configurar Toastr.js
  toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: "toast-center-center", // Cambiar la posición a la mitad de la pantalla
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000", // Duración del mensaje en milisegundos
    extendedTimeOut: "1000",
  };
  $("#date").datepicker({
    dateFormat: "yy-mm-dd",
    minDate: 0,
    beforeShowDay: function (date) {
      const dateString = $.datepicker.formatDate("yy-mm-dd", date);
      if (reservedDates.includes(dateString)) {
        return [false, "reserved-date", "Reservado"]; // Colorear la fecha en rojo y mostrar un mensaje de "Reservado" en el tooltip
      }
      return [true, ""]; // Mantener el estilo predeterminado para las fechas disponibles
    },
  });

  $("#reservationForm").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const phone = $("#phone").val();
    const date = $("#date").val();
    const time = $("#time").val();
    const numPeople = $("#numPeople").val();

    function getRandomImage() {
      const imageNames = [
        "restaurante_1.jpeg",
        "restaurante_2.jpeg",
        "restaurante_3.jpeg",
        "restaurante_4.jpeg",
        "restaurante_5.jpeg",
      ];

      const randomNumber = Math.floor(Math.random() * imageNames.length);
      return `./img/${imageNames[randomNumber]}`;
    }

    if (isReservationAvailable(date, time)) {
      // Código para agregar la nueva reserva
      reservations.push({ date, time });

      const reservationData = `
<div class="col-12 col-md-6 col-lg-4 mt-4">
  <div class="card">
    <img src="${getRandomImage()}" alt="Imagen aleatoria" style="width: 100%; height: auto; object-fit: cover; border-top-left-radius: 5px; border-top-right-radius: 5px;" />
    <div class="card-header">
      Reserva
    </div>
    <div class="card-body">
      <p>
        Nombre: ${name}<br>
        Teléfono: ${phone}<br>
        <span class="selected-date-time">Fecha: ${date}</span><br>
        <span class="selected-date-time">Hora: ${time}</span><br>
        Número de personas: ${numPeople}
      </p>
    </div>
  </div>
</div>
`;
  // Agregar la clase selected-time a la opción de hora seleccionada
  $("#time option[value='" + time + "']").addClass("selected-time");
      $("#reservationData").append(reservationData);
      $("#reservationDataContainer").show();

      // Mostrar un mensaje de éxito
      toastr.success("¡Reserva realizada con éxito!");
    } else {
      // Mostrar mensaje de error
      toastr.error("Ya existe una reserva para la fecha y hora seleccionadas o la fecha y hora ya han pasado.");
    }
   
  });

  function isReservationAvailable(date, time) {
    const currentTime = new Date();
    const reservationDateTime = new Date(date + "T" + time);
    if (reservationDateTime <= currentTime) {
      return false;
    }
    const isReserved = reservations.some(
      (reservation) => reservation.date === date && reservation.time === time
    );
    if (isReserved) {
      reservedDates.push(date);
    }
    return !isReserved;
  }
  
});
