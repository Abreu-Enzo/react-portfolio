import EmptyState from "../EmptyState/EmptyState";
import Button from "../Button/Button";
import { formatTime } from "../../utils/formatDate";

const VARIANTS = {
  api: {
    icon: "cloud-off",
    tone: "danger",
    title: "Não foi possível carregar os projetos",
    description: "A API do GitHub não respondeu. Confira sua conexão e tente de novo.",
  },
  "rate-limit": {
    icon: "gauge",
    tone: "warning",
    title: "Limite de consultas ao GitHub atingido",
    description: "O GitHub limita quantas consultas cada visitante faz por hora.",
  },
  "not-found": {
    icon: "compass",
    tone: "warning",
    title: "Projeto não encontrado",
    description: "Esse projeto não existe ou foi renomeado no GitHub.",
  },
};

const ErrorState = ({
  variant = "api",
  onRetry,
  retrying = false,
  resetAt,
  backHref,
  title,
  description,
}) => {
  const config = VARIANTS[variant];

  let text = description ?? config.description;
  if (variant === "rate-limit" && resetAt) {
    text = `${text} Tente de novo a partir das ${formatTime(resetAt)}.`;
  }

  const action = (onRetry || backHref) && (
    <>
      {onRetry && (
        <Button variant="secondary" iconLeft="refresh" loading={retrying} onClick={onRetry}>
          Tentar de novo
        </Button>
      )}
      {backHref && (
        <Button variant="ghost" iconLeft="arrow-left" to={backHref}>
          Voltar para projetos
        </Button>
      )}
    </>
  );

  return (
    <EmptyState
      icon={config.icon}
      tone={config.tone}
      title={title ?? config.title}
      description={text}
      action={action}
      role="alert"
    />
  );
};

export default ErrorState;
