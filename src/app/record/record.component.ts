import { Component, OnInit } from '@angular/core';

let dispositivoId: any, mediaRecorder: any;

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  public audio: any;

  constructor() {
  }

  ngOnInit(): void {
    //Confirmación de requisitos
    if (typeof MediaRecorder === "undefined" || !(!!(navigator.mediaDevices.getUserMedia)))
      return alert("Tu navegador web no cumple los requisitos"); 
      else this.getDispositivo();
  }
    
  getDispositivo() {
    navigator
      .mediaDevices
      .enumerateDevices()
      .then(dispositivos => {
        dispositivoId = dispositivos[0].deviceId;
      })
  };

  startRecording() {
    if (!!mediaRecorder) return alert("Ya se está grabando");

    navigator.mediaDevices.getUserMedia({
      audio: { deviceId: dispositivoId }
    })
      .then(
        stream => {
          const audioSlices: any = [];
          // Comenzar a grabar
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          mediaRecorder.addEventListener("dataavailable", (evento: any) => {
            audioSlices.push(evento.data);
          });
          // Generar archivo de audio
          mediaRecorder.addEventListener("stop", () => {
            stream.getTracks().forEach(track => track.stop());
            this.audio = new Audio(window.URL.createObjectURL(new File(audioSlices, 'Grabacion')));
          });
        }
      )
      .catch(error => { 
        console.log(error);
        return alert('No se ha encontrado ningun dispositivo')
      });
  };

  stopRecording() {
    mediaRecorder.stop();
    mediaRecorder = null;
  };
}
