import { Breadcrumbs, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { PageName, mapLinkName } from '../utils'

type Props = {
  pageName: string
  rightSlot: React.ReactElement
}

function PageHeader({ pageName, rightSlot }: Props) {
  const { pathname } = useLocation()

  const crumbs = () => {
    const links = pathname.split('/') as PageName[]
    let currentLink = '/'
    return links.map((link, index) => {
      const name = mapLinkName[link].crumb
      currentLink += link
      return index === links.length - 1 ? (
        <Typography key={link}>{name}</Typography>
      ) : (
        <Link component={RouterLink} to={currentLink} key={link}>
          {name}
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
