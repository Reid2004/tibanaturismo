// Fechas que deben aparecer en rojo (formato: 'DD/MM/YYYY')
const fechasRojo = [
    '15/06/2025',
    '25/06/2025'
];

class Calendario {
    constructor() {
        // Elementos DOM necesarios
        this.mesActual = document.getElementById('monthYear');
        this.calendarioGrid = document.getElementById('calendarGrid');
        
        // Botones de navegación
        this.btnAnterior = document.getElementById('prevMonth');
        this.btnSiguiente = document.getElementById('nextMonth');

        // Configuración inicial
        this.fechaActual = new Date();
        this.inicializarEventos();
        this.generarCalendario();
    }

    inicializarEventos() {
        this.btnAnterior.addEventListener('click', () => this.cambiarMes(-1));
        this.btnSiguiente.addEventListener('click', () => this.cambiarMes(1));
    }

    cambiarMes(meses) {
        this.fechaActual.setMonth(this.fechaActual.getMonth() + meses);
        this.generarCalendario();
    }

    generarCalendario() {
        // Limpiar el grid anterior
        this.calendarioGrid.innerHTML = '';

        // Obtener información del mes
        const primerDia = new Date(
            this.fechaActual.getFullYear(),
            this.fechaActual.getMonth(),
            1
        );
        
        const ultimoDia = new Date(
            this.fechaActual.getFullYear(),
            this.fechaActual.getMonth() + 1,
            0
        );

        // Configurar título del mes
        this.mesActual.textContent = `${this.obtenerNombreMes()} ${this.fechaActual.getFullYear()}`;

        // Calcular día inicial (offset para empezar en domingo)
        const diaInicial = primerDia.getDay() || 7;

        // Generar días previos al mes actual
        for(let i = diaInicial - 1; i >= 0; i--) {
            const fechaPrev = new Date(
                this.fechaActual.getFullYear(),
                this.fechaActual.getMonth(),
                1 - i
            );
            this.agregarDia(fechaPrev, 'prev-month');
        }

        // Generar días del mes actual
        for(let dia = 1; dia <= ultimoDia.getDate(); dia++) {
            const fechaActual = new Date(
                this.fechaActual.getFullYear(),
                this.fechaActual.getMonth(),
                dia
            );
            this.agregarDia(fechaActual, 'current-month');
        }

        // Generar días siguientes al mes actual
        const diasRestantes = 42 - this.calendarioGrid.children.length;
        for(let i = 1; i <= diasRestantes; i++) {
            const fechaSig = new Date(
                this.fechaActual.getFullYear(),
                this.fechaActual.getMonth() + 1,
                i
            );
            this.agregarDia(fechaSig, 'next-month');
        }
    }

    agregarDia(fecha, claseMes) {
        const diaElement = document.createElement('div');
        diaElement.className = `calendar-day ${claseMes}`;
        diaElement.textContent = fecha.getDate();

        // Marcar día actual
        if(this.esDiaActual(fecha)) {
            diaElement.classList.add('today');
        }

        // Marcar fechas en rojo
        if(this.esFechaRoja(22/10/2025)) {
            diaElement.classList.add('red-date');
        }

        this.calendarioGrid.appendChild(diaElement);
    }

    esDiaActual(fecha) {
        const hoy = new Date();
        return fecha.getDate() === hoy.getDate() &&
               fecha.getMonth() === hoy.getMonth() &&
               fecha.getFullYear() === hoy.getFullYear();
    }

    esFechaRoja(fecha) {
        const formatoFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        return fechasRojo.includes(formatoFecha);
    }

    obtenerNombreMes() {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 
            'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return meses[this.fechaActual.getMonth()];
    }
}

// Inicializar el calendario cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new Calendario();
});