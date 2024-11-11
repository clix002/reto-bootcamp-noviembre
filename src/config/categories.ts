

export const categories = [
    'bebidas',
    'cuidado-personal-y-salud',
    'limpieza',
    'mascotas',
    'abarrotes',
    'electrohogar',
    'frutas-y-verduras',
    'decohogar',
    'mejoramiento-del-hogar',
    'congelados',
    'quesos-y-fiambres',
    'belleza',
    'panaderia-y-pasteleria',
    'libreria-y-oficina',
    'carnes-aves-y-pescados',
    'lacteos-y-huevos',
    'juguetes-y-juegos'
] as const;

export type  Category = typeof categories[number];