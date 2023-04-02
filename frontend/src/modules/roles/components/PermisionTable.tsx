import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import { chunk, intersection } from 'lodash'
import { useEffect, useState } from 'react'
import { PermissionAction } from '../role.types'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { blueGrey } from '@mui/material/colors'
import { setRoleFormChecked } from '../role.store'

// Permission Action's Length
const a = 8

type Props = {
  checkedItem: number[]
}

function PermissionTable({ checkedItem }: Props) {
  const [checked, setChecked] = useState(checkedItem)

  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.role.permissions)

  useEffect(() => {
    dispatch(setRoleFormChecked(checked))
  }, [checked])

  return (
    <Table sx={{ border: '2px dashed', borderColor: blueGrey[100] }}>
      <TableHead>
        <TableRow>
          <TableCell align="center">
            <Checkbox
              checked={checked.length >= items.length}
              onClick={() => {
                const ids = items.map((item) => item.id)
                if (checked.length !== ids.length) {
                  setChecked(items.map((item) => item.id))
                } else {
                  setChecked([])
                }
              }}
            />
          </TableCell>
          <TableCell>Resource</TableCell>
          {Object.values(PermissionAction).map((action) => (
            <TableCell key={action}>{action}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items &&
          chunk(items, a).map((resource, index) => {
            const ids = resource.map((item) => item.id)
            const i = intersection(checked, ids).length
            return (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox
                    checked={i === a}
                    indeterminate={i > 0 && i < a}
                    onChange={() => {
                      if (i !== a) {
                        setChecked([
                          ...checked,
                          ...resource.map((item) => item.id),
                        ])
                      } else {
                        setChecked(
                          checked.filter((item) => !ids.includes(item)),
                        )
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{resource[0].resource}</TableCell>
                {resource.map((item) => (
                  <TableCell key={item.id}>
                    <Checkbox
                      checked={checked.includes(item.id)}
                      onChange={() => {
                        if (checked.includes(item.id)) {
                          setChecked(checked.filter((i) => i !== item.id))
                        } else {
                          setChecked([...checked, item.id])
                        }
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}

export default PermissionTable
