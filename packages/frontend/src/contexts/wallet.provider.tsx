import { ethers } from "ethers";
import React, { createContext, useState } from "react";

declare const window: any;

type WalletContextType = {
  address: string;
  shortendAddress: string;
  provider?: ethers.providers.Web3Provider;
  connectMetamask: () => Promise<void>;
  signOrder: (
    tokenID: number,
    tokenContract: string,
    price: number,
    minted: boolean,
    uri: string
  ) => Promise<string>;
};

export const WalletContext = createContext<WalletContextType>({
  address: "",
  shortendAddress: "",
  connectMetamask: async () => {},
  signOrder: async (
    tokenID: number,
    tokenContract: string,
    price: number,
    minted: boolean,
    string: string
  ) => {
    return "";
  },
});

export function useWalletProvider(): WalletContextType {
  const context = React.useContext(WalletContext);
  return {
    address: context!.address,
    shortendAddress: context.shortendAddress,
    provider: context?.provider,
    connectMetamask: context!.connectMetamask,
    signOrder: context!.signOrder,
  };
}

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string>("");
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | undefined
  >(undefined);

  // const userRef = useRef<UserAuth>();
  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          const prov = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(prov);
        }
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
          } else setAddress("");
        });
      } catch (error: any) {
        if (error.code === 4001) {
          // User rejected request
        }
        console.log(error);
      }
    }
  };

  const signOrder = async (
    tokenID: number,
    tokenContract: string,
    price: number,
    minted: boolean,
    uri: string
  ): Promise<string> => {
    const { chainId } = await provider!.getNetwork();

    const domain = {
      name: name,
      version: version,
      chainId: chainId,
      verifyingContract: exchangeAddress!,
    };
    const type = {
      FixPrice721Data: [
        { name: "tokenID", type: "uint256" },
        { name: "tokenContract", type: "address" },
        { name: "price", type: "uint256" },
        { name: "minted", type: "bool" },
        { name: "uri", type: "string" },
      ],
    };
    const value = {
      tokenID,
      tokenContract,
      price: ethers.utils.parseEther(price.toString()),
      minted,
      uri,
    };
    return await provider!.getSigner()._signTypedData(domain, type, value);
  };

  const getShortenAddress = (): string => {
    const firstCharacters = address.substring(0, 6);
    const lastCharacters = address.substring(
      address.length - 4,
      address.length
    );
    return `${firstCharacters}...${lastCharacters}`;
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        provider,
        connectMetamask,
        signOrder,
        shortendAddress: getShortenAddress(),
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
