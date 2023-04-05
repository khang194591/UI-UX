import {
  MdHistoryEdu,
  MdOutlineBadge,
  MdOutlineDashboard,
} from 'react-icons/md'

export const pages = [
  {
    to: '',
    label: 'page.home.label',
    name: 'page.home.name',
    icon: MdOutlineDashboard,
  },
  {
    to: 'user',
    label: 'page.user.label',
    name: 'page.user.name',
    icon: MdOutlineBadge,
  },
  {
    to: 'contract',
    label: 'page.contract.label',
    name: 'page.contract.name',
    icon: MdHistoryEdu,
  },
]
