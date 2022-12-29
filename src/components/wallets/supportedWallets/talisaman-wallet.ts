import { BaseDotsamaWallet } from '../../../model/wallet'

export class TalismanWallet extends BaseDotsamaWallet {
   extensionName = 'talisman'
   title = 'Talisman'
   installUrl = 'https://talisman.xyz/'

   noExtensionMessage = ''
   logo = {
      src: 'TalismanLogo.svg',
      alt: 'Talisman Logo',
   }
}
