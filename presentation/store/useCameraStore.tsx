import { create } from "zustand";

// HOOK PARA CONTEXTO
// CONTEXTO PARA MANEJAR EL CONTEXTO DE LA CAMARA CON ZUSTAND
// usamos el contexto pq es posible q el usuario suba varias imagenes 
// en carrusel de la vista de 1 producto , de tal forma cuando envie 
// el usuario sera varias , ademas en el carrusel pueden agregar como eliminar

// clase modelo
interface TemporalCameraStoreState {
  selectImage: string[];
  addSelectImage: (image: string) => void;
  clearImages: () => void;
}

// la funcion de zustand es de tipo TemporalCameraStoreState
export const useCameraStore = create<TemporalCameraStoreState>()((set) => ({
  // donde se guardan las imagenes
  selectImage: [],

  //   metodo para agrega imagenes
  addSelectImage: (image) => {
    // ...state.selectImage : trae todo y le agrega la nueva image
    set((state) => ({ selectImage: [...state.selectImage, image] }));
  },

  //   limpiando imagenes
  clearImages: () => set({ selectImage: [] }),
}));
