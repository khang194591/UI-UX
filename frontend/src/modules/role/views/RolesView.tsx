import { Button, Dialog, DialogContent, DialogTitle, Icon } from '@mui/material'
import { MdAdd } from 'react-icons/md'
import PageHeader from '../../../components/PageHeader'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import RoleForm from '../components/RoleForm'
import RoleTable from '../components/RoleTable'
import { setRoleFormData, setRoleFormOpen } from '../role.store'

function RolesView() {
  const dispatch = useAppDispatch()
  const {
    roleForm: { open, data },
  } = useAppSelector((state) => state.role)

  return (
    <div>
      <PageHeader
        pageName={'Role'}
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
