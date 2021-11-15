import { DefaultHookParams } from "../../interfaces/default-hook-params";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import {
  useCustomResolver,
  UseCustomResolverOptions,
} from "../useCustomResolver";
import { useMoralisWeb3Api } from "../useMoralisWeb3Api";

interface UseERC20TransfersParams extends DefaultHookParams {}

interface UseERC20BalancesResult {
  transaction_hash: string;
  address: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  to_address: string;
  from_address: string;
  value: string;
}

export const useERC20Transfers = (
  params: UseERC20TransfersParams,
  options: UseCustomResolverOptions,
) => {
  const { account } = useMoralisWeb3Api();
  const { walletAddress, chainId } = useMoralisDapp();

  const { data, isFetching, isLoading, error, operation } = useCustomResolver<
    UseERC20TransfersParams,
    UseERC20BalancesResult[],
    null
  >(
    account.getTokenTransfers,
    null,
    {
      address: walletAddress,
      chain: params?.chain || chainId,
    },
    options,
  );

  return {
    fetchERC20Transfers: operation,
    data,
    error,
    isLoading,
    isFetching,
  };
};
