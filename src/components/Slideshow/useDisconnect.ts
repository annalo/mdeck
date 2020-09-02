import { useEffect } from "react";

interface UseDisconnectProps {
  disconnect: () => void;
  md: string;
}

export const useDisconnect = ({ disconnect, md }: UseDisconnectProps): void => {
  useEffect(() => {
    return () => disconnect();
  }, [md, disconnect]);
};
