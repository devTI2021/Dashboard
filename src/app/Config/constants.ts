

export class AppSettings {
    public static API_ENDPOINT='https://panelgestion.automarcali.com/node';
    public static SOCKET_ENDPOINT='http://panelgestion.automarcali.com';
    //public static API_ENDPOINT='http://localhost:8002';
    //public static SOCKET_ENDPOINT='http://localhost:3000';
    public static SECRET_KEY = 'AppVeh@2020.';
    public static PERMISSION_COMERCIAL = {
        'Turnos' : {
            index : 0,
            descripcion: 'Acceso al modulo de turnos'
        },
        'Visitas' : {
            index : 1,
            descripcion: 'Acceso al modulo de visitas'
        },
        'Regis_visitas': {
            index : 2,
            descripcion: 'Permiso para registrar visita'
        },
        'Download_date': {
            index: 3,
            descripcion: 'Permiso para descargar informe de visitas por rango de fecha'
        }
    }

}