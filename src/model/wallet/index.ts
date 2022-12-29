import type { Signer as InjectedSigner } from '@polkadot/api/types'
import { StaticImageData } from 'next/image'

export * from './BaseWallet'

export type SubscriptionFn = (
   accounts: WalletAccount[] | undefined
) => void | Promise<void>

export interface WalletLogoProps {
   // Logo url
   src: string
   // Alt for the Logo url
   alt: string
}

export interface WalletAccount {
   address: string
   source: string
   wallet: Wallet
   signer: unknown
   name?: string
   image: StaticImageData
   subBalance: string
}

interface WalletData {
   // The name of the wallet extension. Should match `WalletAccount.source`
   extensionName: string
   // Display name for the wallet extension
   title: string
   // Message to display if wallet extension is not installed
   noExtensionMessage?: string
   // The URL to install the wallet extension
   installUrl: string
   // The wallet logo
   logo: WalletLogoProps
}

interface WalletExtension {
   installed: boolean | undefined

   enabled: boolean | undefined

   // The raw extension object which will have everything a dapp developer needs.
   // Refer to a specific wallet's extension documentation
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   extension: any

   // The raw signer object for convenience. Usually the implementer can derive this from the extension object.
   // Refer to a specific wallet's extension documentation
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   signer: InjectedSigner | undefined
}

interface Connector {
   enable: (dappName: string) => unknown

   // Get accounts function
   getAccounts: (anyType?: boolean) => Promise<WalletAccount[]>

   // The subscribe to accounts function
   subscribeAccounts: (callback: SubscriptionFn) => unknown
}

export interface Wallet extends WalletData, WalletExtension, Connector {}
