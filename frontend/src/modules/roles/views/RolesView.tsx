import { Button, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import PageHeader from '../../../common/components/PageHeader'
import { PageName, mapLinkName } from '../../../common/utils'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import RoleForm from '../components/RoleForm'
import {
  setRoleFormChecked,
  setRoleFormData,
  setRoleFormOpen,
} from '../role.store'
import RoleTable from '../components/RoleTable'

function RolesView() {
  const dispatch = useAppDispatch()
  const {
    roleForm: { open, data },
  } = useAppSelector((state) => state.role)

  return (
    <div>
      <PageHeader
        pageName={mapLinkName[PageName.ROLE].name}
        rightSlot={
          <Button
            startIcon={<Icon component={MdAdd} />}
            onClick={() => {
              dispatch(setRoleFormData(undefined))
              dispatch(setRoleFormOpen(true))
            }}
          >
            New Role
          </Button>
        }
      />
      <RoleTable />
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => dispatch(setRoleFormOpen(false))}
      >
        <DialogTitle>{data ? 'Update Role' : 'Create Role'}</DialogTitle>
        <DialogContent>
          <RoleForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RolesView
