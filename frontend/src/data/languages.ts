import { SupportLanguage } from '@/plugins/i18n'
import { US, VN } from 'country-flag-icons/react/3x2'

const languages = [
  { lang: SupportLanguage.EN, label: 'lang.en', icon: US },
  { lang: SupportLanguage.VI, label: 'lang.vi', icon: VN },
]

export { languages }
