document.onreadystatechange = async function () {
  if (document.readyState == "complete") {
    const params = new URLSearchParams(window.location.search)
    deviceId = params.get('id');
    loadDevice(deviceId);
    async function loadDevice(deviceId) {
      await $.ajax({
        url: "http://localhost:3001/device/get",
        headers: { "Authorization": ` ${auth}`, id: deviceId },
        success: function (resul) {
          device = resul.message[0]
        }
      }).fail(function (err) {
        console.log(err.responseJSON.message)
      })
      console.log(device)
      listDevice(device);
    }
    async function listDevice(device) {
      if (device.status == true) {
        device.status = "on";
      } else {
        device.status = "off";
      }
      document.getElementById('dados_card').innerHTML += `
      <p class="no-margin device-infos-subtiles">Dados:</p>
                  <p class="no-margin" id="device-id"><b>ID:</b> #${device.id}</p>
                  <p class="no-margin" id="device-name"><b>Nome:</b> ${device.nome} (${device.apelido})</p>
                  <p class="no-margin" id="device-last-collection"><b>Última coleta:</b> ${device.dt_rastreio}</p>
                  <p class="no-margin device-infos-subtiles">Bateria:</p>
                  <p class="no-margin" id="batery-level"><b>Nível de bateria: </b> 70%</p>
                  <p class="no-margin" id="batery-last-switch"><b>Última troca: </b> ${device.dt_atualizacao}</p>
      `;
      document.getElementById('origem-card').innerHTML += `
      <p class="no-margin device-infos-subtiles">Origem:</p>
                  <div class="infos-aside-bx">
                    <p class="no-margin" id="device-building"><b>Prédio:</b> ${device.origem_predio}</p>
                    <p class="no-margin" id="device-room"><b>Sala:</b> ${device.origem_sala}</p>
                  </div>
                  <p class="no-margin" id="device-section"><b>Setor:</b> ${device.setor_origem}</p>
                  <p class="no-margin device-infos-subtiles">Responsável:</p>
                  <p class="no-margin" id="responsible-name"><b>Nome: </b> ${device.responsavel}</p>
                  <p class="no-margin" id="responsible-section"><b>Setor:</b> ${device.setor_origem}</p>
      `;
      document.getElementById('location-card').innerHTML += `
      <p class="no-margin device-infos-subtiles">Atualmente:</p>

      <p class="no-margin d-flex" id="device-status"><b>Status: </b> ${device.status}</p>
      <div class="infos-aside-bx">
        <p class="no-margin"><b>Prédio:</b> ${device.atual_predio}</p>
        <p class="no-margin"><b>Sala:</b> ${device.atual_sala}</p>
      </div>
      <div class="infos-aside-bx">
        <p class="no-margin"><b>Data:</b> ${device.dt_rastreio}</p>
        <p class="no-margin"><b>Hora:</b> ${device.hr_rastreio}</p>
      </div>
      <p class="no-margin"><b>Endereço MAC:</b> ${device.mac_address}</p>

      `
    }
  }
}

function editDevice() {
  window.location.href = `/view/update-device.html?id=${deviceId}`;
}