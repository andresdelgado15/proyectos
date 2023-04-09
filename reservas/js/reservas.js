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
    const reservationInfo = isReservationAvailable(date, time);

    if (!reservationInfo.isReserved) {
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
        Fecha: <span class="dateTime">${date}</span><br>
        Hora: <span class="dateTime">${time}</span><br>
        Número de personas: ${numPeople}
        </p>
      </div>
      </div>
      </div>
      `;
      $("#reservationData").append(reservationData);
      $("#reservationDataContainer").show();

      // Mostrar un mensaje de éxito
      toastr.success("¡Reserva realizada con éxito!");
    } else {
      // Mostrar mensaje de error
      toastr.error(
        "Ya existe una reserva para la fecha y hora seleccionadas o la fecha y hora ya han pasado."
      );
      // Cambiar el color de la hora reservada a rojo
      const timeIndex = $("#time option").index(
        $(`#time option[value='${reservationInfo.time}']`)
      );
      $("#time option").eq(timeIndex).css("color", "red");

      // Cambiar el color de la fecha reservada a rojo en el calendario Datepicker
      if (!reservedDates.includes(reservationInfo.date)) {
        reservedDates.push(reservationInfo.date);
        $("#date").datepicker("refresh");
      }
    }
  });
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

  function isReservationAvailable(date, time) {
    const currentTime = new Date();
    const reservationDateTime = new Date(date + "T" + time);

    if (reservationDateTime <= currentTime) {
      return { isReserved: true };
    }
    const reservedInfo = {
      isReserved: false,
      date: "",
      time: "",
    };

    reservations.forEach((reservation) => {
      if (reservation.date === date && reservation.time === time) {
        reservedInfo.isReserved = true;
        reservedInfo.date = date;
        reservedInfo.time = time;
      }
    });

    return reservedInfo;
  }
});
