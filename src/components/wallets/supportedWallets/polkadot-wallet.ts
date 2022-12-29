import { BaseDotsamaWallet } from '../../../model/wallet'

export class PolkadotjsWallet extends BaseDotsamaWallet {
   extensionName = 'polkadot-js'
   title = 'Polkadot.js'
   noExtensionMessage = ''
   installUrl = 'https://polkadot.js.org/extension/'
   logo = {
      src: 'PolkadotjsLogo.svg',
      alt: 'Polkadotjs Logo',
   }
}
