import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

// COMPONENTE PARA QUITAR TOKEN CERRAR SESION

const LogoutIconButton = () => {
    // logica

    // determina color
    const primaryColor = useThemeColor({}, 'primary');

    // contexto
    const {logout} = useAuthStore();


    // renderizado
  return (
    // boton
    <TouchableOpacity style={{marginRight:8}} onPress={logout}>
        <Ionicons name='log-out-outline' size={24} color={primaryColor} />
    </TouchableOpacity>
  )
}

export default LogoutIconButton