
import { createContext, useState, useContext, ReactNode } from "react";

interface UpgradeModalContextType {
  isModalOpen: boolean;
  featureName: string;
  openUpgradeModal: (feature: string) => void;
  closeUpgradeModal: () => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextType | undefined>(undefined);

export const UpgradeModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [featureName, setFeatureName] = useState("this feature");

  const openUpgradeModal = (feature: string) => {
    setFeatureName(feature);
    setIsModalOpen(true);
  };

  const closeUpgradeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UpgradeModalContext.Provider
      value={{
        isModalOpen,
        featureName,
        openUpgradeModal,
        closeUpgradeModal
      }}
    >
      {children}
    </UpgradeModalContext.Provider>
  );
};

export const useUpgradeModal = () => {
  const context = useContext(UpgradeModalContext);
  
  if (context === undefined) {
    throw new Error("useUpgradeModal must be used within a UpgradeModalProvider");
  }
  
  return context;
};
