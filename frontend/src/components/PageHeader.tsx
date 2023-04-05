import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import { capitalize } from 'lodash'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

type Props = {
  pageName: string
  rightSlot: React.ReactElement
}

function PageHeader({ pageName, rightSlot }: Props) {
  const { pathname } = useLocation()

  const crumbs = () => {
    const links = pathname.split('/')
    let currentLink = '/'
    return links.map((link, index) => {
      currentLink += link
      return index === 0 ? (
        <Link component={RouterLink} to={'/'} key={'/'}>
          {capitalize('Dashboard')}
        </Link>
      ) : index === links.length - 1 ? (
        <Typography key={link}>{capitalize(link)}</Typography>
      ) : (
        <Link component={RouterLink} to={currentLink} key={link}>
          {capitalize(link)}
        </Link>
      )
    })
  }

  return (
    <Stack direction={'row'} alignItems="center" mb={2}>
      <Stack flex={1} direction={'column'} gap={1}>
        <Typography fontWeight={700} variant={'h5'}>
          {pageName}
        </Typography>
        <Breadcrumbs separator="・">{crumbs()}</Breadcrumbs>
      </Stack>
      {rightSlot}
    </Stack>
  )
}

export default PageHeader
