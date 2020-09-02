import { useEffect } from "react";

interface UseDisconnectProps {
  disconnect: () => void;
  html: string;
}

export const useDisconnect = ({
  disconnect,
  html,
}: UseDisconnectProps): void => {
  useEffect(() => {
    return () => disconnect();
  }, [html, disconnect]);
};
