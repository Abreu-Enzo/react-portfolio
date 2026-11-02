import Alert from "../Alert/Alert";
import { formatTime } from "../../utils/formatDate";

// Aviso mostrado quando o GitHub bloqueou novas consultas e a página usa os dados salvos no cache.
const RateLimitAlert = ({ resetAt }) => {
  return (
    <Alert tone="warning" title="Limite de consultas ao GitHub atingido">
      Mostrando os dados salvos da última consulta. A lista volta a atualizar às {formatTime(resetAt)}.
    </Alert>
  );
};

export default RateLimitAlert;
