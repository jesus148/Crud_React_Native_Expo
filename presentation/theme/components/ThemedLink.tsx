import { Link, LinkProps } from 'expo-router';
import { useThemeColor } from "../hooks/useThemeColor";

// COMPONENTE LINK
// para navegar entre vistas

// documentacion
// https://expo.github.io/router/docs/migration/react-navigation/link/

// clase modelo
interface Props extends LinkProps{}

// style props propio
// ...rest : props propios de LinkProps

const ThemedLink = ({ style, ...rest }: Props) => {
  // logica

  // color letra
  const primaryColor = useThemeColor({}, "primary");

  // renderizado
  return (
    <Link
      style={[
        {
          // color letra
          color: primaryColor,
        },
        // estilos como props
        style,
      ]}
      // resto de props del elemento
      {...rest}
    />
  );
};
export default ThemedLink;
