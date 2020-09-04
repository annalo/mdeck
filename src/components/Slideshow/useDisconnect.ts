import { useEffect } from "react";

interface UseDisconnectProps {
  disconnect: () => void;
  md: MarkdownString;
}

export const useDisconnect = ({ disconnect, md }: UseDisconnectProps): void => {
  useEffect(() => {
    return () => disconnect();
  }, [md, disconnect]);
};
