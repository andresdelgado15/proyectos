document.getElementById("reservationForm").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const numPeople = document.getElementById("numPeople").value;
  
    const reservationData = `
      <div class="col-12 col-md-6 col-lg-4 mt-4">
        <div class="card">
          <div class="card-header">
            Reserva
          </div>
          <div class="card-body">
            <p>
              Nombre: ${name}<br>
              Teléfono: ${phone}<br>
              Fecha: ${date}<br>
              Hora: ${time}<br>
              Número de personas: ${numPeople}
            </p>
          </div>
        </div>
      </div>
    `;
  
    document.getElementById("reservationData").insertAdjacentHTML("beforeend", reservationData);
    document.getElementById("reservationDataContainer").style.display = "block";
  });
  