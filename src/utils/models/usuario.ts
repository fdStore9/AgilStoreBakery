export class Usuario {
    static defaultSkills = [
        { id: 'agilidad', name: 'Agilidad', selected: false },
        { id: 'comunicacion', name: 'Comunicación Efectiva', selected: false },
        { id: 'conocimiento', name: 'Conocimiento de Menú', selected: false },
        { id: 'sCliente', name: 'Servicio al Cliente', selected: false },
        { id: 'paciencia', name: 'Paciencia', selected: false },
        { id: 'pedidos', name: 'Toma de Pedidos', selected: false },
        { id: 'trabajo', name: 'Trabajo en Equipo', selected: false }
    ];

    static fromFirebase(data: any): Usuario | null {
        if (!data) {
            return new Usuario();
        }
        
        const {
            email,
            uid,
            nombre,
            apellido,
            rol,
            password,
            phone,
            skills = Usuario.defaultSkills, // Usa las habilidades predeterminadas si no hay datos
            experience,
            profesion,
            fechaNacimiento,
            avatar
        } = data;

        const formattedSkills = Array.isArray(skills) ? 
        skills.map((skill: any) => ({
            id: skill.id,
            name: skill.name,
            selected: skill.selected || false  // Asegura que 'selected' esté definido
        })) : Usuario.defaultSkills; // Usa las habilidades predeterminadas si skills no es un array

        return new Usuario(
            uid,
            nombre,
            email,
            apellido,
            rol,
            password,
            phone,
            formattedSkills,
            experience,
            profesion,
            fechaNacimiento,
            avatar
        );
    }

    constructor(
        public uid: string = "",
        public nombre: string = "",
        public email: string = "",
        public apellido: string = "",
        public rol: string = "",
        public password: string = "",
        public phone: string = "",
        public skills: Array<{
            id: string;
            name: string;
            selected: boolean;
        }> = Usuario.defaultSkills,
        public experience: string = "",
        public profesion: string = "",
        public fechaNacimiento: string = "",
        public avatar: string = ""
    ) { }
}
